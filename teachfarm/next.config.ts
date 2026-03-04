import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Domains for image optimization
    domains: [
      'res.cloudinary.com',
      'localhost',
      'placehold.co',
      'via.placeholder.com'
    ],
    // Allow all image sources in development, restrict in production
    remotePatterns: process.env.NODE_ENV === 'production' ? [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ] : [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Enable SVG support
    dangerouslyAllowSVG: true,
    // Basic content security policy
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable optimization in development for faster builds
    ...(process.env.NODE_ENV !== 'production' && {
      unoptimized: true,
    }),
  },
  // Experimental features
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
