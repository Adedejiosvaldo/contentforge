"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    // Set loading to false when session is loaded
    if (status === "authenticated") {
      setLoading(false);
      // Fetch posts from API
      const fetchPosts = async () => {
        setPostsLoading(true);
        setPostsError(null);
        try {
          const res = await fetch("/api/posts");
          if (!res.ok) throw new Error("Failed to fetch posts");
          const data = await res.json();
          setPosts(data.posts || []);
        } catch (err: any) {
          setPostsError(err.message || "Failed to fetch posts");
        } finally {
          setPostsLoading(false);
        }
      };
      fetchPosts();
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-6 w-6 text-[var(--primary-color)]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="mt-3 text-[var(--text-light)]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-2xl font-bold text-[var(--text-color)] mb-6">
          Welcome, {session?.user?.name || "User"}!
        </h1>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--accent-color)]/10 p-6 rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--primary-color)]/30">
            <div className="mb-4 w-12 h-12 bg-[var(--primary-color)]/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[var(--primary-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Generate Content</h3>
            <p className="text-[var(--text-light)] text-sm mb-4">
              Create AI-powered posts for multiple platforms with a single
              prompt.
            </p>
            <Link href="/dashboard/create">
              <Button color="primary" size="md" className="mt-2">
                Create Now
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-color)]/10 to-[var(--primary-color)]/10 p-6 rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--accent-color)]/30">
            <div className="mb-4 w-12 h-12 bg-[var(--accent-color)]/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[var(--accent-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Browse Templates</h3>
            <p className="text-[var(--text-light)] text-sm mb-4">
              Choose from professionally designed templates for various content
              types.
            </p>
            <Link href="/dashboard/templates">
              <Button
                color="default"
                variant="bordered"
                size="md"
                className="mt-2"
              >
                View Templates
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[var(--background)]/80 to-[var(--background)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--text-light)]/30">
            <div className="mb-4 w-12 h-12 bg-[var(--text-light)]/20 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[var(--text-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">View Analytics</h3>
            <p className="text-[var(--text-light)] text-sm mb-4">
              Track performance and engagement of your content across platforms.
            </p>
            <Link href="/dashboard/analytics">
              <Button color="default" variant="flat" size="md" className="mt-2">
                Check Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Posts - Card Layout */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {postsLoading ? (
            <div className="col-span-full flex items-center justify-center h-32 text-[var(--text-light)]">
              Loading posts...
            </div>
          ) : postsError ? (
            <div className="col-span-full flex items-center justify-center h-32 text-red-500">
              {postsError}
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-32 text-[var(--text-light)]">
              No posts found.
            </div>
          ) : (
            posts.slice(0, 4).map((post) => (
              <div
                key={post.id}
                className="relative bg-[var(--background)] border border-[var(--border-color)] rounded-xl shadow-sm p-5 flex flex-col justify-between min-h-[180px]"
              >
                {/* Overlay for copied */}
                {copiedPostId === post.id && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-black/70 rounded-xl transition-opacity">
                    <span className="text-blue-700 dark:text-white font-semibold text-base">
                      Copied!
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium text-[var(--text-light)] capitalize`}
                  >
                    {post.platform}
                  </span>
                  <span className="ml-auto text-xs text-[var(--text-light)]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex-1 mb-3">
                  <p className="text-[var(--text-color)] text-sm line-clamp-4 whitespace-pre-line">
                    {post.content.length > 180
                      ? post.content.slice(0, 180) + "..."
                      : post.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <Link href={`/dashboard/content?post=${post.id}`}>
                    <Button
                      className="bg-[#0088FF] text-white hover:bg-[#0077CC]"
                      color="primary"
                      size="sm"
                      variant="solid"
                    >
                      View
                    </Button>
                  </Link>
                  <button
                    className="ml-auto text-xs text-[var(--light-color)] hover:underline"
                    onClick={() => {
                      navigator.clipboard.writeText(post.content);
                      setCopiedPostId(post.id);
                      setTimeout(() => setCopiedPostId(null), 1200);
                    }}
                    title="Copy post content"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15V5a2 2 0 012-2h10" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mb-8 flex justify-start">
          <Link
            href="/dashboard/content"
            className="text-white hover:text-gray-300 text-sm font-medium flex items-center"
          >
            View All Posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Content Stats Section */}
        <h2 className="text-xl font-semibold mb-4">Content Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">
              Total Content
            </h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">
              Published
            </h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">
              Drafts
            </h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">
              Scheduled
            </h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
