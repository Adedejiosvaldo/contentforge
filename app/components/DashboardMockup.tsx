"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardMockup() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Add a slight delay before animation starts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] md:min-h-[460px]">
      {/* Main dashboard container */}
      <div
        className={`absolute inset-0 glass hero-glass-container backdrop-blur-md bg-[var(--background)]/10
        rounded-2xl border border-[var(--border-color)] shadow-xl overflow-hidden transition-all duration-700
        ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {/* Dashboard header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--primary-color)]"></div>
            <div className="text-xs font-medium text-[var(--text-color)]">
              ContentCraft Analytics
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4">
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div
              className={`bg-[var(--card-bg)]/40 p-3 rounded-xl border border-[var(--border-color)] transition-all duration-1000 delay-100
              ${
                animate
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-xs text-[var(--text-light)] mb-1">
                Content Performance
              </div>
              <div className="text-lg font-bold text-[var(--text-color)]">
                +27.4%
              </div>
              <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <span>12.3% from last week</span>
              </div>
            </div>

            <div
              className={`bg-[var(--card-bg)]/40 p-3 rounded-xl border border-[var(--border-color)] transition-all duration-1000 delay-200
              ${
                animate
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-xs text-[var(--text-light)] mb-1">
                Engagement Rate
              </div>
              <div className="text-lg font-bold text-[var(--text-color)]">
                19.8%
              </div>
              <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <span>5.7% from last month</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            className={`bg-[var(--card-bg)]/40 p-4 rounded-xl border border-[var(--border-color)] mb-4 transition-all duration-1000 delay-300
            ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-[var(--text-color)]">
                Weekly Content Performance
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary-color)]"></div>
                <span className="text-xs text-[var(--text-light)]">Reach</span>
                <div className="h-2 w-2 rounded-full bg-[var(--accent-color)]"></div>
                <span className="text-xs text-[var(--text-light)]">
                  Engagement
                </span>
              </div>
            </div>

            {/* Chart mockup */}
            <div className="relative h-24">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--border-color)]"></div>

              {/* Chart bars - stylized representation */}
              <div className="absolute bottom-0 left-0 h-16 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[12%] h-12 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[24%] h-14 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[36%] h-20 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[48%] h-18 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[60%] h-22 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>
              <div className="absolute bottom-0 left-[72%] h-16 w-[10%] bg-[var(--primary-color)]/20 rounded-t"></div>

              {/* Line chart overlay */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 60"
              >
                <path
                  d="M0,50 C10,40 20,45 30,35 C40,25 50,30 60,20 C70,10 80,15 90,5 L90,60 L0,60 Z"
                  fill="url(#gradientPrimary)"
                  fillOpacity="0.2"
                />
                <path
                  d="M0,50 C10,40 20,45 30,35 C40,25 50,30 60,20 C70,10 80,15 90,5"
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="1"
                  strokeDasharray={animate ? "0" : "200"}
                  strokeDashoffset={animate ? "0" : "200"}
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />

                <path
                  d="M0,55 C15,45 25,50 40,40 C55,30 65,35 80,25"
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="1"
                  strokeDasharray={animate ? "0" : "200"}
                  strokeDashoffset={animate ? "0" : "200"}
                  style={{ transition: "stroke-dashoffset 1.8s ease-in-out" }}
                />

                <defs>
                  <linearGradient
                    id="gradientPrimary"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary-color)"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary-color)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Platform breakdown */}
          <div
            className={`bg-[var(--card-bg)]/40 p-3 rounded-xl border border-[var(--border-color)] transition-all duration-1000 delay-400
            ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="text-sm font-medium text-[var(--text-color)] mb-3">
              Platform Reach
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-light)]">
                  Instagram
                </span>
                <div className="w-2/3 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary-color)] rounded-full"
                    style={{
                      width: "85%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: animate ? "0.6s" : "0s",
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-[var(--text-color)]">
                  85%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-light)]">
                  Twitter
                </span>
                <div className="w-2/3 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-color)] rounded-full"
                    style={{
                      width: "64%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: animate ? "0.8s" : "0s",
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-[var(--text-color)]">
                  64%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-light)]">
                  LinkedIn
                </span>
                <div className="w-2/3 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary-color)]"
                    style={{
                      width: "76%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: animate ? "1s" : "0s",
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-[var(--text-color)]">
                  76%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className={`absolute -top-6 right-10 bg-[var(--background)] rounded-xl p-3 shadow-lg border border-[var(--border-color)]
          transition-all duration-700 delay-500 w-44 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <div className="flex items-start gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center shrink-0">
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <div>
            <div className="text-xs font-medium text-[var(--text-color)]">
              New Post Created
            </div>
            <div className="text-xs text-[var(--text-light)] mt-1">
              Your Instagram post is ready for review
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <div
        className={`absolute -bottom-6 right-6 bg-[var(--primary-color)] rounded-full h-12 w-12 flex items-center justify-center shadow-lg
          transition-all duration-700 delay-600 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
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
          className="text-white"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </div>
  );
}
