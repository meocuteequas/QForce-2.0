import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/teams",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/documents",
        destination: "/dashboard",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
