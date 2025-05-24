"use client";

import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
  showPassword?: boolean;
  togglePassword?: () => void;
  isPassword?: boolean;
}

export default function TextInput({
  error,
  label,
  icon,
  showPassword,
  togglePassword,
  isPassword,
  ...props
}: TextInputProps) {
  // Generate a random id if not provided
  const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--text-color)] mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          id={id}
          style={{
            color: "var(--text-color)",
            WebkitTextFillColor: "var(--text-color)",
          }}
          className={`w-full px-4 py-3.5 bg-[var(--background)]/30 border ${
            error
              ? "border-red-500/50 input-error"
              : "border-[var(--border-color)]"
          } rounded-xl focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-colors placeholder-[var(--text-light)]/50 text-[var(--text-color)]`}
          type={isPassword && !showPassword ? "password" : props.type || "text"}
        />
        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {/* Add padding for icon if present */}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="opacity-0">{label || "Text"}</span>
          </div>
        )}

        {/* Password toggle button */}
        {isPassword && togglePassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-light)]/70 hover:text-[var(--text-light)] transition-colors"
            onClick={togglePassword}
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
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
