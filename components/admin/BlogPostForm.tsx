"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "./AdminAuth";

interface BlogPostFormProps {
  postId?: string;
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: string;
    status: string;
  };
}

export default function BlogPostForm({
  postId,
  initialData,
}: BlogPostFormProps) {
  const router = useRouter();
  const password = useAdminAuth();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    featuredImage: initialData?.featuredImage || "",
    author: initialData?.author || "Emil",
    status: initialData?.status || "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(!postId);

  // Autosave to localStorage
  useEffect(() => {
    const autosaveKey = postId ? `autosave_${postId}` : "autosave_new_post";
    const timer = setTimeout(() => {
      localStorage.setItem(autosaveKey, JSON.stringify(formData));
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, postId]);

  // Load autosaved data
  useEffect(() => {
    if (!initialData) {
      const autosaveKey = postId ? `autosave_${postId}` : "autosave_new_post";
      const saved = localStorage.getItem(autosaveKey);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (
            confirm(
              "Found autosaved data. Would you like to restore it?"
            )
          ) {
            setFormData(data);
          } else {
            localStorage.removeItem(autosaveKey);
          }
        } catch (e) {
          // Invalid saved data
          localStorage.removeItem(autosaveKey);
        }
      }
    }
  }, [postId, initialData]);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, autoSlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "slug") {
      setAutoSlug(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveStatus?: string) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalStatus = saveStatus || formData.status;

    try {
      const url = postId ? `/api/admin/blog/${postId}` : "/api/admin/blog";
      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          ...formData,
          status: finalStatus,
        }),
      });

      if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save post");
      }

      const data = await response.json();

      // Clear autosave
      const autosaveKey = postId ? `autosave_${postId}` : "autosave_new_post";
      localStorage.removeItem(autosaveKey);

      // Redirect to blog admin
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Slug *
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="post-url-slug"
        />
        <p className="mt-1 text-sm text-gray-500">
          Auto-generated from title. Edit to customize.
        </p>
      </div>

      <div>
        <label
          htmlFor="excerpt"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="Brief summary (optional, will use first 150 chars if empty)"
        />
      </div>

      <div>
        <label
          htmlFor="featuredImage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Featured Image URL
        </label>
        <input
          type="url"
          id="featuredImage"
          name="featuredImage"
          value={formData.featuredImage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content * (Markdown supported)
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={20}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder="Write your post content in Markdown..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Supports Markdown formatting and code syntax highlighting.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          disabled={loading}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          disabled={loading}
          className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Draft auto-saved to browser storage every 2 seconds.
      </p>
    </form>
  );
}
