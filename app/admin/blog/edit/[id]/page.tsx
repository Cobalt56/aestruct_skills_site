"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import AdminAuth, { useAdminAuth } from "@/components/admin/AdminAuth";
import BlogPostForm from "@/components/admin/BlogPostForm";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: string;
  status: string;
}

function EditPostContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const password = useAdminAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${resolvedParams.id}`, {
          headers: {
            Authorization: `Bearer ${password}`,
          },
        });

        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (password) {
      fetchPost();
    }
  }, [resolvedParams.id, password]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-red-600">
          {error || "Post not found"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Edit Blog Post</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogPostForm
          postId={post.id}
          initialData={{
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt || "",
            featuredImage: post.featuredImage || "",
            author: post.author,
            status: post.status,
          }}
        />
      </div>
    </div>
  );
}

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AdminAuth>
      <EditPostContent params={params} />
    </AdminAuth>
  );
}
