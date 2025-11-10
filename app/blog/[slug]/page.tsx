import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MarkdownContent from "@/components/blog/MarkdownContent";
import SocialShare from "@/components/blog/SocialShare";
import { prisma } from "@/lib/prisma";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: string;
  publishedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        status: "published",
      },
    });

    // Check if post exists and is published in the past
    if (!post || (post.publishedDate && post.publishedDate > new Date())) {
      return null;
    }

    // Convert dates to strings for serialization
    return {
      ...post,
      publishedDate: post.publishedDate?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: `${post.title} | AEstruct Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: "article",
      publishedTime: post.publishedDate || post.createdAt,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : undefined,
      url: `${baseUrl}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          {post.title}
        </h1>

        {/* Meta information */}
        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedDate || post.createdAt}>
            {post.publishedDate
              ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </time>
        </div>

        {/* Content */}
        <div className="mb-12">
          <MarkdownContent content={post.content} />
        </div>

        {/* Social Share */}
        <div className="pt-8 border-t border-gray-200">
          <SocialShare title={post.title} slug={post.slug} />
        </div>

        {/* Author Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-2">
            About the Author
          </h3>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-lg text-gray-900">{post.author}</p>
              <p className="text-gray-600 mt-2">
                AI solutions architect specializing in media & entertainment
                industry transformation.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
