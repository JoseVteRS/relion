/** @type {import('next').NextConfig} */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
    };

    config.module.rules.push({
      test: /\.cjs$/,
      type: 'javascript/auto',
    });

    return config;
  },
};

export default nextConfig;
