const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const webpack = require("webpack");
module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  assetsDir: "static", //静态资源目录名称
  productionSourceMap: false, //去掉打包的时候生成的map文件
  lintOnSave: true,
  filenameHashing: false,

  // webpack-dev-server 相关配置
  //手机查看
  // devServer: {
  //     host: '172.16.202.227', // ip
  //     port: 8081, // 设置端口号
  //     https: false, // https:{type:Boolean}
  //     open: false, //配置自动启动浏览器
  //     proxy: null  //设置代理
  // },
  runtimeCompiler: true, //加入内容
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("lib", resolve("src/lib"));
  }
};
