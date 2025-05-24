"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import NotificationsMenu from "./NotificationsMenu";
import UserProfileMenu from "./UserProfileMenu";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 lg:px-10 py-4 border-b border-[var(--border-color)] flex items-center justify-between sticky top-0 bg-[var(--background)] z-10">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-medium text-lg"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm">
            <Image
              src="/contentcraft-logo.svg"
              alt="ContentForge Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-semibold hidden sm:block">ContentForge</span>
        </Link>

        <nav className="hidden md:flex items-center ml-6 space-x-4">
          <Link
            href="/dashboard"
            className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard/templates"
            className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/dashboard/content"
            className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors"
          >
            My Content
          </Link>
          <Link
            href="/dashboard/analytics"
            className="text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors"
          >
            Analytics
          </Link>
        </nav>

        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full bg-[var(--background)]/50 border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] w-60"
          />
        </div>

        <Link href="/dashboard/create">
          <Button size="sm" color="primary" className="h-9 px-4 rounded-full">
            New Post
          </Button>
        </Link>

        <NotificationsMenu />
        <UserProfileMenu />
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border-color)] md:hidden shadow-lg z-20">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            <Link
              href="/dashboard"
              className="text-[var(--text-color)] hover:text-[var(--primary-color)] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard/templates"
              className="text-[var(--text-light)] hover:text-[var(--primary-color)] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/dashboard/content"
              className="text-[var(--text-light)] hover:text-[var(--primary-color)] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Content
            </Link>
            <Link
              href="/dashboard/analytics"
              className="text-[var(--text-light)] hover:text-[var(--primary-color)] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <div className="pt-2 border-t border-[var(--border-color)]">
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] w-full"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
