"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

// Sample analytics data
const PLATFORMS_DATA = [
  { name: "Twitter", posts: 12, engagement: 542, followers: 1245 },
  { name: "Facebook", posts: 8, engagement: 328, followers: 875 },
  { name: "Instagram", posts: 15, engagement: 982, followers: 2340 },
  { name: "LinkedIn", posts: 5, engagement: 210, followers: 650 },
];

const ENGAGEMENT_DATA = [
  { date: "May 17", value: 24 },
  { date: "May 18", value: 18 },
  { date: "May 19", value: 42 },
  { date: "May 20", value: 67 },
  { date: "May 21", value: 89 },
  { date: "May 22", value: 75 },
  { date: "May 23", value: 102 },
];

const TOP_POSTS = [
  {
    id: "post1",
    content:
      "Just launched our new sustainable product line! Check out how we're reducing plastic waste while delivering the same great quality. #SustainableLiving #EcoFriendly",
    platform: "Twitter",
    engagement: 142,
    date: "2025-05-22",
  },
  {
    id: "post2",
    content:
      "Meet the team behind our sustainable innovation lab! These brilliant minds are developing the next generation of eco-friendly solutions.",
    platform: "Instagram",
    engagement: 215,
    date: "2025-05-10",
  },
  {
    id: "post3",
    content:
      "Summer sale! Enjoy 20% off all our eco-friendly products this weekend only. Use code ECO20 at checkout. #SummerSale #EcoFriendly",
    platform: "Twitter",
    engagement: 89,
    date: "2025-05-15",
  },
];

export default function Analytics() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState("14d");

  // Calculate chart dimensions and values
  const maxEngagement = Math.max(...ENGAGEMENT_DATA.map((d) => d.value));

  // Generate platform-specific colors
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Twitter":
        return "#1DA1F2";
      case "Facebook":
        return "#4267B2";
      case "Instagram":
        return "#E1306C";
      case "LinkedIn":
        return "#0077B5";
      default:
        return "#888888";
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
      case "LinkedIn":
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
        return null;
    }
  };

  // Calculate total stats
  const totalPosts = PLATFORMS_DATA.reduce(
    (sum, platform) => sum + platform.posts,
    0
  );
  const totalEngagement = PLATFORMS_DATA.reduce(
    (sum, platform) => sum + platform.engagement,
    0
  );
  const totalFollowers = PLATFORMS_DATA.reduce(
    (sum, platform) => sum + platform.followers,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] relative">
      <DashboardHeader />
      <main className="flex-1 p-6 lg:p-10 relative">
        {/* Full glassy overlay for analytics page, but keep DashboardHeader visible */}
        <div className="absolute inset-0  flex items-center justify-center backdrop-blur-xl bg-white/30 dark:bg-black/30">
          <div
            className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl bg-white/40 dark:bg-black/40 border border-white/30 dark:border-black/30 max-w-lg mx-auto"
            style={{ backdropFilter: "blur(18px)" }}
          >
            <svg
              className="h-20 w-20 text-blue-400 mb-6 "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-2V9a6 6 0 10-12 0v6a2 2 0 002 2h8a2 2 0 002-2z"
              />
            </svg>
            <h2 className="text-3xl font-extrabold text-blue-700 dark:text-white mb-3 text-center">
              Game-Changing Analytics
              <br />
              Coming Soon!
            </h2>
            <p className="text-lg text-[var(--text-light)] text-center max-w-md mb-2 font-medium">
              Unlock the power of your content.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
