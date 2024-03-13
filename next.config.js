/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 1000
};

module.exports = nextConfig;
