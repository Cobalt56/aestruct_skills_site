import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-6">Blog</h1>
          <p className="text-xl text-gray-700 mb-12">
            Insights, tutorials, and updates on AI in media & entertainment.
          </p>

          <BlogList />
        </div>
      </div>
    </main>
  );
}
