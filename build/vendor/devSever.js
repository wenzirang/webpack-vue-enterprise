


const dirVars = require('../base/dir.conf')
const output = require("../webapck_config/output/webpack.output.dev")
const configDevSever = {
           publicPath: output.publicPath,
           historyApiFallback: true,//不跳转
           contentBase:"./view/dist/",
           port:dirVars.host,
           compress: true,
           inline:true,//实时刷新
           host:'localhost',
           clientLogLevel: "none",
           watch:true,
           hot:true,
           Open:true
       };


module.exports = configDevSever;


