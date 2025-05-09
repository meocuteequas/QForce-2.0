import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {  /* config options here */
  trailingSlash: true,
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
  },};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
