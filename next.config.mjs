import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
