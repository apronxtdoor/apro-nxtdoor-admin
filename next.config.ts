import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

/** @type {import('next').NextConfig} */
interface WebpackOptions {
  isServer: boolean;
}

interface NextConfigWithTypes extends NextConfig {
  webpack: (config: WebpackConfig, options: WebpackOptions) => WebpackConfig;
  typescript: {
    ignoreBuildErrors: boolean;
  };
  eslint: {
    ignoreDuringBuilds: boolean;
  };
}

const nextConfig: NextConfigWithTypes = {
  webpack: (config: WebpackConfig, { isServer }: WebpackOptions): WebpackConfig => {
    // Handle undici module issues
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  // Disable TypeScript errors during build if needed
  typescript: {
    ignoreBuildErrors: false,
  },
  // Disable ESLint during build if needed
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;