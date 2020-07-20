const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//export default = module.exports
module.exports = (env = {}) => {
  const { mode = "development" } = env;
  const isProd = mode === "production";
  const isDev = mode === "development";
  const getStyleLoadwers = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };
  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "Hello, world",
        buildTime: new Date().toString(),
        template: "public/index.html",
      }),
      ,
    ];
    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main-[hash:8].css",
        })
      );
    }
    return plugins;
  };
  return {
    mode: isProd ? "production" : isDev && "development",
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined,
    },
    module: {
      //loading javascript
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        //Loading images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        //Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2|)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
              },
            },
          ],
        },
        //Loading css
        {
          test: /\.(css)$/,
          use: getStyleLoadwers(),
        },
        //Loading sass/scss
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoadwers(), "sass-loader"],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      open: true,
    },
  };
};
