import { defineConfig } from "astro/config";

// Static output: ships to /dist, deployed to Cloudflare Workers via wrangler.
// No SSR adapter needed — this site has no server-side rendering needs.
export default defineConfig({
  output: "static",
  site: "https://amanoteam.com",
});
