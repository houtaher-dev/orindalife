import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/houtaher-dev/orindalife/**",
      },
    ],
  },
};

export default nextConfig;
