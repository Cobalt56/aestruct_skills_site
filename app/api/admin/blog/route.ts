import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth, createUnauthorizedResponse } from "@/lib/auth";
import { slugify, generateUniqueSlug } from "@/lib/slugify";
import { createBlogPostSchema } from "@/lib/validations/blog";

// GET - List all blog posts (including drafts) for admin
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // filter by status if provided

    const where = status ? { status } : {};

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const body = await request.json();

    // Validate input with Zod
    const validationResult = createBlogPostSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { title, content, excerpt, featuredImage, author, status, slug: customSlug } = validationResult.data;

    // Generate or use custom slug
    let slug = customSlug ? slugify(customSlug) : slugify(title);

    // Check if slug exists and generate unique one if needed
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      // Find all posts with similar slugs to generate a unique one
      const similarPosts = await prisma.blogPost.findMany({
        where: {
          slug: {
            startsWith: slug,
          },
        },
        select: {
          slug: true,
        },
      });

      const existingSlugs = similarPosts.map((p) => p.slug);
      slug = generateUniqueSlug(slug, existingSlugs);
    }

    // Generate excerpt if not provided
    const finalExcerpt = excerpt || content.substring(0, 150);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: finalExcerpt,
        featuredImage,
        author: author || "Emil",
        status: status || "draft",
        publishedDate: status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
