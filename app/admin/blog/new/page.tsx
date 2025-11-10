"use client";

import AdminAuth from "@/components/admin/AdminAuth";
import BlogPostForm from "@/components/admin/BlogPostForm";

function NewPostContent() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Create New Blog Post</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogPostForm />
      </div>
    </div>
  );
}

export default function NewBlogPostPage() {
  return (
    <AdminAuth>
      <NewPostContent />
    </AdminAuth>
  );
}
