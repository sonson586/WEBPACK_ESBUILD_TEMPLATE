const HtmlPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const { EsbuildPlugin } = require("esbuild-loader");

module.exports = {
	// 파일을 읽어들이기 시작하는 진입점 설정
  entry: "./src/main.js",	// 엔트리 파일 인식. 번들링 결과물에 포함시킴
  output: {
    clean: true	// 새로 build 시 기존 필요없는 파일/폴더 삭제
  },
  
  module: {
    rules: [
      {
        test: /\.s?css$/,	// .css 또는 scss로 끝나는 파일 인식
        use: [
          "style-loader",	// html에 삽입해주는 역할
          "css-loader",	// 먼저 해석됨. js에서 css 인식하도록 해석
          "postcss-loader",	// 공급업체 접두사 적용
          {
            loader: "esbuild-loader",
            options: {
              minify: true
            }
          }
        ]
      },
      {
        test:/\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          target: "es2020"
        }
      }
    ]
  },

  cache: true,

  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      "...",

      // ESBuild
      new EsbuildPlugin({
        target: "es2020",
        css: true
      }),
    ]
  },
  
  plugins:[
    new HtmlPlugin({
      template: "./index.html"	// 번들링 결과물에 html을 포함시킴
    }),
    new NodePolyfillPlugin(),
  ],
  
  devServer:{
    port: 8080
  },
}