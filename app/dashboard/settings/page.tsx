"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Settings() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    industry: "",
    niche: "",
    audienceDesc: "",
    bio: "",
    keywords: "",
    emailNotifications: true,
    contentReminders: true,
    analyticsReports: true,
  });
  const [audiences, setAudiences] = useState<string[]>([]);
  const [brandVoices, setBrandVoices] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    // Fetch user data when session is available
    if (session?.user?.email) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Normally we would fetch this from an API, but for demo purposes, let's simulate data

      // Simulate API call delay
      setTimeout(() => {
        // Use session data and default values
        setUserData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          company: "Demo Company",
          role: "Marketing Manager",
          industry: "Technology",
          niche: "Software as a Service",
          audienceDesc: "Tech professionals aged 25-45",
          bio: "Digital marketing professional with 5+ years experience in SaaS.",
          keywords: "marketing, technology, saas, content creation",
          emailNotifications: true,
          contentReminders: true,
          analyticsReports: true,
        });

        setAudiences([
          "Tech Professionals",
          "Marketing Decision-makers",
          "Small Business Owners",
        ]);
        setBrandVoices(["Professional", "Friendly", "Authoritative"]);
        setInterests(["Content Marketing", "SEO", "Social Media"]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setUserData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = (
    list: string[],
    setList: (items: string[]) => void,
    value: string
  ) => {
    if (value.trim() && !list.includes(value)) {
      setList([...list, value.trim()]);
      return true;
    }
    return false;
  };

  const handleRemoveItem = (
    list: string[],
    setList: (items: string[]) => void,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");

    try {
      // Simulate API call
      setTimeout(() => {
        setSaveStatus("success");

        // Reset save status after a delay
        setTimeout(() => {
          setSaveStatus("");
        }, 2000);
      }, 1500);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus("error");

      // Reset save status after a delay
      setTimeout(() => {
        setSaveStatus("");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <DashboardHeader />
        <main className="flex-1 flex items-center justify-center p-6 lg:p-10">
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
            <p className="mt-3 text-[var(--text-light)]">Loading settings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-color)]">
              Account Settings
            </h1>
            <p className="text-[var(--text-light)] mt-1">
              Update your profile and preferences
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Profile Section */}
              <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-5">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      disabled
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)]/50 px-4 py-2.5 text-sm text-[var(--text-light)] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={userData.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Job Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={userData.role}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={userData.industry}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="niche"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Niche
                    </label>
                    <input
                      type="text"
                      id="niche"
                      name="niche"
                      value={userData.niche}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={userData.bio}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="audienceDesc"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Audience Description
                  </label>
                  <textarea
                    id="audienceDesc"
                    name="audienceDesc"
                    rows={2}
                    value={userData.audienceDesc}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={userData.keywords}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                  />
                </div>
              </div>

              {/* Content Preferences */}
              <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-5">
                  Content Preferences
                </h2>

                {/* Audience Targeting */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1.5">
                    Target Audience
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {audiences.map((item, index) => (
                      <div
                        key={index}
                        className="bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(audiences, setAudiences, index)
                          }
                          className="ml-2 focus:outline-none"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      id="audience"
                      placeholder="Add audience"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = (e.target as HTMLInputElement).value;
                          if (handleAddItem(audiences, setAudiences, value)) {
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      color="default"
                      variant="bordered"
                      size="sm"
                      className="ml-2 h-10"
                      onClick={(e) => {
                        const input = document.getElementById(
                          "audience"
                        ) as HTMLInputElement;
                        if (
                          handleAddItem(audiences, setAudiences, input.value)
                        ) {
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Brand Voice */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1.5">
                    Brand Voice
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {brandVoices.map((item, index) => (
                      <div
                        key={index}
                        className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(brandVoices, setBrandVoices, index)
                          }
                          className="ml-2 focus:outline-none"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      id="brandVoice"
                      placeholder="Add brand voice"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = (e.target as HTMLInputElement).value;
                          if (
                            handleAddItem(brandVoices, setBrandVoices, value)
                          ) {
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      color="default"
                      variant="bordered"
                      size="sm"
                      className="ml-2 h-10"
                      onClick={(e) => {
                        const input = document.getElementById(
                          "brandVoice"
                        ) as HTMLInputElement;
                        if (
                          handleAddItem(
                            brandVoices,
                            setBrandVoices,
                            input.value
                          )
                        ) {
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1.5">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {interests.map((item, index) => (
                      <div
                        key={index}
                        className="bg-[var(--text-light)]/10 text-[var(--text-color)] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(interests, setInterests, index)
                          }
                          className="ml-2 focus:outline-none"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      id="interest"
                      placeholder="Add interest"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = (e.target as HTMLInputElement).value;
                          if (handleAddItem(interests, setInterests, value)) {
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      color="default"
                      variant="bordered"
                      size="sm"
                      className="ml-2 h-10"
                      onClick={(e) => {
                        const input = document.getElementById(
                          "interest"
                        ) as HTMLInputElement;
                        if (
                          handleAddItem(interests, setInterests, input.value)
                        ) {
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Notifications Box */}
              <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6 mb-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-5">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-[var(--text-light)] mt-0.5">
                        Receive emails about activity
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={userData.emailNotifications}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="emailNotifications"
                        className="block h-6 overflow-hidden bg-gray-300 peer-checked:bg-[var(--primary-color)] rounded-full cursor-pointer"
                      ></label>
                      <span className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Content Reminders</p>
                      <p className="text-xs text-[var(--text-light)] mt-0.5">
                        Get reminded to create content
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="contentReminders"
                        name="contentReminders"
                        checked={userData.contentReminders}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="contentReminders"
                        className="block h-6 overflow-hidden bg-gray-300 peer-checked:bg-[var(--primary-color)] rounded-full cursor-pointer"
                      ></label>
                      <span className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Analytics Reports</p>
                      <p className="text-xs text-[var(--text-light)] mt-0.5">
                        Weekly performance reports
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="analyticsReports"
                        name="analyticsReports"
                        checked={userData.analyticsReports}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="analyticsReports"
                        className="block h-6 overflow-hidden bg-gray-300 peer-checked:bg-[var(--primary-color)] rounded-full cursor-pointer"
                      ></label>
                      <span className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    disabled={saveStatus === "saving"}
                  >
                    {saveStatus === "saving" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : saveStatus === "success" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Saved!
                      </span>
                    ) : (
                      "Save Settings"
                    )}
                  </Button>

                  {saveStatus === "error" && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      There was an error saving your settings. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
