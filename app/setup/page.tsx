"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Checkbox, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const setupSchema = z.object({
  displayName: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  role: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  niche: z.string().optional(),
  audience: z.array(z.string()).min(1, "Select at least one audience"),
  audienceDesc: z.string().optional(),
  brandVoice: z.array(z.string()).min(1, "Select at least one brand voice"),
  keywords: z.string().min(1, "Please enter at least one keyword or hashtag"),
  bio: z.string().optional(),
  interests: z.array(z.string()).optional(),
  preferences: z.object({
    emailNotifications: z.boolean(),
    contentReminders: z.boolean(),
    analyticsReports: z.boolean(),
  }),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function Setup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors, isSubmitting: formSubmitting },
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      displayName: "",
      company: "",
      role: "",
      industry: "",
      niche: "",
      audience: [],
      audienceDesc: "",
      brandVoice: [],
      keywords: "",
      bio: "",
      interests: [],
      preferences: {
        emailNotifications: true,
        contentReminders: true,
        analyticsReports: true,
      },
    },
    mode: "onTouched",
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
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <Input
              label="Your Name"
              {...field}
              errorMessage={errors.displayName?.message}
              className={`w-full ${
                errors.displayName ? "border-red-500 ring-2 ring-red-500" : ""
              }`}
              isInvalid={!!errors.displayName}
              isRequired
            />
          )}
        />
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Input
              label="Company (optional)"
              {...field}
              errorMessage={errors.company?.message}
              className="w-full"
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Input
              label="Role (optional)"
              {...field}
              errorMessage={errors.role?.message}
              className="w-full"
            />
          )}
        />
      </div>
    </>,
    // Step 2: Industry
    <>
      <div className="text-center mb-8">
        <div className="text-lg font-semibold mb-2">
          What industry are you in?
        </div>
        <div className="text-[var(--text-light)] text-sm mb-4">
          Please select your industry to proceed.
        </div>
      </div>
      <div className="space-y-4">
        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <Select
              label="Select your industry"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) =>
                field.onChange(Array.from(keys)[0] as string)
              }
              className={`w-full ${
                errors.industry ? "border-red-500 ring-2 ring-red-500" : ""
              }`}
              placeholder="Select your industry"
              errorMessage={errors.industry?.message}
              isInvalid={!!errors.industry}
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
          )}
        />
        <Controller
          name="niche"
          control={control}
          render={({ field }) => (
            <Input
              label="What's your niche or area of expertise?"
              {...field}
              errorMessage={errors.niche?.message}
              className="w-full"
            />
          )}
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
          <Controller
            key={aud}
            name="audience"
            control={control}
            render={({ field }) => (
              <Checkbox
                isSelected={field.value?.includes(aud)}
                onValueChange={(checked) => {
                  const arr = field.value ? [...field.value] : [];
                  if (checked) arr.push(aud);
                  else arr.splice(arr.indexOf(aud), 1);
                  field.onChange(arr);
                }}
                color={errors.audience ? "danger" : "primary"}
              >
                {aud}
              </Checkbox>
            )}
          />
        ))}
      </div>
      {errors.audience && (
        <p className="text-red-500 text-sm">{errors.audience.message}</p>
      )}
      <Controller
        name="audienceDesc"
        control={control}
        render={({ field }) => (
          <Input
            label="Describe your ideal audience"
            {...field}
            errorMessage={errors.audienceDesc?.message}
            className="w-full"
          />
        )}
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
          <Controller
            key={tone}
            name="brandVoice"
            control={control}
            render={({ field }) => (
              <Button
                variant={field.value?.includes(tone) ? "solid" : "flat"}
                color={errors.brandVoice ? "danger" : "primary"}
                onClick={() => {
                  const arr = field.value ? [...field.value] : [];
                  if (arr.includes(tone)) arr.splice(arr.indexOf(tone), 1);
                  else arr.push(tone);
                  field.onChange(arr);
                }}
              >
                {tone}
              </Button>
            )}
          />
        ))}
      </div>
      {errors.brandVoice && (
        <p className="text-red-500 text-sm">{errors.brandVoice.message}</p>
      )}
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
      <Controller
        name="keywords"
        control={control}
        render={({ field }) => (
          <Input
            label="Enter keywords and hashtags"
            {...field}
            errorMessage={errors.keywords?.message}
            className={`w-full ${
              errors.keywords ? "border-red-500 ring-2 ring-red-500" : ""
            }`}
            isInvalid={!!errors.keywords}
            isRequired
          />
        )}
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
          <span>{getValues("displayName")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Email</span>
          <span>{session?.user?.email}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Industry</span>
          <span>{getValues("industry")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Company</span>
          <span>{getValues("company")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Role</span>
          <span>{getValues("role")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Target Audience</span>
          <span>
            {getValues("audience")?.join(", ") || getValues("audienceDesc")}
          </span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Brand Voice</span>
          <span>{getValues("brandVoice")?.join(", ")}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Keywords</span>
          <span>{getValues("keywords")}</span>
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
    if (session?.user?.name && !getValues("displayName")) {
      setValue("displayName", session.user.name || "");
    }
  }, [session, getValues, setValue]);

  const finishSetup = async (data: SetupFormData) => {
    try {
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
          ...data,
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
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Navigation logic
  const handleNextStep = async () => {
    // Define required fields for each step
    const requiredFieldsByStep = {
      1: ["displayName"],
      2: ["industry"],
      3: ["audience"],
      4: ["brandVoice"],
      5: ["keywords"],
      6: [], // Review step has no additional required fields
    };

    // Get the required fields for the current step
    const fieldsToValidate =
      requiredFieldsByStep[currentStep as keyof typeof requiredFieldsByStep] ||
      [];

    // Validate only the fields for the current step
    const isValid = await trigger(fieldsToValidate as (keyof SetupFormData)[]);

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(finishSetup)();
      }
    } else {
      // Set focus to the first invalid field (optional enhancement)
      const firstErrorField = fieldsToValidate.find(
        (field) => errors[field as keyof typeof errors]
      );

      // Show a temporary message to alert the user about required fields
      setError("Please fill in all required fields to continue");
      setTimeout(() => setError(""), 3000);
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
                isDisabled={currentStep === 1 || formSubmitting}
              >
                Back
              </Button>
              <Button
                color="primary"
                onClick={handleNextStep}
                isLoading={formSubmitting}
              >
                {currentStep === totalSteps ? "Complete Setup" : "Next"}
              </Button>
            </div>
            {/* {error && (
              <div className="mt-4 p-3 text-sm bg-red-100 border border-red-200 rounded-lg text-red-800 animate-pulse">
                {error}
              </div>
            )} */}
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-sm text-[var(--text-light)]">
        <p>© 2025 ContentCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
