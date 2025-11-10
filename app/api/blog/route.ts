import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.blogPost.count({
      where: {
        status: "published",
        publishedDate: {
          lte: new Date(),
        },
      },
    });

    // Fetch published blog posts
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "published",
        publishedDate: {
          lte: new Date(),
        },
      },
      orderBy: {
        publishedDate: "desc",
      },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        publishedDate: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
