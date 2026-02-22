import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Convex generated files live outside the default include paths
  transpilePackages: ["convex"],
};

export default nextConfig;
