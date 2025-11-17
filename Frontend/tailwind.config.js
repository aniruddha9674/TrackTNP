/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "var(--bg)",
          text: {
            primary: "var(--text-primary)",
            secondary: "var(--text-secondary)",
          },
          surface: "var(--surface)",
          brand: {
            DEFAULT: "var(--brand)",
            hover: "var(--brand-hover)",
          },
          info: "var(--info)",
          success: "var(--success)",
          error: "var(--error)",
        },
        dark: {
          bg: "var(--bg)",
          text: {
            primary: "var(--text-primary)",
            secondary: "var(--text-secondary)",
          },
          surface: "var(--surface)",
          brand: {
            DEFAULT: "var(--brand)",
            hover: "var(--brand-hover)",
          },
          info: "var(--info)",
          success: "var(--success)",
          error: "var(--error)",
        },
      },
    },
  },
  plugins: [],
};
