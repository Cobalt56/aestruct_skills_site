"use client";

import { useEffect, useState } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  skillFileUrl?: string | null;
  promptContent?: string | null;
}

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    type: "skill",
    skillFileUrl: "",
    promptContent: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools");
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error("Error fetching tools:", error);
      alert("Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing tool
        const response = await fetch("/api/admin/tools", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update tool");
        alert("Tool updated successfully!");
      } else {
        // Create new tool
        const response = await fetch("/api/admin/tools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create tool");
        alert("Tool created successfully!");
      }

      // Reset form and refresh
      setFormData({
        id: "",
        name: "",
        description: "",
        price: 0,
        type: "skill",
        skillFileUrl: "",
        promptContent: "",
      });
      setEditingId(null);
      setIsAdding(false);
      fetchTools();
    } catch (error) {
      console.error("Error saving tool:", error);
      alert("Failed to save tool");
    }
  };

  const handleEdit = (tool: Tool) => {
    setFormData({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      price: tool.price,
      type: tool.type,
      skillFileUrl: tool.skillFileUrl || "",
      promptContent: tool.promptContent || "",
    });
    setEditingId(tool.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;

    try {
      const response = await fetch(`/api/admin/tools?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete tool");
      alert("Tool deleted successfully!");
      fetchTools();
    } catch (error) {
      console.error("Error deleting tool:", error);
      alert("Failed to delete tool");
    }
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      price: 0,
      type: "skill",
      skillFileUrl: "",
      promptContent: "",
    });
    setEditingId(null);
    setIsAdding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Manage Claude Skills & Tools
            </h1>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Add New Tool
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {isAdding && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border-2 border-primary">
              <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit Tool" : "Add New Tool"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tool Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      placeholder="e.g., Script Analysis Pro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="skill">Claude Skill</option>
                    <option value="consulting">Consulting Package</option>
                    <option value="template">Template</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    rows={6}
                    placeholder="Describe the tool. Use line breaks for bullet points (start with - or •)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tip: First paragraph = short description. Add bullet points
                    starting with - or • for key benefits.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill File URL (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.skillFileUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, skillFileUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prompt Content (optional)
                  </label>
                  <textarea
                    value={formData.promptContent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promptContent: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    placeholder="Claude prompt content"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    {editingId ? "Update Tool" : "Create Tool"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tools List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Tools</h2>
            {tools.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tools found. Add your first tool above.
              </p>
            ) : (
              <div className="grid gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex-grow mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl text-primary">
                          {tool.name}
                        </h3>
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-sm">
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {tool.description.split("\n")[0]}
                      </p>
                      <p className="text-accent font-bold text-lg">
                        ${tool.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(tool)}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This admin interface has no authentication
              yet. In production, add proper authentication before deploying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
