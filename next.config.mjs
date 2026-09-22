/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(@x402|@react-native-async-storage)/,
      })
    );
    if (isServer) {
      const externals = ["pino-pretty", "lokijs", "encoding"];
      if (Array.isArray(config.externals)) {
        config.externals.push(...externals);
      } else if (config.externals) {
        config.externals = [config.externals, ...externals];
      } else {
        config.externals = externals;
      }
    }
    return config;
  },
};

export default nextConfig;
