/**
 * Utility function to detect system color scheme preference
 * Can be used to set the initial theme based on user's device preference
 */
export const getSystemThemePreference = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  // Check if the user has a preference in the browser
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

/**
 * Set the HTML data-theme attribute and update localStorage
 */
export const applyTheme = (theme: "light" | "dark"): void => {
  if (typeof document === "undefined") return;

  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (err) {
    console.error("Failed to save theme preference to localStorage", err);
  }
};

/**
 * Get the saved theme from localStorage or use system preference as fallback
 */
export const getSavedTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  try {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    return savedTheme || getSystemThemePreference();
  } catch (err) {
    console.error("Failed to read theme preference from localStorage", err);
    return getSystemThemePreference();
  }
};
