const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    allowedHosts: ["www.local.webpackdev.com"],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      webSocketURL: {
        protocol: "wss",
        hostname: "www.local.webpackdev.com",
        port: 443,
      },
    },
  },
});
