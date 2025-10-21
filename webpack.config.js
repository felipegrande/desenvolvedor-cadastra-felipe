const path = require("path");

const paths = {
  scripts: { src: "./src/index.tsx" },
  dest: "./dist"
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, paths.scripts.src),
  },
  output: {
    path: path.resolve(__dirname, paths.dest),
    filename: "bundle.js",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, paths.scripts.src),
        use: "ts-loader",
      },
    ],
  },
  plugins: [],
};
