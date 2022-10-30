const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("../package.json").dependencies;

const fusionUI = '@ironsource/fusion-ui';
const fusionUISharedEntities = require(`../node_modules/${fusionUI}/package.json`).sharedEntities;


const fusionDeps =  fusionUISharedEntities
    .reduce((acc, curr) => {
        acc[`${fusionUI}${curr.slice(1)}`] = {singleton: true, strictVersion: true, requiredVersion: dependencies[fusionUI]};
        return acc;
    }, {});


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

      },

      shared: {
        "@angular/core": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/core"]},
        "@angular/common": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
        "@angular/common/http": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
        "@angular/router": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/router"]},
        "@angular/forms": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/forms"]},
        ...fusionDeps,
        "@ironsource/fusion-ui/pipes/clone": {singleton: true, strictVersion: true, requiredVersion: dependencies[fusionUI]},
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
        context: ['/partners', '/api' , '/api/rest'],
        target: 'https://dev-php-demand8.supersonicads.com',
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
      },
      {
        context: ['/platformJs'],
        target: 'https://dev-php-demand8.supersonicads.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/platformJs': '/platformjs' },
        headers: {
          Connection: 'keep-alive',
        },
      }
    ]
  },
}

