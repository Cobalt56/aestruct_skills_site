import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth, createUnauthorizedResponse } from "@/lib/auth";
import { slugify, generateUniqueSlug } from "@/lib/slugify";
import { updateBlogPostSchema } from "@/lib/validations/blog";

// GET - Get single blog post by ID (for editing)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input with Zod
    const validationResult = updateBlogPostSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { title, content, excerpt, featuredImage, author, status, slug: customSlug } = validationResult.data;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Handle slug update if title or custom slug changed
    let slug = existingPost.slug;
    if (customSlug && customSlug !== existingPost.slug) {
      slug = slugify(customSlug);
    } else if (title && title !== existingPost.title && !customSlug) {
      slug = slugify(title);
    }

    // Check if new slug conflicts with existing posts
    if (slug !== existingPost.slug) {
      const conflictingPost = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (conflictingPost) {
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
    }

    // Determine if we should update publishedDate
    const shouldUpdatePublishedDate =
      status === "published" &&
      existingPost.status !== "published" &&
      !existingPost.publishedDate;

    const updateData: any = {
      title: title || existingPost.title,
      slug,
      content: content || existingPost.content,
      excerpt: excerpt !== undefined ? excerpt : existingPost.excerpt,
      featuredImage: featuredImage !== undefined ? featuredImage : existingPost.featuredImage,
      author: author || existingPost.author,
      status: status || existingPost.status,
    };

    if (shouldUpdatePublishedDate) {
      updateData.publishedDate = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const { id } = await params;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
