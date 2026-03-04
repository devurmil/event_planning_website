const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: "8px",
        secondary: "4px",
        container: "12px",
      },
      boxShadow: {
        DEFAULT: "0 1px 4px rgba(0, 0, 0, 0.1)",
        hover: "0 2px 8px rgba(0, 0, 0, 0.12)",
        glow: "0 0 30px rgba(139, 92, 246, 0.35)",
        "glow-pink": "0 0 30px rgba(236, 72, 153, 0.35)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.35)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
      },
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
          light: "#EDE9FE",
        },
        secondary: {
          DEFAULT: "#6B7280",
          hover: "#4B5563",
        },
        accent: {
          DEFAULT: "#EC4899",
          hover: "#DB2777",
        },
        brand: {
          purple: "#7C3AED",
          pink: "#EC4899",
          indigo: "#4F46E5",
          violet: "#8B5CF6",
        },
        dark: {
          DEFAULT: "#0F0F1A",
          card: "#161626",
          border: "#2A2A40",
          surface: "#1A1A2E",
        },
      },
      spacing: {
        "form-field": "16px",
        section: "32px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
        "dark-gradient": "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)",
        "hero-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(15,15,26,0.95))",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.8)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        spin_slow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in-up-delay-1": "fade-in-up 0.7s ease-out 0.15s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.7s ease-out 0.3s forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.7s ease-out forwards",
        "slide-in-right": "slide-in-right 0.7s ease-out forwards",
        "spin-slow": "spin_slow 20s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "active"],
    },
  },
};
