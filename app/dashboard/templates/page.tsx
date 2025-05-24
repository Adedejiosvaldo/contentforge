"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@heroui/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Sample templates data
const TEMPLATES = [
  {
    id: "template1",
    name: "Product Launch Announcement",
    description: "Announce a new product or service across platforms",
    category: "Marketing",
    platforms: ["Twitter", "Facebook", "LinkedIn"],
    popularity: 87,
  },
  {
    id: "template2",
    name: "Weekly Tips Series",
    description: "Share industry tips and advice in a consistent weekly format",
    category: "Education",
    platforms: ["Instagram", "LinkedIn", "Blog"],
    popularity: 65,
  },
  {
    id: "template3",
    name: "Customer Testimonial",
    description: "Highlight positive feedback from your customers",
    category: "Social Proof",
    platforms: ["Facebook", "Instagram", "Twitter"],
    popularity: 92,
  },
  {
    id: "template4",
    name: "Special Offer/Discount",
    description: "Promote a limited-time offer or discount",
    category: "Sales",
    platforms: ["All Platforms"],
    popularity: 78,
  },
  {
    id: "template5",
    name: "Industry News Roundup",
    description: "Share and comment on relevant industry news and trends",
    category: "Thought Leadership",
    platforms: ["LinkedIn", "Twitter", "Blog"],
    popularity: 59,
  },
  {
    id: "template6",
    name: "Behind the Scenes",
    description: "Share insights into your company culture and operations",
    category: "Brand Awareness",
    platforms: ["Instagram", "Facebook"],
    popularity: 74,
  },
  {
    id: "template7",
    name: "How-to Tutorial",
    description: "Step-by-step instructions for using your product or service",
    category: "Education",
    platforms: ["Blog", "Instagram", "LinkedIn"],
    popularity: 83,
  },
  {
    id: "template8",
    name: "Event Promotion",
    description: "Promote an upcoming event or webinar",
    category: "Marketing",
    platforms: ["All Platforms"],
    popularity: 68,
  },
];

// Template categories
const CATEGORIES = [
  "All Categories",
  "Marketing",
  "Education",
  "Sales",
  "Social Proof",
  "Thought Leadership",
  "Brand Awareness",
];

export default function Templates() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [platformFilter, setPlatformFilter] = useState("All");

  // Filter templates based on search term and filters
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      template.category === selectedCategory;
    const matchesPlatform =
      platformFilter === "All" ||
      template.platforms.includes(platformFilter) ||
      template.platforms.includes("All Platforms");
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const getPlatformIcon = (platform: string, small = false) => {
    const size = small ? "w-4 h-4" : "w-5 h-5";
    const bgSize = small ? "w-6 h-6" : "w-7 h-7";

    switch (platform) {
      case "Twitter":
        return (
          <div
            className={`${bgSize} rounded-full bg-[#1DA1F2]/20 text-[#1DA1F2] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
        );
      case "Facebook":
        return (
          <div
            className={`${bgSize} rounded-full bg-[#4267B2]/20 text-[#4267B2] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </div>
        );
      case "Instagram":
        return (
          <div
            className={`${bgSize} rounded-full bg-gradient-to-br from-[#FCAF45]/20 via-[#E1306C]/20 to-[#5851DB]/20 text-[#E1306C] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
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
          <div
            className={`${bgSize} rounded-full bg-[#0077B5]/20 text-[#0077B5] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
        );
      case "Blog":
        return (
          <div
            className={`${bgSize} rounded-full bg-[var(--text-light)]/20 text-[var(--text-color)] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div
            className={`${bgSize} rounded-full bg-[var(--accent-color)]/20 text-[var(--accent-color)] flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={size}
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Marketing":
        return (
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
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        );
      case "Education":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        );
      case "Sales":
        return (
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "Social Proof":
        return (
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      case "Thought Leadership":
        return (
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
              d="M9.663 17h4.673M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "Brand Awareness":
        return (
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
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        );
      default:
        return (
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
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
              Content Templates
            </h1>
            <p className="text-[var(--text-light)] mt-1">
              Use these templates as starting points for your content
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/dashboard/create">
              <Button color="primary" size="sm">
                Create Custom Post
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
              Search Templates
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by name or description..."
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

          <div className="w-48">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[var(--text-light)] mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-2 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[var(--text-light)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-medium text-lg text-[var(--text-color)]">
                No templates found
              </h3>
              <p className="text-[var(--text-light)] max-w-md">
                We couldn't find any templates matching your current filters.
                Try adjusting your search criteria.
              </p>
              <Button
                size="sm"
                color="primary"
                className="mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                  setPlatformFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all hover:shadow-md hover:border-[var(--primary-color)]/30"
              >
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-[var(--primary-color)]/10 rounded-md text-[var(--primary-color)]">
                      {getCategoryIcon(template.category)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-[var(--text-color)]">
                        {template.name}
                      </h3>
                      <span className="text-xs text-[var(--text-light)]">
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-light)] mb-4">
                    {template.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {template.platforms.includes("All Platforms") ? (
                        <div className="flex items-center">
                          {getPlatformIcon("All", true)}
                          <span className="ml-2 text-xs">All Platforms</span>
                        </div>
                      ) : (
                        template.platforms
                          .slice(0, 3)
                          .map((platform, index) => (
                            <div key={index} className="inline-block">
                              {getPlatformIcon(platform, true)}
                            </div>
                          ))
                      )}
                      {template.platforms.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-[var(--border-color)] flex items-center justify-center text-xs text-[var(--text-light)]">
                          +{template.platforms.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-[var(--text-light)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
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
                      {template.popularity}% popular
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--border-color)] p-4">
                  <Link href={`/dashboard/create?template=${template.id}`}>
                    <Button color="primary" className="w-full">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
