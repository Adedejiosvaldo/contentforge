"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
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
          <p className="mt-3 text-[var(--text-light)]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="w-full px-6 lg:px-10 py-4 border-b border-[var(--border-color)] flex items-center justify-between sticky top-0 bg-[var(--background)] z-10">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-medium text-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm">
              <Image
                src="/contentcraft-logo.svg"
                alt="ContentCraft Logo"
                width={20}
                height={20}
              />
            </div>
            <span className="font-semibold hidden sm:block">ContentCraft</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="sm"
            color="primary"
            className="h-9 px-4 rounded-full"
          >
            New Content
          </Button>

          <div className="relative flex-shrink-0 group">
            <button className="w-9 h-9 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)]">
              {session?.user?.name ? (
                <span className="text-sm font-semibold">{session.user.name.charAt(0)}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg bg-[var(--background)] shadow-lg ring-1 ring-[var(--border-color)] divide-y divide-[var(--border-color)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
              <div className="px-4 py-3">
                <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                <p className="text-xs text-[var(--text-light)] truncate">{session?.user?.email}</p>
              </div>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[var(--accent-light)]">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[var(--accent-light)]">Settings</a>
              </div>
              <div className="py-1">
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--accent-light)] text-red-500"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-2xl font-bold text-[var(--text-color)] mb-6">
          Welcome, {session?.user?.name || "User"}!
        </h1>

        <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-8 rounded-2xl shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-medium mb-3">Your Dashboard is Ready</h2>
            <p className="text-[var(--text-light)] mb-6">
              Start creating engaging content for your social media platforms. Use AI to generate ideas,
              or dive right in with our content creation tools.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                color="primary"
                className="min-w-[200px]"
              >
                Create New Content
              </Button>
              <Button
                variant="bordered"
                className="min-w-[200px]"
              >
                Generate Ideas
              </Button>
            </div>
          </div>
        </div>

        {/* Content Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">Total Content</h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">Published</h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">Drafts</h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
          <div className="bg-[var(--background)]/50 border border-[var(--border-color)] p-5 rounded-xl">
            <h3 className="text-[var(--text-light)] text-sm font-medium mb-2">Scheduled</h3>
            <p className="text-2xl font-bold text-[var(--text-color)]">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
