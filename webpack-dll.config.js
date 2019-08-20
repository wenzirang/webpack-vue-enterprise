const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirVars = require('./build/base/dir.conf'); // 与业务代码共用同一份路径的配置表
const path = require('path')
const resolves = require('./build/lib/resolve.config')
const modules =  require('./build/webapck_config/module/webpack.module.build')
module.exports = {
  output: {
    path: dirVars.dllDir,
    filename: '[name].js',
    library: '[name]_[chunkhash]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    dll: [
      'jquery','vue','vue-router'
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "manifest.json"), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]_[chunkhash]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: path.join(__dirname, "../"), // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    new webpack.DllReferencePlugin({
      context: dirVars.staticRootDir,
      manifest: require('./manifest.json'),
    }),
    /* 跟业务代码一样，该兼容的还是得兼容 */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      vue:"Vue"
    }),
    new ExtractTextPlugin('[name].css'), // 打包css/less的时候会用到ExtractTextPlugin
    new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true, //是否是去掉 debugger
    //     drop_console: true  //是否去掉 console.log

    //   },
    //   output: {
    //     comments: false, // 去掉注释内容
    // }
    }),

  ],
  module:modules, // 沿用业务代码的module配置
  resolve:resolves, // 沿用业务代码的resolve配置
};
