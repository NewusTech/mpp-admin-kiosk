import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#FCFDFE",
          100: "#F2F5FB",
          200: "#E2EAF7",
          300: "#CBD9F1",
          400: "#AEC3E9",
          500: "#8AA9DF",
          600: "#608AD3",
          700: "#3568C0",
          800: "#1D3A6C",
          900: "#101F39",
        },
        secondary: {
          50: "#FFFDFC",
          100: "#FFF9F3",
          200: "#FFF0E4",
          300: "#FFE5D0",
          400: "#FFD6B5",
          500: "#FFC595",
          600: "#FFB06F",
          700: "#FF9742",
          800: "#AB4D00",
          900: "#512400",
        },
        neutral: {
          50: "#FEFEFE",
          100: "#FBFBFB",
          200: "#F7F7F7",
          300: "#F0F0F0",
          400: "#E8E8E8",
          500: "#DEDEDE",
          600: "#D2D2D2",
          700: "#C4C4C4",
          800: "#656565",
          900: "#2C2C2C",
        },
        success: {
          50: "#FBFEFD",
          100: "#F1FCF7",
          200: "#DFF8EE",
          300: "#C6F3E0",
          400: "#A6EDCF",
          500: "#7EE5BA",
          600: "#50DBA1",
          700: "#28C382",
          800: "#176E4A",
          900: "#0C3B28",
        },
        warning: {
          50: "#FFFDFC",
          100: "#FEF9F4",
          200: "#FDF1E6",
          300: "#FCE6D2",
          400: "#FAD8B8",
          500: "#F8C799",
          600: "#F5B374",
          700: "#F29B4A",
          800: "#9E520B",
          900: "#4B2705",
        },
        error: {
          50: "#FFFCFD",
          100: "#FEF3F5",
          200: "#FDE4E9",
          300: "#FBCFD8",
          400: "#F8B4C2",
          500: "#F693A7",
          600: "#F26C87",
          700: "#EE3F62",
          800: "#950D28",
          900: "#480614",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
