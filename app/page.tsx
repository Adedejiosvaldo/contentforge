"use client";

import Image from "next/image";
import Link from "next/link";

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
          {/* Subtle circular gradients for background effect */}
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[var(--accent-light)]/30 rounded-full filter blur-[120px] -z-10"></div>
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[var(--accent-color)]/30 rounded-full filter blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-[var(--accent-color)]/20 rounded-full filter blur-[80px] -z-10 animate-float"></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Hero text content */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="glass hero-glass-container backdrop-blur-md bg-[var(--background)]/10 rounded-3xl shadow-lg border border-[var(--border-color)] p-10 md:p-12">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-[var(--text-color)]">
                    Create Engaging Content
                    <br />
                    Across All Platforms
                  </h1>
                  <p className="text-lg md:text-xl text-[var(--text-light)] mb-12 max-w-xl">
                    Effortlessly craft compelling posts for Instagram, Twitter, LinkedIn,
                    and more. Let AI enhance your social media presence with engaging,
                    platform-optimized content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                    <button className="ripple-container px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                      Start Creating
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </button>
                    <a
                      href="#demo"
                      className="text-[var(--text-light)] hover:text-[var(--text-color)] transition-colors flex items-center gap-2"
                    >
                      See Examples
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Plant illustration */}
              <div className="md:w-1/2 flex justify-center">
                <div className="glass hero-glass-container backdrop-blur-md bg-[var(--background)]/5 rounded-full p-6 border border-[var(--border-color)]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="w-full py-20 bg-[var(--background)]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-color)] mb-6">
                Why ContentCraft?
              </h2>
              <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
                Powerful features to enhance your productivity and creativity
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/50 rounded-2xl p-6 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center mb-6">
                  <Image src="/zap.svg" alt="Fast" width={20} height={20} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">
                  Lightning Fast
                </h3>
                <p className="text-[var(--text-light)]">
                  Get instant responses without any perceptible delay or lag.
                </p>
              </div>

              <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/50 rounded-2xl p-6 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center mb-6">
                  <Image
                    src="/heart.svg"
                    alt="Reliable"
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">
                  Smart & Intuitive
                </h3>
                <p className="text-[var(--text-light)]">
                  Understands context and delivers relevant information when you
                  need it.
                </p>
              </div>

              <div className="glass backdrop-blur-sm bg-[var(--card-bg)]/50 rounded-2xl p-6 border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center mb-6">
                  <Image
                    src="/design.svg"
                    alt="Design"
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">
                  Beautifully Designed
                </h3>
                <p className="text-[var(--text-light)]">
                  Clean, modern interface that adapts to your preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dark section with glassmorphism effect */}
        <section className="w-full py-20 bg-[var(--accent-color)]">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="glass-dark hero-glass-container backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-[var(--border-color)]">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
                Undetectable by design.
              </h2>
              <p className="text-xl text-[var(--text-light)] mb-8">
                No bots in the room. No Zoom guests. No screen-share trails.
                Works on everything.
              </p>
              <button className="ripple-container px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
                Learn More
              </button>
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
