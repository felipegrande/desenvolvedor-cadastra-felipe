const path = require("path");

const paths = {
  scripts: { src: "./src" }, // aponta para a pasta inteira
  dest: "./dist"
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, paths.scripts.src, "index.tsx"), // entry point
  },
  output: {
    path: path.resolve(__dirname, paths.dest),
    filename: "bundle.js",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // permite importar sem extensão
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // processa TS, TSX, JS, JSX
        exclude: /node_modules/,
        include: path.resolve(__dirname, paths.scripts.src), // processa todos os arquivos da src
        use: "ts-loader",
      },
      {
        test: /\.scss$/, // processa arquivos Sass
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i, // processa imagens
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, paths.dest),
    hot: true,
  },
  plugins: [],
};
