import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "10mb",
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
