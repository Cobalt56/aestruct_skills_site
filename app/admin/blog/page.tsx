"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminAuth, { useAdminAuth } from "@/components/admin/AdminAuth";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  status: string;
  publishedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

function BlogAdminContent() {
  const password = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url =
        filter === "all"
          ? "/api/admin/blog"
          : `/api/admin/blog?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.status === 401) {
        setError("Unauthorized. Please check your password.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) {
      fetchPosts();
    }
  }, [password, filter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Refresh the list
      fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${
          colors[status as keyof typeof colors] || colors.draft
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Blog Posts</h2>
        <Link
          href="/admin/blog/new"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("published")}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "published"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setFilter("draft")}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "draft"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Drafts
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="text-secondary hover:text-primary"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.author}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(post.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(
                      post.publishedDate || post.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-secondary hover:text-primary mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function BlogAdminPage() {
  return (
    <AdminAuth>
      <BlogAdminContent />
    </AdminAuth>
  );
}
