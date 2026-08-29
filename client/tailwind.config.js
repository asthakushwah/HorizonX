/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        card: "#111111",
        border: "#242424",
        accent: "#FFFFFF",
        hover: "#3B82F6",
      },
      borderRadius: {
        xl2: "16px",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "gradient-horizon": "linear-gradient(90deg, #ffffff 0%, #93c5fd 50%, #3B82F6 100%)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 1 },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
