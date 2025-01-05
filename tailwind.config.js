/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "sans-serif"], // Modern font for titles
        content: ["Inter", "sans-serif"], // Clean font for content
      },
      colors: {
        customYellow: "#FFD700", // Define your custom yellow
        customBlack: "#1f1b18", // Define your custom black
        slate800: "#1e2631", // Slate for shimmer animation
      },
      backgroundImage: {
        grainy:
          "radial-gradient(circle, rgba(18,18,18,1) 10%, rgba(28,28,28,1) 40%, rgba(15,15,15,1) 90%), " +
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mNgYGBQDwQXwKkYBQAEgwFczig6lgAAAABJRU5ErkJggg==')",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite", // Shimmer animation
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      boxShadow: {
        shimmer: "0px 0px 15px 2px rgba(255, 215, 0, 0.6)", // Optional glow for shimmer
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        blackYellowTheme: {
          primary: "#FFDD00",
          secondary: "#FFD600",
          accent: "#1E1E1E",
          neutral: "#121212",
          "base-100": "#121212",
          "base-content": "#E5E5E5",
        },
      },
    ],
  },
};
