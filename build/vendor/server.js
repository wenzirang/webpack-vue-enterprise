/*
  单独出来 不跟webpack混在一起
  跟devServer 是一样的效果   
  使用方法  node build/vendor/server.js
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require("../../webpack.config.js")(true);
const dirVars = require('../base/dir.conf')
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  port: dirVars.host,
  compress: true,
  historyApiFallback: true
}).listen(dirVars.host, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:' + dirVars.host + '/');
});
// publicPath: output.publicPath,
// historyApiFallback: true,//不跳转
// contentBase:"./view/dist/",
// port:dirVars.host,
// compress: true,
// inline:true,//实时刷新
// clientLogLevel: "none",
// watch:true,
// hot:true,
// Open:true