const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("../package.json").dependencies;


module.exports = {
  output: {
    uniqueName: "hostPlatform",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [

    new ModuleFederationPlugin({

      remotes: {
        "reactRemote": "reactRemote@http://localhost:8081/remoteEntry.js",
        "vueRemote": "vueRemote@http://localhost:8082/remoteEntry.js",
        "adQualityRemote": "adQualityRemote@http://localhost:9000/remoteEntry.js",
        "analyticsRemote": "analyticsRemote@http://localhost:8080/remoteEntry.js",
        "demandPlatform":"demandPlatform@https://local.supersonicads.com:4201/remoteEntry.js"
      },

      shared: {
        "@angular/core": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/core"]},
        "@angular/common": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
        "@angular/common/http": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
        "@angular/router": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/router"]},
        "@angular/forms": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/forms"]},
        "@ironsource/fusion-ui": {singleton: true, strictVersion: true, requiredVersion: dependencies["@ironsource/fusion-ui"]},
        "react": {singleton: true, strictVersion: true, requiredVersion: dependencies["react"]},
        "react-dom": {singleton: true, strictVersion: true, requiredVersion: dependencies["react-dom"]},
        // "react-router-dom": {singleton: true, strictVersion: true, requiredVersion: dependencies["react-router-dom"]},
        // "vue": {singleton: true, strictVersion: true, requiredVersion: dependencies["vue"]},
        // "vue-router": {singleton: true, strictVersion: true, requiredVersion: dependencies["vue-router"]},
      }

    })
  ],
  devServer: {
    port: 8085,
    client: {
      webSocketURL: 'ws://localhost:8085/ws',
    },
    liveReload: true,
    proxy: [
      {
        context: ['/partners', '/api/rest'],
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      {
        context: ['/api'],
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
      {
        context: ['/platformJs'],
        target: 'https://dev-php-demand3.supersonicads.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/platformJs': '/platformjs' }
      }
    ]
  },
}

