import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#EBF5FF",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#10B981",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#D1FAE5",
          dark: "#047857",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
          dark: "#B45309",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
          dark: "#B91C1C",
        },
        sidebar: {
          bg: "#FAFBFC",
          active: "#E0E7FF",
        },
        text: {
          main: "#1F2937",
          muted: "#6B7280",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
        body: {
          bg: "#F9FAFB",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'btn': '8px',
        'card': '12px',
        'modal': '16px',
      },
      spacing: {
        'gap': '24px',
        'card-p': '24px',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
