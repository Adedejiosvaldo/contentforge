"use client";

import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./components/DashboardMockup";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-color)] to-[var(--accent-light)] font-sans overflow-hidden">
      {/* Header with glassmorphism effect */}
      <header className="w-full flex items-center justify-between px-6 md:px-20 py-4 glass sticky top-0 z-10 border-b border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-2 font-medium text-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm">
            <Image
              src="/contentcraft-logo.svg"
              alt="ContentCraft Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-semibold">ContentCraft</span>
        </div>
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
        <div className="flex items-center gap-3">
          <button className="ripple-container px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105">
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
          <Link href={"/login"} className="hidden md:inline-block">
            <button className=" px-5 py-2.5 border border-[var(--border-color)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105">
              Login{" "}
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
      </header>

      {/* Hero Section with PlantImage */}
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-24 md:py-32 px-4 relative overflow-hidden">
          {/* Enhanced gradient background effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent-light)]/40 via-[var(--accent-color)]/30 to-[var(--accent-light)]/40"></div>

          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[var(--accent-light)]/40 rounded-full filter blur-[120px] -z-10 animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[var(--accent-color)]/40 rounded-full filter blur-[100px] -z-10 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-[var(--primary-color)]/30 rounded-full filter blur-[80px] -z-10 animate-float-delay"></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] -z-10"></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Hero text content */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="glass hero-glass-container backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-lg border border-[var(--border-color)] p-10 md:p-12 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--primary-color)]/30 to-transparent"></div>
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary-color)]/10 rounded-full filter blur-[80px] -z-10"></div>

                  <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-[var(--text-color)] relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-color)] via-[var(--primary-color)] to-[var(--text-color)]">
                      Create Engaging Content
                    </span>
                    <br />
                    <span className="relative z-10">
                      Across All Platforms
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-2 text-[var(--primary-color)]/20"
                        viewBox="0 0 300 12"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,0 C50,12 100,12 150,6 C200,0 250,0 300,12 L300,12 L0,12 Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-[var(--text-light)] mb-12 max-w-xl">
                    Effortlessly craft compelling posts for Instagram, Twitter,
                    LinkedIn, and more. Let AI enhance your social media
                    presence with engaging, platform-optimized content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                    <button className="ripple-container px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                      Start Creating
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
                    <a
                      href="#demo"
                      className="text-[var(--text-light)] hover:text-[var(--text-color)] transition-colors flex items-center gap-2"
                    >
                      See Examples
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
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-md">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section with enhanced UI */}
        <section
          id="features"
          className="w-full py-24 bg-gradient-to-b from-[var(--background)] to-[var(--background)]/95 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary-color)]/20 to-transparent"></div>
          <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-[var(--primary-color)]/5 filter blur-[80px] animate-float-delay"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[var(--accent-color)]/5 filter blur-[100px] animate-pulse-slow"></div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-3">
                <span className="bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-sm font-medium py-1 px-3 rounded-full">
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
                Powerful features to enhance your productivity and creativity
              </p>
            </div>

            {/* Feature cards with improved design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Feature 1 - Lightning Fast */}
              <div className="group relative">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] p-0.5 mb-8">
                    <div className="w-full h-full rounded-2xl bg-[var(--background)]/90 flex items-center justify-center">
                      <Image
                        src="/zap.svg"
                        alt="Fast"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition duration-300">
                    Lightning Fast
                  </h3>
                  <p className="text-[var(--text-light)] group-hover:text-[var(--text-color)] transition-colors duration-300">
                    Get instant responses without any perceptible delay or lag.
                    Our cutting-edge optimization ensures your content is ready
                    when you are.
                  </p>

                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      className="text-[var(--primary-color)]"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Smart & Intuitive */}
              <div className="group relative mt-6 md:mt-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] p-0.5 mb-8">
                    <div className="w-full h-full rounded-2xl bg-[var(--background)]/90 flex items-center justify-center">
                      <Image
                        src="/heart.svg"
                        alt="Reliable"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition duration-300">
                    Smart & Intuitive
                  </h3>
                  <p className="text-[var(--text-light)] group-hover:text-[var(--text-color)] transition-colors duration-300">
                    Understands context and delivers relevant information when
                    you need it. Our AI adapts to your unique style and
                    preferences over time.
                  </p>

                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      className="text-[var(--primary-color)]"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 3 - Beautifully Designed */}
              <div className="group relative mt-6 md:mt-12 lg:mt-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/60 rounded-2xl p-8 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] p-0.5 mb-8">
                    <div className="w-full h-full rounded-2xl bg-[var(--background)]/90 flex items-center justify-center">
                      <Image
                        src="/design.svg"
                        alt="Design"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition duration-300">
                    Beautifully Designed
                  </h3>
                  <p className="text-[var(--text-light)] group-hover:text-[var(--text-color)] transition-colors duration-300">
                    Clean, modern interface that adapts to your preferences.
                    Enjoy a seamless experience with our thoughtfully crafted UI
                    across all devices.
                  </p>

                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      className="text-[var(--primary-color)]"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
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
                    message resonates perfectly wherever it's shared.
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
                Transform a single concept into tailored content for every platform. From Twitter threads to Instagram stories, let AI craft the perfect post format.
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
      <footer className="w-full py-8 bg-[var(--background)]">
        <div className="container mx-auto px-6 text-center text-sm text-[var(--text-light)]">
          <div className="flex justify-center items-center gap-6 mb-4">
            <a
              href="#"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Contact
            </a>
          </div>
          <p>© 2024 ContentCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
