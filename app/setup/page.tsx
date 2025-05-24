"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Checkbox, Select, SelectItem } from "@heroui/react";

export default function Setup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    company: "",
    role: "",
    industry: "",
    niche: "",
    audience: [] as string[],
    audienceDesc: "",
    brandVoice: [] as string[],
    keywords: "",
    bio: "",
    interests: [] as string[],
    preferences: {
      emailNotifications: true,
      contentReminders: true,
      analyticsReports: true,
    },
  });

  // Add all 6 steps for the wizard
  const totalSteps = 6;

  // Step content definitions
  const stepContent = [
    // Step 1: Get Started
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">Let's get started</div>
      </div>
      <div className="space-y-4">
        <Input
          label="Your Name"
          value={formData.displayName}
          onValueChange={(val) => updateFormData("displayName", val)}
          className="w-full"
        />
        <Input
          label="Company (optional)"
          value={formData.company || ""}
          onValueChange={(val) => updateFormData("company", val)}
          className="w-full"
        />
        <Input
          label="Role (optional)"
          value={formData.role || ""}
          onValueChange={(val) => updateFormData("role", val)}
          className="w-full"
        />
      </div>
    </>,
    // Step 2: Industry
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">
          What industry are you in?
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Select your industry"
          selectedKeys={formData.industry ? [formData.industry] : []}
          onSelectionChange={(keys) =>
            updateFormData("industry", Array.from(keys)[0] as string)
          }
          className="w-full"
          placeholder="Select your industry"
        >
          {[
            { key: "Marketing", label: "Marketing" },
            { key: "Tech", label: "Tech" },
            { key: "Education", label: "Education" },
            { key: "Finance", label: "Finance" },
            { key: "Healthcare", label: "Healthcare" },
            { key: "Other", label: "Other" },
          ].map((industry) => (
            <SelectItem key={industry.key}>{industry.label}</SelectItem>
          ))}
        </Select>
        <Input
          label="What's your niche or area of expertise?"
          value={formData.niche || ""}
          onValueChange={(val) => updateFormData("niche", val)}
          className="w-full"
        />
      </div>
    </>,
    // Step 3: Audience
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">
          Who is your ideal audience?
        </div>
        <div className="text-[var(--text-light)] text-sm mb-4">
          Select all that apply or describe your ideal audience in your own
          words.
        </div>
      </div>
      <div className="space-y-2 space-x-2 mb-4">
        {[
          "Entrepreneurs",
          "Students",
          "Parents",
          "Small Business Owners",
          "Tech Enthusiasts",
          "Creatives",
        ].map((aud) => (
          <Checkbox
            key={aud}
            isSelected={formData.audience?.includes(aud)}
            onValueChange={(checked) => {
              setFormData((prev) => {
                const arr = prev.audience ? [...prev.audience] : [];
                if (checked) arr.push(aud);
                else arr.splice(arr.indexOf(aud), 1);
                return { ...prev, audience: arr };
              });
            }}
          >
            {aud}
          </Checkbox>
        ))}
      </div>
      <Input
        label="Describe your ideal audience"
        value={formData.audienceDesc || ""}
        onValueChange={(val) => updateFormData("audienceDesc", val)}
        className="w-full"
      />
    </>,
    // Step 4: Brand Voice
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">
          What's your brand voice and tone?
        </div>
        <div className="text-[var(--text-light)] text-sm mb-4">
          Select the adjectives that best describe your brand's communication
          style. This helps us tailor content to resonate with your audience.
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {[
          "Formal",
          "Casual",
          "Humorous",
          "Authoritative",
          "Inspirational",
          "Friendly",
          "Bold",
        ].map((tone) => (
          <Button
            key={tone}
            variant={formData.brandVoice?.includes(tone) ? "solid" : "flat"}
            color="primary"
            onClick={() => {
              setFormData((prev) => {
                const arr = prev.brandVoice ? [...prev.brandVoice] : [];
                if (arr.includes(tone)) arr.splice(arr.indexOf(tone), 1);
                else arr.push(tone);
                return { ...prev, brandVoice: arr };
              });
            }}
          >
            {tone}
          </Button>
        ))}
      </div>
    </>,
    // Step 5: Keywords
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">Keywords and Hashtags</div>
        <div className="text-[var(--text-light)] text-sm mb-4">
          List your frequently used keywords, brand terms, or specific hashtags
          you want the AI to prioritize. This helps the AI understand your brand
          and audience.
        </div>
      </div>
      <Input
        label="Enter keywords and hashtags"
        value={formData.keywords || ""}
        onValueChange={(val) => updateFormData("keywords", val)}
        className="w-full"
      />
    </>,
    // Step 6: Review
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">
          Review your information
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Name</span>
          <span>{formData.displayName}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Email</span>
          <span>{session?.user?.email}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Industry</span>
          <span>{formData.industry}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Company</span>
          <span>{formData.company}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Role</span>
          <span>{formData.role}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Target Audience</span>
          <span>{formData.audience?.join(", ") || formData.audienceDesc}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Brand Voice</span>
          <span>{formData.brandVoice?.join(", ")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Keywords</span>
          <span>{formData.keywords}</span>
        </div>
      </div>
    </>,
  ];

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

  // Navigation logic
  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      await finishSetup();
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
            {/* Progress bar */}
            <div className="mb-8">
              <div className="text-sm font-medium mb-2 text-left">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-[var(--primary-color)] rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step content */}
            {stepContent[currentStep - 1]}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="flat"
                onClick={handlePrevious}
                isDisabled={currentStep === 1 || isSubmitting}
              >
                Back
              </Button>
              <Button
                color="primary"
                onClick={handleNextStep}
                isLoading={isSubmitting}
              >
                {currentStep === totalSteps ? "Complete Setup" : "Next"}
              </Button>
            </div>
            {error && (
              <div className="mt-4 p-3 text-sm bg-red-100 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-sm text-[var(--text-light)]">
        <p>© 2025 ContentCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
