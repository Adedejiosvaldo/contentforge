"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Checkbox } from "@heroui/react";

export default function Setup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    interests: [],
    preferences: {
      emailNotifications: true,
      contentReminders: true,
      analyticsReports: true,
    },
  });

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  // Pre-fill display name with session user name if available
  useEffect(() => {
    if (session?.user?.name && !formData.displayName) {
      setFormData((prev) => ({
        ...prev,
        displayName: session.user.name || "",
      }));
    }
  }, [session, formData.displayName]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return {
          ...prev,
          interests: interests.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...interests, interest],
        };
      }
    });
  };

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: checked,
      },
    }));
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form and redirect to dashboard
      try {
        setIsSubmitting(true);
        setError("");

        // Only proceed if we have a session with a user
        if (!session?.user?.email) {
          setError("Authentication error. Please try logging in again.");
          return;
        }

        // Submit user preferences to the API
        const response = await fetch("/api/auth/complete-setup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: formData.displayName,
            bio: formData.bio,
            interests: formData.interests,
            preferences: formData.preferences,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to complete setup");
        }

        // Redirect to dashboard on success
        router.push("/dashboard");
      } catch (error) {
        console.error("Setup error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while completing setup"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const finishSetup = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      // Only proceed if we have a session with a user
      if (!session?.user?.email) {
        setError("Authentication error. Please try logging in again.");
        return;
      }

      // Submit user preferences to the API
      const response = await fetch("/api/auth/complete-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: session.user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to complete setup");
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (error) {
      console.error("Setup error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while completing setup"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const interests = [
    "Content Marketing",
    "Social Media",
    "SEO",
    "Copywriting",
    "Email Marketing",
    "Video Content",
    "Blogging",
    "Graphic Design",
    "Analytics",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-color)] to-[var(--accent-light)]">
      <header className="w-full flex items-center justify-between px-6 md:px-20 py-4 glass sticky top-0 z-10 border-b border-[var(--border-color)] shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-medium text-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm">
            <Image
              src="/contentcraft-logo.svg"
              alt="ContentCraft Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-semibold">ContentCraft</span>
        </Link>
        <div className="text-sm text-[var(--text-light)]">Setup Wizard</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="glass backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-xl border border-[var(--border-color)] p-8 md:p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--primary-color)]/30 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary-color)]/10 rounded-full filter blur-[80px] -z-10"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--accent-color)]/10 rounded-full filter blur-[80px] -z-10"></div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        currentStep >= step
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-[var(--background)]/40 text-[var(--text-light)]"
                      }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-[var(--background)]/30 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[var(--primary-color)]"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-6">
                  Tell us about yourself
                </h2>
                <div className="space-y-5">
                  <Input
                    label="Display Name"
                    type="text"
                    placeholder="How should we address you?"
                    value={formData.displayName}
                    onChange={(e) =>
                      updateFormData("displayName", e.target.value)
                    }
                    variant="bordered"
                    className="w-full"
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      className="w-full h-24 p-3 bg-[var(--background)]/30 border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
                      placeholder="Tell us a little about yourself..."
                      value={formData.bio}
                      onChange={(e) => updateFormData("bio", e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-6">
                  Select your interests
                </h2>
                <p className="text-center text-[var(--text-light)] mb-4">
                  This helps us personalize your content suggestions
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <div
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-lg cursor-pointer text-center text-sm transition-colors ${
                        formData.interests.includes(interest)
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-[var(--background)]/30 text-[var(--text-color)] hover:bg-[var(--background)]/50"
                      }`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-6">
                  Set your preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[var(--background)]/20 rounded-xl">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-[var(--text-light)]">
                        Receive updates and important alerts
                      </p>
                    </div>
                    <Checkbox
                      isSelected={formData.preferences.emailNotifications}
                      onValueChange={(checked) =>
                        handlePreferenceChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--background)]/20 rounded-xl">
                    <div>
                      <h3 className="font-medium">Content Reminders</h3>
                      <p className="text-sm text-[var(--text-light)]">
                        Get reminded to create new content
                      </p>
                    </div>
                    <Checkbox
                      isSelected={formData.preferences.contentReminders}
                      onValueChange={(checked) =>
                        handlePreferenceChange("contentReminders", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--background)]/20 rounded-xl">
                    <div>
                      <h3 className="font-medium">Analytics Reports</h3>
                      <p className="text-sm text-[var(--text-light)]">
                        Receive periodic performance reports
                      </p>
                    </div>
                    <Checkbox
                      isSelected={formData.preferences.analyticsReports}
                      onValueChange={(checked) =>
                        handlePreferenceChange("analyticsReports", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 text-sm bg-red-100 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="flat"
                onClick={handlePrevious}
                isDisabled={currentStep === 1 || isSubmitting}
              >
                Previous
              </Button>
              <Button
                color="primary"
                onClick={handleNext}
                isLoading={isSubmitting}
              >
                {currentStep === 3 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-sm text-[var(--text-light)]">
        <p>© 2025 ContentCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
