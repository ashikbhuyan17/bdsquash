import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "10mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.bdsquash.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bdsquash.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bdsquash.org",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
