"use client";

import { useEffect } from "react";

// This component adds a script to the head to prevent theme flickering on load
export default function ThemeScript() {
  useEffect(() => {
    // This effect will only run on the client side
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return null; // This component doesn't render anything
}
