/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-11426a046d4e420fb71ed0b7100145b5.r2.dev",
      },
    ],
  },
};
export default nextConfig;
