/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/Shader",
  assetPrefix: "/Shader",
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader'
    });

    return config;
  },
}

module.exports = nextConfig
