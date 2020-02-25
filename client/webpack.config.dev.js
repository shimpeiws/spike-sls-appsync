const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/Index.tsx",
  output: {
    filename: "./js/bundle.js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      GRAPH_QL_ENDPOINT: JSON.stringify(process.env.GRAPH_QL_ENDPOINT),
      APPSYNC_API_KEY: JSON.stringify(process.env.APPSYNC_API_KEY)
    })
  ],

  devServer: {
    open: true,
    contentBase: path.join(__dirname, "./dist"),
    watchContentBase: true,
    port: 3000
  }
};
