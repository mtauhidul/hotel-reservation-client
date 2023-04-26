/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#E0C07C",
        secondary: "#B2B2B2",
        accent: "#E0C07C",
        tint: "#F6F6F6",
      },
      keyframes: {},
      animation: {},
      fontSize: {
        h1: "48px",
        h2: "36px",
        h3: "24px",
        h4: "18px",
        h5: "16px",
        h6: "14px",
        body: "1rem",
      },
    },
  },
  plugins: [],
};
