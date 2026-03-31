import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ IMAGE OPTIMIZATION (Turbopack-compatible)
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for versioned images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ✅ COMPRESSION & CACHING
  compress: true,
  poweredByHeader: false,

  // ✅ HEADERS & SECURITY
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, s-maxage=3600",
        },
      ],
    },
    {
      source: "/public/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // ✅ TURBOPACK COMPATIBLE
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
};

export default nextConfig;
