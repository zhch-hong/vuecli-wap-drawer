const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    allowedHosts: ["zch.wap.drawer"],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      webSocketURL: {
        protocol: "wss",
        hostname: "zch.wap.drawer",
        port: 443,
      },
    },
  },
});
