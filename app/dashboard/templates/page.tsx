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
    name: "Problem-Agitate-Solve (PAS)",
    description:
      "Identify a pain point, explore its impact, and present your solution.",
    category: "Conversion",
    platforms: ["All Platforms"],
    prompt: `**[Identify a Common Problem Your Audience Faces]**
Is this you? [Describe the problem in relatable terms]. It's frustrating, right?

**[Agitate the Problem]**
The real issue is [explain the deeper consequences of the problem]. It costs you time, money, or peace of mind.

**[Present Your Solution]**
What if there was a better way? Our [Product/Service] is designed to [explain the key benefit that solves the problem].

Stop struggling. Click the link to learn more!

#[YourIndustry] #[Problem] #[Solution]`,
  },
  {
    id: "template2",
    name: "Before-After-Bridge",
    description:
      "Show the transformation your product provides, from the current state to the desired one.",
    category: "Conversion",
    platforms: ["Instagram", "Facebook", "LinkedIn"],
    prompt: `**Before:** [Describe the frustrating "before" state].

**After:** Imagine a world where [describe the ideal "after" state].

**Bridge:** You can get there. Our [Product/Service] is the bridge. It helps you [mention 1-2 key features/benefits].

Ready for your 'after'? Visit our site.

#[Transformation] #[YourBrand] #[Success]`,
  },
  {
    id: "template3",
    name: "Feature-Advantage-Benefit (FAB)",
    description:
      "Clearly articulate your value by connecting features to real-world benefits for the user.",
    category: "Value & Education",
    platforms: ["LinkedIn", "Blog", "Facebook"],
    prompt: `You asked, we listened! Our new [Feature Name] is here.

**Feature:** [Describe the feature, e.g., 'one-click scheduling'].
**Advantage:** This means you can [describe the advantage, e.g., 'save time planning content'].
**Benefit:** So you can focus on [describe the ultimate benefit, e.g., 'growing your business'].

Check it out today!

#[NewFeature] #[ProductUpdate] #[YourIndustry]`,
  },
  {
    id: "template4",
    name: "The 'How-To' Micro-Tutorial",
    description:
      "Provide immediate value by teaching your audience how to solve a specific, small problem.",
    category: "Value & Education",
    platforms: ["Instagram", "Blog", "Twitter"],
    prompt: `Want to [achieve a specific outcome]? Here’s how in 3 simple steps:

1. **[Step 1]** - [Briefly explain the first action].
2. **[Step 2]** - [Briefly explain the second action].
3. **[Step 3]** - [Briefly explain the final action].

And that's it! You've just [restate the achievement].

What topic should we cover next? Let us know below! 👇

#[HowTo] #[TipsAndTricks] #[YourNiche]`,
  },
  {
    id: "template5",
    name: "Myth vs. Fact",
    description:
      "Bust a common industry myth and establish your brand as a knowledgeable authority.",
    category: "Brand Building",
    platforms: ["LinkedIn", "Twitter", "Blog"],
    prompt: `**Myth:** [State a common misconception in your industry].

**Fact:** The truth is actually [state the reality, providing a brief explanation or data point].

Why does this matter? Because [explain the negative impact of the myth or the positive impact of the truth].

Follow us for more industry truths!

#[MythBusting] #[IndustryInsights] #[YourBrandName]`,
  },
  {
    id: "template6",
    name: "Limited-Time Offer / Urgency",
    description:
      "Drive immediate action with a time-sensitive promotion or special offer.",
    category: "Conversion",
    platforms: ["All Platforms"],
    prompt: `🚨 **FLASH SALE!** 🚨

For the next 48 hours, get [Percentage/Amount Off] our [Product/Service]!

This is your chance to [mention a key benefit]. Don't wait – this offer disappears on [End Date].

Claim your discount now! [Link in Bio]

#[FlashSale] #[LimitedTimeOffer] #[YourBrand]`,
  },
  {
    id: "template7",
    name: "Community Question / Engagement",
    description:
      "Spark conversation and get valuable insights by asking your audience a question.",
    category: "Brand Building",
    platforms: ["Facebook", "Twitter", "Instagram"],
    prompt: `We need your help to decide!

What's the biggest challenge you face when it comes to [Your Industry/Topic]?

A) [Option A]
B) [Option B]
C) [Option C]
D) Something else? (Tell us in the comments!)

Your feedback helps us create better [Products/Content] for you. Let's hear it! 👇

#[Community] #[Feedback] #[YourIndustry]`,
  },
  {
    id: "template8",
    name: "Customer Spotlight / Testimonial",
    description:
      "Build trust and credibility by showcasing a real customer's success story.",
    category: "Brand Building",
    platforms: ["LinkedIn", "Instagram", "Facebook"],
    prompt: `We're so proud to feature one of our amazing customers, [Customer Name]!

They were struggling with [the customer's problem]. Here's what they had to say after using [Your Product]:

"[Insert a powerful quote from the customer's testimonial]."

We love helping our customers achieve [the positive outcome]. Thank you for trusting us, [Customer Name]!

#[CustomerSuccess] #[Testimonial] #[YourBrand]`,
  },
];

// Template categories
const CATEGORIES = [
  "All Categories",
  "Conversion",
  "Brand Building",
  "Value & Education",
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
      case "Conversion":
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
      case "Value & Education":
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
      case "Brand Building":
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
                  </div>
                </div>

                <div className="border-t border-[var(--border-color)] p-4">
                  <Link
                    href={`/dashboard/create?prompt=${encodeURIComponent(
                      template.prompt
                    )}`}
                  >
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
