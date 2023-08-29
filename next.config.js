/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST_API: process.env.HOST_API,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
