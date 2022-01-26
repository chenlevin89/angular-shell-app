const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("../package.json").dependencies;


module.exports = {
    output: {
        uniqueName: "demandPlatform",
        scriptType: 'text/javascript'
    },
    optimization: {
        runtimeChunk: false
    },
    plugins: [

        new ModuleFederationPlugin({

            remotes: {
              "reactRemote":"reactRemote@http://localhost:8081/remoteEntry.js"
            },

            shared: {
                "@angular/core": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/core"]},
                "@angular/common": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
                "@angular/common/http": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/common"]},
                "@angular/router": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/router"]},
                "@angular/forms": {singleton: true, strictVersion: true, requiredVersion: dependencies["@angular/forms"]},
                "react": {singleton: true, strictVersion: true, requiredVersion: dependencies["react"]},
                "react-dom": {singleton: true, strictVersion: true, requiredVersion: dependencies["react-dom"]},
                "react-router-dom": {singleton: true, strictVersion: true, requiredVersion: dependencies["react-router-dom"]},
            }

        })
    ],
    devServer: {
        client: {
            webSocketURL: 'ws://localhost:8080/ws',
        },
        liveReload: false,
        hot: true
    },
}

