import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ IMAGE OPTIMIZATION (Turbopack-compatible)
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for versioned images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ✅ COMPRESSION & CACHING
  compress: true,
  poweredByHeader: false,

  // ✅ HEADERS & SECURITY + PHASE 2 OPTIMIZATION
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, s-maxage=3600",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
      ],
    },
    // ✅ PHASE 2: Aggressive cache for static assets
    {
      source: "/public/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*\\.woff2?|.*\\.ttf|.*\\.eot|.*\\.otf)$",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // ✅ PHASE 2: Video caching (CDN-friendly)
    {
      source: "/video/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=86400, s-maxage=604800",
        },
      ],
    },
    // ✅ PHASE 2: Image caching (optimized, immutable)
    {
      source: "/fotos/:path*",
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
