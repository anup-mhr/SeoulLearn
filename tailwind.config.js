/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#7c3aed",
        tertiery: "#7d69ed",
        accent: "#f5a623",
        background: "#f0f0f0",
        text: "#333333",
        error: "#ff4444",
        textSecondary: "#777777",
        surface: "#ffffff",
        success: "#4caf50",
        warning: "#ff9800",
      },
    },
  },
  plugins: [],
};
