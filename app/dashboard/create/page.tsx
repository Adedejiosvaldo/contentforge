"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Textarea } from "@heroui/react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostScheduling from "@/components/dashboard/PostScheduling";

// Define Zod schema for validation (remains the same)
const contentSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt cannot be empty." }),
  platforms: z
    .object({
      twitter: z.boolean(),
      facebook: z.boolean(),
      instagram: z.boolean(),
      linkedin: z.boolean(),
    })
    .refine((data) => Object.values(data).some((val) => val === true), {
      message: "Please select at least one platform.",
      path: ["platforms"],
    }),
});

// Infer the type from the schema
type ContentFormData = z.infer<typeof contentSchema>;

export default function CreateContent() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("post");
  const [generatedContent, setGeneratedContent] = useState<
    Record<string, string>
  >({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({}); // Track copy feedback per platform

  const {
    register,
    handleSubmit,
    control, // For Controller
    watch, // To watch form values
    setValue, // To set form values
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      prompt: "",
      platforms: {
        twitter: true,
        facebook: false,
        instagram: false,
        linkedin: true,
      },
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  const currentPlatforms = watch("platforms"); // Watch platform changes
  const currentPrompt = watch("prompt"); // Watch prompt changes

  const onSubmit = async (data: ContentFormData) => {
    setIsGenerating(true);
    setGeneratedContent({});

    const selectedPlatforms = Object.entries(data.platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: data.prompt,
          socialMediaPlatforms: selectedPlatforms,
        }),
      });

      if (!response.ok) {
        console.error("API Error:", await response.text());
        setIsGenerating(false);
        return;
      }

      const responseData = await response.json();
      setGeneratedContent(responseData.generatedPosts || {});
    } catch (error) {
      console.error("Failed to generate content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlatformToggle = (
    platformName: keyof ContentFormData["platforms"]
  ) => {
    setValue(`platforms.${platformName}`, !currentPlatforms[platformName], {
      shouldValidate: true, // Trigger validation for platforms
    });
  };

  // Copy to clipboard handler
  const handleCopy = (platform: string) => {
    if (generatedContent[platform]) {
      navigator.clipboard.writeText(generatedContent[platform]);
      setCopyStatus((prev) => ({ ...prev, [platform]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [platform]: false }));
      }, 1500);
    }
  };

  // Save generated posts to DB
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveContent = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    try {
      const savePromises = Object.entries(generatedContent).map(
        async ([platform, content]) => {
          if (content) {
            const res = await fetch("/api/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ platform, content }),
            });
            if (!res.ok) throw new Error(`Failed to save for ${platform}`);
          }
        }
      );
      await Promise.all(savePromises);
      setSaveSuccess(true);
    } catch (err: any) {
      setSaveError(err.message || "Failed to save content");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const platformCount = Object.values(currentPlatforms).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-color)]">
              Create Content
            </h1>
            <p className="text-[var(--text-light)] mt-1">
              Generate engaging content for multiple platforms
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/dashboard/templates">
              <Button color="default" variant="bordered" size="sm">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Your Input</h2>

              <div className="mb-6">
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-[var(--text-color)] mb-2"
                >
                  Prompt
                </label>
                <Textarea
                  id="prompt"
                  rows={10}
                  {...register("prompt")} // Register with react-hook-form
                  placeholder="Describe what you want to post about..."
                  className={`w-full text-sm ${
                    errors.prompt
                      ? "border-red-500 focus:border-red-500 ring-red-500"
                      : "border-[var(--border-color)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                  }`}
                />
                {errors.prompt && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.prompt.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium text-[var(--text-color)] mb-2 ${
                    errors.platforms ? "text-red-500" : ""
                  }`}
                >
                  Target Platforms ({platformCount})
                </label>
                <div
                  className={`grid grid-cols-2 gap-3 ${
                    errors.platforms
                      ? "border border-red-500 rounded-md p-1"
                      : ""
                  }`}
                >
                  {(
                    Object.keys(currentPlatforms) as Array<
                      keyof ContentFormData["platforms"]
                    >
                  ).map((platformKey) => (
                    <Button
                      type="button" // Prevent form submission
                      key={platformKey}
                      variant={
                        currentPlatforms[platformKey] ? "solid" : "ghost"
                      }
                      color={
                        currentPlatforms[platformKey] ? "primary" : "default"
                      }
                      onClick={() => handlePlatformToggle(platformKey)}
                      className="flex items-center justify-start p-3 w-full text-sm"
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 border ${
                          currentPlatforms[platformKey]
                            ? "bg-[var(--primary-color)] border-[var(--primary-color)]"
                            : "border-[var(--border-color)]"
                        }`}
                      >
                        {currentPlatforms[platformKey] && (
                          <svg
                            className="text-white w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="capitalize">{platformKey}</span>
                    </Button>
                  ))}
                </div>
                {errors.platforms && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.platforms.message}
                  </p>
                )}
              </div>

              {/* Post Scheduling */}
              <div className="mb-6">
                <PostScheduling
                  onSchedule={(scheduleData) => {
                    console.log("Scheduled post:", scheduleData);
                    // Here you would handle the scheduling data
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                  Advanced Settings
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-light)]">
                      Include Hashtags
                    </span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="hashtags"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="hashtags"
                        className="block h-6 overflow-hidden bg-gray-300 peer-checked:bg-[var(--primary-color)] rounded-full cursor-pointer"
                      ></label>
                      <span className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-light)]">
                      Include Emojis
                    </span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="emojis"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="emojis"
                        className="block h-6 overflow-hidden bg-gray-300 peer-checked:bg-[var(--primary-color)] rounded-full cursor-pointer"
                      ></label>
                      <span className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit" // Ensure button submits the form
                color={isValid ? "primary" : "default"}
                className="w-full justify-center py-3 text-base font-semibold transition-colors"
                disabled={isSubmitting || isGenerating} // Use RHF state
                isLoading={isSubmitting || isGenerating} // Use RHF state
              >
                Generate Content
              </Button>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Generated Content</h2>

              {isGenerating ? (
                <div className="flex items-center justify-center h-80">
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
                      Generating content for {platformCount} platform
                      {platformCount !== 1 ? "s" : ""}...
                    </p>
                  </div>
                </div>
              ) : Object.keys(generatedContent).length > 0 ? ( // Check if generatedContent has data
                <div className="space-y-6">
                  {currentPlatforms.twitter && generatedContent.twitter && (
                    <div className="border border-[var(--border-color)] rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#1DA1F2]/20 text-[#1DA1F2] flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </div>
                        <h3 className="font-medium">Twitter Post</h3>
                        <div className="flex ml-auto gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy("twitter")}
                            className="text-[var(--text-light)] hover:text-[var(--primary-color)] p-1"
                            aria-label="Copy Twitter post"
                          >
                            {copyStatus.twitter ? (
                              <span className="flex items-center text-green-600 text-xs font-medium">
                                <svg
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Copied!
                              </span>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15V5a2 2 0 012-2h10" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-[var(--text-color)]">
                          {generatedContent.twitter}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentPlatforms.facebook && generatedContent.facebook && (
                    <div className="border border-[var(--border-color)] rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#4267B2]/20 text-[#4267B2] flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </div>
                        <h3 className="font-medium">Facebook Post</h3>
                        <div className="flex ml-auto gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy("facebook")}
                            className="text-[var(--text-light)] hover:text-[var(--primary-color)] p-1"
                            aria-label="Copy Facebook post"
                          >
                            {copyStatus.facebook ? (
                              <span className="flex items-center text-green-600 text-xs font-medium">
                                <svg
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Copied!
                              </span>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15V5a2 2 0 012-2h10" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-[var(--text-color)]">
                          {generatedContent.facebook}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentPlatforms.instagram && generatedContent.instagram && (
                    <div className="border border-[var(--border-color)] rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#5851DB]/20 text-[#E1306C] flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                          </svg>
                        </div>
                        <h3 className="font-medium">Instagram Post</h3>
                        <div className="flex ml-auto gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy("instagram")}
                            className="text-[var(--text-light)] hover:text-[var(--primary-color)] p-1"
                            aria-label="Copy Instagram post"
                          >
                            {copyStatus.instagram ? (
                              <span className="flex items-center text-green-600 text-xs font-medium">
                                <svg
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Copied!
                              </span>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15V5a2 2 0 012-2h10" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-[var(--text-color)]">
                          {generatedContent.instagram}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentPlatforms.linkedin && generatedContent.linkedin && (
                    <div className="border border-[var(--border-color)] rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#0077B5]/20 text-[#0077B5] flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </div>
                        <h3 className="font-medium">LinkedIn Post</h3>
                        <div className="flex ml-auto gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy("linkedin")}
                            className="text-[var(--text-light)] hover:text-[var(--primary-color)] p-1"
                            aria-label="Copy LinkedIn post"
                          >
                            {copyStatus.linkedin ? (
                              <span className="flex items-center text-green-600 text-xs font-medium">
                                <svg
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Copied!
                              </span>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15V5a2 2 0 012-2h10" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-[var(--text-color)]">
                          {generatedContent.linkedin}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-80 text-[var(--text-light)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-[var(--text-light)]/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.663 17h4.673M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">
                    No content generated yet
                  </h3>
                  <p className="max-w-sm">
                    Enter a prompt and select your target platforms to generate
                    content
                  </p>
                </div>
              )}

              {/* Regenerate and Save buttons: Show only if content exists and not generating */}
              {!isGenerating && Object.keys(generatedContent).length > 0 && (
                <div className="flex justify-between mt-6 pt-4 border-t border-[var(--border-color)]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSubmit(onSubmit)} // Assuming regenerate calls handleSubmit again
                    disabled={isSubmitting || isGenerating} // Disable if error or generating
                    className="text-[var(--text-light)] text-sm flex items-center"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={handleSaveContent}
                    isLoading={isSaving}
                    disabled={isSaving}
                  >
                    {saveSuccess ? "Saved!" : "Save Content"}
                  </Button>
                  {saveError && (
                    <span className="text-xs text-red-500 ml-2">
                      {saveError}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
