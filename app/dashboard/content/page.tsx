"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@heroui/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ContentManagement() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      console.log("Fetched posts:", data.posts);
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];
    return posts.filter((post) => {
      const matchesSearch = post.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || statusFilter === "Published"; // No status in DB, so always match
      const matchesPlatform =
        platformFilter === "All" || post.platform === platformFilter;
      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [posts, searchTerm, statusFilter, platformFilter]);

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length < filteredPosts.length) {
      setSelectedPosts(filteredPosts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      setDeleting((prev) => [...prev, id]);
      try {
        const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete post");
        await fetchPosts();
        setSelectedPosts((prev) => prev.filter((pid) => pid !== id));
      } catch (err) {
        alert("Error deleting post");
      } finally {
        setDeleting((prev) => prev.filter((pid) => pid !== id));
      }
    },
    [fetchPosts]
  );

  const handleBulkDelete = useCallback(async () => {
    if (!window.confirm("Delete all selected posts?")) return;
    setBulkDeleting(true);
    try {
      const deletePromises = selectedPosts.map((id) =>
        fetch(`/api/posts?id=${id}`, { method: "DELETE" })
      );

      const results = await Promise.allSettled(deletePromises);

      const failedDeletes = results.filter((r) => r.status === "rejected");
      if (failedDeletes.length > 0) {
        console.error("Some posts failed to delete:", failedDeletes);
        alert("Error deleting some posts. Check the console for details.");
      }

      await fetchPosts();
      setSelectedPosts([]);
    } catch (err) {
      alert("An unexpected error occurred during bulk delete.");
    } finally {
      setBulkDeleting(false);
    }
  }, [selectedPosts, fetchPosts]);

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Twitter":
        return (
          <div className="w-6 h-6 rounded-full bg-[#1DA1F2]/20 text-[#1DA1F2] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
        );
      case "Facebook":
        return (
          <div className="w-6 h-6 rounded-full bg-[#4267B2]/20 text-[#4267B2] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </div>
        );
      case "Instagram":
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FCAF45]/20 via-[#E1306C]/20 to-[#5851DB]/20 text-[#E1306C] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </div>
        );
      case "Linkedin":
        return (
          <div className="w-6 h-6 rounded-full bg-[#0077B5]/20 text-[#0077B5] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-[var(--text-light)]/20 text-[var(--text-color)] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-color)]">
              Content Management
            </h1>
            <p className="text-[var(--text-light)] mt-1">
              Manage all your social media content in one place
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/dashboard/create">
              <Button color="primary" size="sm">
                Create New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-5 mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[240px]">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-[var(--text-light)] mb-1"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] py-2 pl-10 pr-4 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[var(--text-light)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-40">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-[var(--text-light)] mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="w-40">
            <label
              htmlFor="platform"
              className="block text-sm font-medium text-[var(--text-light)] mb-1"
            >
              Platform
            </label>
            <select
              id="platform"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            >
              <option value="All">All Platforms</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Blog">Blog</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm">
          {selectedPosts.length > 0 && (
            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-[var(--primary-color)]/5 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">{selectedPosts.length}</span>{" "}
                {selectedPosts.length === 1 ? "item" : "items"} selected
              </div>
              <div className="flex gap-3">
                <Button size="sm" color="default" variant="bordered" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onClick={handleBulkDelete}
                  disabled={bulkDeleting}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  {bulkDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-color)]">
              <thead className="bg-[var(--background-alt)]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedPosts.length === filteredPosts.length &&
                        filteredPosts.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] h-4 w-4"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Content
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Platform
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Engagement
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-[var(--text-light)] uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className={`transition-colors duration-200 ${
                      selectedPosts.includes(post.id)
                        ? "bg-[var(--accent-light)]"
                        : "hover:bg-[var(--accent-light)]"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => togglePostSelection(post.id)}
                        className="rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] h-4 w-4"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="text-sm text-[var(--text-color)] line-clamp-2">
                          {post.content}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPlatformIcon(post.platform)}
                        <span className="ml-2 text-sm text-[var(--text-color)]">
                          {post.platform}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getBadgeColor(
                          "Published" // Hardcoded as we don't have status
                        )}`}
                      >
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-light)]">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-color)]">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-[var(--primary-color)] opacity-50 cursor-not-allowed"
                          disabled
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting.includes(post.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
