"use client";

import { useEffect } from 'react';

export default function InputStyleFix() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');

    // Set its content to our CSS fixes
    style.textContent = `
      input, textarea, select {
        color: black !important;
        -webkit-text-fill-color: black !important;
      }

      html[data-theme="dark"] input,
      html[data-theme="dark"] textarea,
      html[data-theme="dark"] select {
        color: white !important;
        -webkit-text-fill-color: white !important;
      }

      input::placeholder, textarea::placeholder {
        color: #6c757d !important;
        opacity: 0.7 !important;
      }
    `;

    // Append it to the head
    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;  // This component doesn't render anything
}
