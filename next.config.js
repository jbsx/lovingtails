/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  env: {
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
