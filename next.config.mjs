/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    CLOUDFLARE_R2_PUB_BUCKET_URL:
      "https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev",
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
