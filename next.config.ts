import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wholesaler-core-v2.paraf.app',
        port: '',
        pathname: '/**',
      },
      // اگه هنوز از ساب‌دامین توسعه هم عکس می‌گیری نگهش دار، وگرنه می‌تونی حذفش کنی
      {
        protocol: 'https',
        hostname: 'wholesaler-core-develop.web.parafacc.ir',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;