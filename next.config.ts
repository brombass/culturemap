import type { NextConfig } from "next";

// The app is a fully client-rendered single page (all state lives in the
// browser), so we export it as static files — same deployment model as the
// original static site in legacy/.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Silence root-inference warning: an unrelated bun.lock lives one level up
  // in the parent projects directory, not inside this repo.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
