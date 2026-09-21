/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    if (Array.isArray(config.externals)) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    } else if (config.externals) {
      config.externals = [config.externals, "pino-pretty", "lokijs", "encoding"];
    } else {
      config.externals = ["pino-pretty", "lokijs", "encoding"];
    }
    return config;
  },
};

export default nextConfig;
