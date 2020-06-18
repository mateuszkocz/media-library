module.exports = {
  renderer: {
    entry: ["./src/renderer/javascripts/index.js"],
    resolve: {
      extensions: [".js", ".json", ".jsx", ".css", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-numeric-separator",
              ],
            },
          },
        },
      ],
    },
  },
  preload: {
    entry: "./src/preload/index.js",
  },
  main: {
    entry: "./src/main/index.js",
  },
}
