import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Flex Variable", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [daisyui],
};

export default config;
