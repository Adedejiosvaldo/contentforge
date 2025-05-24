"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

// Define validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate email
      forgotPasswordSchema.parse({ email });

      // If successful, show success state
      setSubmitted(true);
      setError("");
      // Here you would typically call your API to send a reset link
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
          <div className="glass backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-xl border border-[var(--border-color)] p-8 md:p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--primary-color)]/30 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary-color)]/10 rounded-full filter blur-[80px] -z-10"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--accent-color)]/10 rounded-full filter blur-[80px] -z-10"></div>

            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--text-color)]">
                Reset your password
              </h1>
              <p className="text-[var(--text-light)]">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                        error
                          ? "border-red-500/50 input-error"
                          : "border-[var(--border-color)]"
                      } rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-colors placeholder-[var(--text-light)]/50`}
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
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
                  {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover)] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--primary-color)]/20 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Reset Link</span>
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </form>
            ) : (
              <div className="bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-xl p-5 text-center animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-color)]/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--primary-color)]"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">
                  Check your inbox
                </h3>
                <p className="text-[var(--text-light)] mb-4">
                  We&apos;ve sent a password reset link to{" "}
                  <strong>{email}</strong>
                </p>
                <p className="text-sm text-[var(--text-light)]">
                  Didn&apos;t receive the email?{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                  >
                    Try again
                  </button>
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-light)]">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                >
                  Back to Sign in
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
