/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        accent: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        "float-slow": "float 20s ease-in-out infinite",
        "float-slower": "float 25s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}
