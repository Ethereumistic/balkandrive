const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@medusajs/product"],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "balkandrive-nxpd.vercel.app",
      "localhost",
      "balkandrive-nxpd.vercel.app",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
