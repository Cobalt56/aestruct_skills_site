"use client";

import { useEffect, useState } from "react";

interface Metric {
  id: string;
  metricName: string;
  metricValue: string;
  displayOrder: number;
}

export default function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    metricName: "",
    metricValue: "",
    displayOrder: 0,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/metrics");
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      alert("Failed to fetch metrics");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing metric
        const response = await fetch("/api/admin/metrics", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update metric");
        alert("Metric updated successfully!");
      } else {
        // Create new metric
        const response = await fetch("/api/admin/metrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create metric");
        alert("Metric created successfully!");
      }

      // Reset form and refresh
      setFormData({ id: "", metricName: "", metricValue: "", displayOrder: 0 });
      setEditingId(null);
      setIsAdding(false);
      fetchMetrics();
    } catch (error) {
      console.error("Error saving metric:", error);
      alert("Failed to save metric");
    }
  };

  const handleEdit = (metric: Metric) => {
    setFormData(metric);
    setEditingId(metric.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this metric?")) return;

    try {
      const response = await fetch(`/api/admin/metrics?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete metric");
      alert("Metric deleted successfully!");
      fetchMetrics();
    } catch (error) {
      console.error("Error deleting metric:", error);
      alert("Failed to delete metric");
    }
  };

  const handleCancel = () => {
    setFormData({ id: "", metricName: "", metricValue: "", displayOrder: 0 });
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Manage Success Metrics
            </h1>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Add New Metric
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {isAdding && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border-2 border-primary">
              <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit Metric" : "Add New Metric"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Metric Name
                  </label>
                  <input
                    type="text"
                    value={formData.metricName}
                    onChange={(e) =>
                      setFormData({ ...formData, metricName: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    placeholder="e.g., Time Savings"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Metric Value
                  </label>
                  <input
                    type="text"
                    value={formData.metricValue}
                    onChange={(e) =>
                      setFormData({ ...formData, metricValue: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    placeholder="e.g., 20-40% or 800-1500%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="0"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    {editingId ? "Update Metric" : "Create Metric"}
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

          {/* Metrics List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Metrics</h2>
            {metrics.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No metrics found. Add your first metric above.
              </p>
            ) : (
              <div className="grid gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-500 w-12">
                          #{metric.displayOrder}
                        </span>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {metric.metricName}
                          </h3>
                          <p className="text-accent font-bold text-xl">
                            {metric.metricValue}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(metric)}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(metric.id)}
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
