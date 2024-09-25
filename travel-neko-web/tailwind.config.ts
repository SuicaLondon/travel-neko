import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        outline: "2px 2px 0px rgba(0, 0, 0, 1)", // Adjust the shadow and color here
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".text-outline-black": {
          textShadow: "2px 2px 0px rgba(0, 0, 0, 1)", // Black outline
        },
        ".text-outline-white": {
          textShadow: "2px 2px 0px rgba(255, 255, 255, 1)", // White outline
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
