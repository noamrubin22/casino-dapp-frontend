/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

module.exports = {
  env: {
    mnemonic:
      "green shoot helmet general dirt level athlete together already pipe virtual room",

    alchemy: "Kv9FfF3bTMKeNdw5xM-kqno7qcHj8xCU",
  },
};
