/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048], // Add appropriate sizes
  },
};

export default nextConfig;
