"use client";

import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./components/DashboardMockup";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-color)] to-[var(--accent-light)] font-sans overflow-hidden">
      {/* Header with glassmorphism effect */}
      <header className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-4 glass sticky top-0 z-10 border-b border-[var(--border-color)] shadow-sm gap-4 md:gap-0">
        <div className="flex items-center gap-2 font-medium text-lg w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm">
            <Image
              src="/contentcraft-logo.svg"
              alt="ContentCraft Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-semibold">ContentCraft</span>
          {/* Hamburger menu button for mobile */}
          <button
            className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[var(--text-color)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a
            href="#features"
            className="hover:text-[var(--text-light)] transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-[var(--text-light)] transition-colors duration-300"
          >
            Pricing
          </a>
          <a
            href="#help"
            className="hover:text-[var(--text-light)] transition-colors duration-300"
          >
            Help
          </a>
        </nav>
        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 w-full md:w-auto">
          <Link href="/signup" className="w-full md:w-auto">
            <button className="w-full md:w-auto ripple-container px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105">
              Get Started
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
          <Link href="/login" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-5 py-2.5 border border-[var(--border-color)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105">
              Sign In{" "}
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
        </div>
        {/* ...existing code... */}
      </header>

      {/* Hero Section with PlantImage */}
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-16 md:py-24 px-2 md:px-4 relative overflow-hidden">
          {/* Enhanced gradient background effect */}
          <div className="absolute inset-0  bg-gradient-to-br from-[var(--accent-light)]/40 via-[var(--accent-color)]/30 to-[var(--accent-light)]/40"></div>

          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 left-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[var(--accent-light)]/40 rounded-full filter blur-[80px] md:blur-[120px] -z-10 animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-[var(--accent-color)]/40 rounded-full filter blur-[60px] md:blur-[100px] -z-10 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[120px] md:w-[300px] h-[120px] md:h-[300px] bg-[var(--primary-color)]/30 rounded-full filter blur-[40px] md:blur-[80px] -z-10 animate-float-delay"></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] -z-10"></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              {/* Hero text content */}
              <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <div className="glass hero-glass-container backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-lg border border-[var(--border-color)] p-6 md:p-10 lg:p-12 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--primary-color)]/30 to-transparent"></div>
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary-color)]/10 rounded-full filter blur-[80px] -z-10"></div>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 leading-tight text-[var(--text-color)] relative">
                    Create. Post. Go Viral.
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-[var(--text-light)] mb-8 md:mb-12 max-w-xl mx-auto md:mx-0">
                    Instantly generate scroll-stopping posts for Instagram, X
                    (Twitter), LinkedIn, and more. ContentCraft’s advanced AI
                    helps you grow your audience, boost engagement, and save
                    hours every week—no creative block, no hassle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center md:justify-start">
                    <Link href="/signup" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto ripple-container px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                        Try ContentCraft Free
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                      </button>
                    </Link>
                    <a
                      href="#demo"
                      className="text-[var(--text-light)] hover:text-[var(--text-color)] transition-colors flex items-center gap-2"
                    >
                      See AI in Action
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
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Dashboard UI mockup */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-xs sm:max-w-md">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section with enhanced UI */}
        <section
          id="features"
          className="w-full py-14 bg-gradient-to-b from-[var(--background)] to-[var(--background)]/95 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary-color)]/20 to-transparent"></div>
          <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-[var(--primary-color)]/5 filter blur-[80px] animate-float-delay"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[var(--accent-color)]/5 filter blur-[100px] animate-pulse-slow"></div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-3">
                <span className="bg-[var(--primary-color)]/10 p-5 border border-[var(--primary-color)]/20 text-[var(--text-color)] text-sm font-medium py-1 px-3 rounded-full">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-color)] mb-6 relative">
                <span className="relative inline-block">
                  Why ContentCraft?
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-[var(--primary-color)]/20"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,0 C75,12 125,12 200,6 C250,0 275,6 300,12 L300,12 L0,12 Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </h2>
              <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
                Everything you need to grow your brand and save time
              </p>
            </div>

            {/* Feature cards with improved design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Feature 1 - Lightning Fast */}
              <div className="group relative">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-zinc-400 transition duration-300">
                    Instant Results
                  </h3>
                  <p className="text-[var(--text-light)] group-hover:text-[var(--text-color)] transition-colors duration-300">
                    Generate ready-to-post content in seconds. No more
                    waiting—just click, copy, and share. ContentCraft delivers
                    high-quality results instantly, so you never miss a trend.
                  </p>
                </div>
              </div>

              {/* Feature 2 - Smart & Intuitive */}
              <div className="group relative mt-6 md:mt-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-zinc-400 transition duration-300">
                    AI That Understands You
                  </h3>
                  <p className="text-[var(--text-light)] group-hover:text-[var(--text-color)] transition-colors duration-300">
                    ContentCraft learns your brand voice and adapts to your
                    style. Get tailored suggestions and platform-optimised posts
                    that resonate with your audience—every single time.
                  </p>
                </div>
              </div>

              {/* Feature 3 - Beautifully Designed */}
              <div className="group relative mt-6 md:mt-12 lg:mt-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-zinc-400 transition duration-300">
                    Effortless & Beautiful
                  </h3>
                  <p className="text-[var(--text-light)] transition-colors duration-300">
                    Enjoy a seamless, distraction-free experience. Our intuitive
                    interface lets you focus on what matters—creating and
                    sharing amazing content, anywhere, on any device.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional showcase section */}
            <div className="mt-24 glass backdrop-blur-sm bg-[var(--card-bg)]/30 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-[var(--primary-color)]/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[var(--accent-color)]/10 rounded-full blur-2xl"></div>

              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text-color)]">
                    Tailored for every platform
                  </h3>
                  <p className="text-[var(--text-light)] mb-6">
                    Our intelligent content creator understands the unique
                    characteristics of each social media platform, ensuring your
                    message resonates perfectly wherever it&apos;s shared.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[var(--primary-color)]/10 text-[var(--text-light)] text-sm py-1 px-3 rounded-full">
                      Instagram
                    </span>
                    <span className="bg-[var(--primary-color)]/10 text-[var(--text-light)] text-sm py-1 px-3 rounded-full">
                      Twitter
                    </span>
                    <span className="bg-[var(--primary-color)]/10 text-[var(--text-light)] text-sm py-1 px-3 rounded-full">
                      LinkedIn
                    </span>
                    <span className="bg-[var(--primary-color)]/10 text-[var(--text-light)] text-sm py-1 px-3 rounded-full">
                      Facebook
                    </span>
                    <span className="bg-[var(--primary-color)]/10 text-[var(--text-light)] text-sm py-1 px-3 rounded-full">
                      TikTok
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-[var(--primary-color)]/5 to-[var(--accent-color)]/5 rounded-xl p-6 border border-[var(--border-color)]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="h-5 w-40 bg-[var(--border-color)] rounded-md ml-auto"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-[var(--border-color)] rounded-md w-full"></div>
                    <div className="h-4 bg-[var(--border-color)] rounded-md w-3/4"></div>
                    <div className="h-4 bg-[var(--border-color)] rounded-md w-5/6"></div>
                    <div className="h-4 bg-[var(--border-color)] rounded-md w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section
          id="pricing"
          className="w-full py-5 bg-[var(--background)] relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-color)]/30 to-transparent"></div>
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-[var(--accent-color)]/5 filter blur-[80px] animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-[var(--primary-color)]/5 filter blur-[100px] animate-float-delay"></div>

          {/* Added decorative elements for enhanced visual appeal */}
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-[var(--primary-color)]/8 filter blur-[50px] animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-30 h-30 rounded-full bg-[var(--accent-color)]/8 filter blur-[40px] animate-float-delay"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-3 animate-bounce-subtle">
                <span className="bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 text-[var(--text-color)] text-sm font-bold py-1.5 px-4 rounded-full border border-[var(--primary-color)]/20 shadow-sm">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-color)] mb-6 relative">
                <span className="relative inline-block">
                  Simple, Transparent Pricing
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-[var(--primary-color)]/30"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,0 C75,12 125,12 200,6 C250,0 275,6 300,12 L300,12 L0,12 Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </h2>
              <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto mb-2">
                No complicated tiers. Start creating amazing content today.
              </p>
              <div className="flex justify-center mt-10 mb-14">
                <div className="inline-flex p-1 bg-[var(--card-bg)]/80 rounded-full border border-[var(--border-color)] shadow-lg">
                  <button className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover)] text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary-color)]/20">
                    Free
                  </button>
                  <button className="px-8 py-2.5 rounded-full text-[var(--text-light)] font-medium transition-all duration-300 hover:bg-[var(--card-bg)]/50">
                    Pro (Coming Soon)
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing cards - Enhanced UI */}
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Free tier card */}
              <div className="group relative transform transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--accent-color)]/30 to-[var(--primary-color)]/30 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-3xl p-8 border border-[var(--border-color)] shadow-xl relative h-full flex flex-col">
                  {/* Popular badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] px-6 py-1.5 rounded-full shadow-lg"></div>

                  <div className="flex justify-between items-start mb-6 mt-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--text-color)]">
                        Free Access
                      </h3>
                      <p className="text-[var(--text-light)]">
                        For everyone, no card needed
                      </p>
                    </div>
                    <div className="bg-[var(--primary-color)]/10 rounded-full p-3 group-hover:bg-[var(--primary-color)]/20 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--primary-color)]"
                      >
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="mb-6 flex items-baseline">
                    <div className="flex items-start">
                      <span className="text-lg font-medium mr-1 text-[var(--text-light)] mt-1">
                        ₦
                      </span>
                      <span className="text-5xl font-bold bg-clip-text text-[var(--text-light)]">
                        0
                      </span>
                    </div>
                    <span className="text-[var(--text-light)] ml-1">
                      /forever
                    </span>
                    <div className="ml-3 bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-0.5 flex items-center animate-bounce-subtle">
                      <span className="text-xs font-medium text-green-700 dark:text-green-400">
                        Free Forever!
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--accent-color)]/10 p-6 rounded-2xl mb-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--primary-color)]/10 rounded-full blur-xl opacity-70"></div>
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[var(--accent-color)]/10 rounded-full blur-xl opacity-70"></div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-3xl font-extrabold bg-clip-text  text-[var(--text-light)]">
                        Free! Free! Free!
                      </span>
                    </div>
                    <p className="text-center text-[var(--text-light)]">
                      For a limited time, we&apos;re offering our full platform
                      completely free.
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600 dark:text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Create content for all popular platforms
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600 dark:text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        AI-powered content optimization
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600 dark:text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Up to 100 posts per month
                      </span>
                    </li>
                  </ul>

                  <Link href="/signup" className="w-full">
                    <button className="w-full py-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover)] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--primary-color)]/20 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02] relative overflow-hidden">
                      <span className="relative z-10">Get Started Now</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                  </Link>
                </div>
              </div>

              {/* Pro tier card (coming soon) */}
              <div className="group relative transform transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--primary-color)]/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/40 rounded-3xl p-8 border border-[var(--border-color)] shadow-lg relative h-full flex flex-col">
                  {/* Coming soon ribbon */}
                  <div className="absolute -top-1 -right-1 w-28 h-28 overflow-hidden">
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 rotate-45 bg-[var(--accent-color)]/80 text-white text-xs font-bold py-1 px-12 shadow-md">
                      SOON
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--text-color)]">
                        Pro Access
                      </h3>
                      <p className="text-[var(--text-light)]">
                        For power users
                      </p>
                    </div>
                    <div className="bg-[var(--accent-color)]/10 rounded-full p-3 group-hover:bg-[var(--accent-color)]/20 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--accent-color)]"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                  </div>

                  <div className="mb-6 flex items-baseline opacity-70">
                    <div className="flex items-start">
                      <span className="text-lg font-medium mr-1 text-[var(--text-light)] mt-1">
                        ₦
                      </span>
                      <span className="text-5xl font-bold text-[var(--text-color)]">
                        15,000
                      </span>
                    </div>
                    <span className="text-[var(--text-light)] ml-1">
                      /month
                    </span>
                    <div className="ml-3 bg-[var(--accent-color)]/10 rounded-full px-3 py-0.5 flex items-center">
                      <span className="text-xs font-medium text-[var(--accent-color)]">
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  <div className="bg-[var(--card-bg)]/50 p-6 rounded-2xl mb-8 border border-dashed border-[var(--border-color)] relative overflow-hidden shadow-inner">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--accent-color)] opacity-70 animate-pulse-slow"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                      <span className="text-2xl font-bold text-[var(--text-color)] opacity-70">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-center text-[var(--text-light)]">
                      Advanced features and unlimited access.
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow opacity-70">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--accent-color)]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Everything in Free plan
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--accent-color)]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Unlimited posts per month
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--accent-color)]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Advanced analytics & insights
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--accent-color)]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[var(--text-color)]">
                        Priority support
                      </span>
                    </li>
                  </ul>

                  <button
                    disabled
                    className="w-full py-4 bg-[var(--accent-color)]/50 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 opacity-70 cursor-not-allowed group-hover:bg-[var(--accent-color)]/60"
                  >
                    Join Waitlist
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* FAQ section - Enhanced */}
              <div className="col-span-1 md:col-span-2 mt-12 glass backdrop-blur-sm bg-[var(--card-bg)]/30 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg transform transition-transform hover:scale-[1.02] duration-500">
                <h4 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center gap-3 pb-4 border-b border-[var(--border-color)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--primary-color)]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Frequently Asked Questions
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[var(--background)]/50 p-5 rounded-xl border border-[var(--border-color)] hover:border-[var(--primary-color)]/30 transition-colors duration-300 hover:shadow-md">
                    <p className="font-medium text-[var(--text-color)] mb-2">
                      Is it really free?
                    </p>
                    <p className="text-[var(--text-light)]">
                      Yes! We&apos;re currently offering our platform completely
                      free of charge for early adopters. No credit card
                      required.
                    </p>
                  </div>
                  <div className="bg-[var(--background)]/50 p-5 rounded-xl border border-[var(--border-color)] hover:border-[var(--primary-color)]/30 transition-colors duration-300 hover:shadow-md">
                    <p className="font-medium text-[var(--text-color)] mb-2">
                      When will Pro be available?
                    </p>
                    <p className="text-[var(--text-light)]">
                      Pro features are currently in development and will be
                      available soon. Join our waitlist to be notified when it
                      launches.
                    </p>
                  </div>
                  <div className="bg-[var(--background)]/50 p-5 rounded-xl border border-[var(--border-color)] hover:border-[var(--primary-color)]/30 transition-colors duration-300 hover:shadow-md">
                    <p className="font-medium text-[var(--text-color)] mb-2">
                      What&apos;s included in the free plan?
                    </p>
                    <p className="text-[var(--text-light)]">
                      Our free plan includes access to all core features
                      including AI content generation, basic analytics, and up
                      to 100 posts per month.
                    </p>
                  </div>
                  <div className="bg-[var(--background)]/50 p-5 rounded-xl border border-[var(--border-color)] hover:border-[var(--primary-color)]/30 transition-colors duration-300 hover:shadow-md">
                    <p className="font-medium text-[var(--text-color)] mb-2">
                      How much will Pro cost?
                    </p>
                    <p className="text-[var(--text-light)]">
                      Pro will be priced at ₦15,000 per month when launched.
                      Early waitlist members may receive special pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced dark section with glassmorphism effect */}
        <section className="w-full py-24 bg-[var(--accent-color)] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[var(--primary-color)]/20 filter blur-[100px] animate-float"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full bg-[var(--foreground)]/20 filter blur-[100px] animate-float-delay"></div>

          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="glass-dark hero-glass-container backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-[var(--border-color)] relative overflow-hidden">
              {/* Decorative elements inside the container */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[var(--foreground)]/40 to-transparent"></div>
              <div className="absolute -right-10 top-10 w-40 h-40 rounded-full bg-[var(--foreground)]/10 filter blur-[60px]"></div>
              <div className="absolute -left-10 bottom-10 w-40 h-40 rounded-full bg-[var(--primary-color)]/10 filter blur-[60px]"></div>

              {/* Content */}
              <div className="inline-block mb-3">
                <span className="bg-[var(--foreground)]/20 text-[var(--foreground)] text-sm font-medium py-1 px-3 rounded-full">
                  Premium Experience
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--foreground)] leading-tight">
                One idea, endless possibilities.
                <span className="block w-24 h-1.5 bg-gradient-to-r from-[var(--foreground)] to-transparent rounded-full mx-auto mt-6"></span>
              </h2>

              <p className="text-xl text-[var(--foreground)]/80 mb-10 max-w-2xl mx-auto">
                Transform a single concept into tailored content for every
                platform. From Twitter threads to Instagram stories, let AI
                craft the perfect post format.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="ripple-container px-7 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button className="px-7 py-4 bg-transparent border border-[var(--foreground)]/30 text-[var(--foreground)] font-medium rounded-full hover:bg-[var(--foreground)]/10 transition-all duration-300 flex items-center justify-center gap-2">
                  View Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-[var(--foreground)]/10 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--foreground)]"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm text-[var(--foreground)]/90">
                    Secure & Private
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--foreground)]"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-sm text-[var(--foreground)]/90">
                    End-to-end Encrypted
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--foreground)]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  <span className="text-sm text-[var(--foreground)]/90">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[var(--background)] border-t border-[var(--border-color)] py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col items-center gap-3">
          <div className="flex items-center mb-2">
            <img
              src="/contentcraft-logo.svg"
              alt="ContentCraft Logo"
              className="w-7 h-7"
            />
            <span className="font-semibold text-base text-[var(--text-color)]">
              ContentCraft
            </span>
          </div>
          <p className="text-[var(--text-light)] text-sm mb-2 text-center">
            AI-powered content creation for every platform.
          </p>
          <div className="flex gap-6 mb-2">
            <a
              href="#features"
              className="hover:text-[var(--primary-color)] transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-[var(--primary-color)] transition-colors text-sm"
            >
              Pricing
            </a>
            <a
              href="#help"
              className="hover:text-[var(--primary-color)] transition-colors text-sm"
            >
              Help
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary-color)] transition-colors text-sm"
            >
              Privacy
            </a>
          </div>
          <span className="text-xs text-[var(--text-light)]">
            © 2025 ContentCraft. All rights reserved.
          </span>
        </div>
      </footer>
      {/* Mobile menu overlay moved to end of component for proper stacking */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute z-[9999] inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          <nav
            className="relative shadow-xl z-[9999] rounded-b-2xl mx-2 mt-2 p-6 flex flex-col gap-4 animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <a
              href="#features"
              className="py-3 px-4 text-white rounded hover:bg-blue-50 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="py-3 px-4 rounded hover:bg-blue-50 text-white text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#help"
              className="py-3 px-4 rounded hover:bg-blue-50 text-white text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help
            </a>
            <Link href="/signup" className="w-full">
              <button className="w-full mt-2  px-5 py-2.5  flex items-center gap-1 shadow-md hover:shadow-lg">
                Get Started
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
            <Link href="/login" className="w-full">
              <button className="w-full px-5 py-2.5 border border-[var(--border-color)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg mt-2">
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
          </nav>
        </div>
      )}
    </div>
  );
}
