/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        white: 'var(--color-white)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
        black: 'var(--color-black)',
        
        // Brand colors
        brand: {
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
        },
        
        // Functional colors
        'blue-light': {
          300: 'var(--color-blue-light-300)',
          500: 'var(--color-blue-light-500)',
        },
        success: {
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
        },
        error: {
          400: 'var(--color-error-400)',
          500: 'var(--color-error-500)',
        },

        // Semantic colors for easy use
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
      fontFamily: {
        sans: ['Urbanist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': ['0.9375rem', '1.5rem'],
      },
    },
  },
  plugins: [],
};