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
        canvas: {
          DEFAULT: "#0f1319",
          light: "#131922",
        },
        card: {
          DEFAULT: "#1b2330",
          border: "#242f42",
        },
        accent: {
          cyan: "#06b6d4",
          blue: "#3b82f6",
          emerald: "#10b981",
          red: "#ef4444",
        },
        slate: {
          850: "#1a2332",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
