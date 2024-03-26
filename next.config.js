/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude solidity-analyzer module from being bundled
      config.externals.push({
        "@nomicfoundation/solidity-analyzer-win32-x64-msvc/solidity-analyzer.win32-x64-msvc.node":
          "commonjs2 @nomicfoundation/solidity-analyzer-win32-x64-msvc/solidity-analyzer.win32-x64-msvc.node",
      });
    }
    return config;
  },
};
