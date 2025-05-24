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
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-color)]">
              Analytics
            </h1>
            <p className="text-[var(--text-light)] mt-1">
              Track performance across your social platforms
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex">
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg overflow-hidden flex">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "7d"
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--text-light)] hover:bg-[var(--accent-light)]"
                }`}
              >
                7D
              </button>
              <button
                onClick={() => setTimeRange("14d")}
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "14d"
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--text-light)] hover:bg-[var(--accent-light)]"
                }`}
              >
                14D
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "30d"
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--text-light)] hover:bg-[var(--accent-light)]"
                }`}
              >
                30D
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-light)]">
                Total Posts
              </h3>
              <div className="w-8 h-8 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold text-[var(--text-color)]">
                  {totalPosts}
                </div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  +12% from last month
                </p>
              </div>
              <div className="text-xs text-[var(--text-light)] self-end">
                Past{" "}
                {timeRange === "7d" ? "7" : timeRange === "14d" ? "14" : "30"}{" "}
                days
              </div>
            </div>
          </div>

          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-light)]">
                Total Engagement
              </h3>
              <div className="w-8 h-8 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center text-[var(--accent-color)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold text-[var(--text-color)]">
                  {totalEngagement.toLocaleString()}
                </div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  +24% from last month
                </p>
              </div>
              <div className="text-xs text-[var(--text-light)] self-end">
                Past{" "}
                {timeRange === "7d" ? "7" : timeRange === "14d" ? "14" : "30"}{" "}
                days
              </div>
            </div>
          </div>

          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--text-light)]">
                Followers
              </h3>
              <div className="w-8 h-8 rounded-full bg-[var(--text-color)]/10 flex items-center justify-center text-[var(--text-color)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold text-[var(--text-color)]">
                  {totalFollowers.toLocaleString()}
                </div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  +8% from last month
                </p>
              </div>
              <div className="text-xs text-[var(--text-light)] self-end">
                Total across platforms
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Engagement Over Time</h3>

          <div className="h-64">
            {/* Simple Chart Implementation */}
            <div className="h-full flex items-end">
              <div className="flex-shrink-0 w-12 h-full flex flex-col justify-between text-xs text-[var(--text-light)]">
                <div>100</div>
                <div>75</div>
                <div>50</div>
                <div>25</div>
                <div>0</div>
              </div>

              <div className="flex-1 h-full flex flex-col">
                <div className="flex-1 flex items-end">
                  <div className="w-full flex justify-between items-end">
                    {ENGAGEMENT_DATA.map((day, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-12 rounded-t-sm bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-all hover:opacity-90 relative group"
                          style={{
                            height: `${(day.value / maxEngagement) * 180}px`,
                          }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-9 left-1/2 transform -translate-x-1/2 bg-[var(--foreground)] text-[var(--background)] text-xs py-1 px-2 rounded whitespace-nowrap">
                            {day.value} engagements
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-6 border-t border-[var(--border-color)] flex justify-between items-center px-6">
                  {ENGAGEMENT_DATA.map((day, index) => (
                    <div
                      key={index}
                      className="text-xs text-[var(--text-light)]"
                    >
                      {day.date}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Stats */}
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Platform Performance</h3>

            <div className="space-y-5">
              {PLATFORMS_DATA.map((platform, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getPlatformIcon(platform.name)}
                      <span className="ml-2 text-sm font-medium">
                        {platform.name}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--text-light)]">
                      {platform.engagement} engagements
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${
                          (platform.engagement /
                            Math.max(
                              ...PLATFORMS_DATA.map((p) => p.engagement)
                            )) *
                          100
                        }%`,
                        backgroundColor: getPlatformColor(platform.name),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              color="default"
              variant="bordered"
              size="sm"
              className="w-full mt-6"
            >
              View Detailed Report
            </Button>
          </div>

          {/* Top Posts */}
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Top Performing Posts</h3>

            <div className="space-y-4">
              {TOP_POSTS.map((post, index) => (
                <div
                  key={index}
                  className="p-4 border border-[var(--border-color)] rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {getPlatformIcon(post.platform)}
                      <span className="ml-2 text-xs text-[var(--text-light)]">
                        {post.date}
                      </span>
                    </div>
                    <div className="flex items-center px-2 py-1 bg-green-100 rounded text-xs text-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      {post.engagement}
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{post.content}</p>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/content"
              className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] text-sm font-medium flex items-center justify-center mt-6"
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
        </div>
      </main>
    </div>
  );
}
