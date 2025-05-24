"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

// Define validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    try {
      // Validate form data
      signupSchema.parse(formData);

      // If successful, proceed with form submission
      console.log("Form submitted:", formData);
      // Here you would typically call your registration API
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more friendly format
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-color)] to-[var(--accent-light)] font-sans overflow-hidden">
      {/* Header */}
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

        <Link href="/login">
          <button className="px-5 py-2.5 border border-[var(--border-color)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105">
            Sign In
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          {" "}
          {/* Changed from max-w-md to max-w-lg for wider form */}
          <div className="glass backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-xl border border-[var(--border-color)] p-8 md:p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--primary-color)]/30 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary-color)]/10 rounded-full filter blur-[80px] -z-10"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--accent-color)]/10 rounded-full filter blur-[80px] -z-10"></div>

            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--text-color)]">
                Create an account
              </h1>
              <p className="text-[var(--text-light)]">
                Start creating content in minutes
              </p>
            </div>

            {generalError && (
              <div className="mb-6 p-4 bg-red-100/20 border border-red-300/30 text-red-500 rounded-xl text-center">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text-color)] mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={`w-full px-4 py-3.5 bg-[var(--background)]/30 border ${
                      errors.name
                        ? "border-red-500/50 input-error"
                        : "border-[var(--border-color)]"
                    } rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-colors placeholder-[var(--text-light)]/50`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--text-light)]/70 absolute left-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    {/* Visual spacer for text alignment */}
                    <span className="opacity-0">Name</span>
                  </div>
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text-color)] mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`w-full px-4 py-3.5 bg-[var(--background)]/30 border ${
                      errors.email
                        ? "border-red-500/50 input-error"
                        : "border-[var(--border-color)]"
                    } rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-colors placeholder-[var(--text-light)]/50`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--text-light)]/70 absolute left-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    {/* Visual spacer for text alignment */}
                    <span className="opacity-0">Email</span>
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--text-color)] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-3.5 bg-[var(--background)]/30 border ${
                      errors.password
                        ? "border-red-500/50 input-error"
                        : "border-[var(--border-color)]"
                    } rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-colors placeholder-[var(--text-light)]/50`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--text-light)]/70 absolute left-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    {/* Visual spacer for text alignment */}
                    <span className="opacity-0">Password</span>
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-light)]/70 hover:text-[var(--text-light)] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                ) : (
                  <p className="text-xs text-[var(--text-light)] mt-1.5">
                    Must be at least 8 characters with 1 special character
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className={`w-4 h-4 text-[var(--primary-color)] bg-[var(--background)]/20 border-[var(--border-color)] rounded focus:ring-[var(--primary-color)] ${
                    errors.agreeTerms ? "border-red-500" : ""
                  }`}
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label
                  htmlFor="agreeTerms"
                  className={`ml-2 block text-sm ${
                    errors.agreeTerms
                      ? "text-red-500"
                      : "text-[var(--text-light)]"
                  }`}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover)] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--primary-color)]/20 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group mt-4"
              >
                <span className="relative z-10">Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform relative z-10"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </form>

            <div className="relative flex items-center my-8">
              <div className="flex-grow border-t border-[var(--border-color)]"></div>
              <span className="flex-shrink mx-4 text-sm text-[var(--text-light)]">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[var(--border-color)]"></div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--background)]/40 hover:bg-[var(--background)]/60 border border-[var(--border-color)] rounded-xl transition-colors">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm text-[var(--text-color)]">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--background)]/40 hover:bg-[var(--background)]/60 border border-[var(--border-color)] rounded-xl transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-sm text-[var(--text-color)]">GitHub</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-light)]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-sm text-[var(--text-light)]">
        <p>© 2024 ContentCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
