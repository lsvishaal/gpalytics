/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        texturedBlack: "#121212", // Textured black
        vibrantYellow: "#FFDD00", // Vibrant yellow
      },
      backgroundImage: {
        grainy: `
          radial-gradient(circle, rgba(18,18,18,1) 10%, rgba(28,28,28,1) 40%, rgba(15,15,15,1) 90%),
          url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mNgYGBQDwQXwKkYBQAEgwFczig6lgAAAABJRU5ErkJggg==')
        `, // A radial gradient with an overlaid noise pattern
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
}
