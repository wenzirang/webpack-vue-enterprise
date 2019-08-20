
const path = require('path')
const dirVars = require('../../base/dir.conf')


const configOutput = {  /* 输出目录，没有则新建 */
        path: dirVars.dist,
        /* 静态目录，可以直接从这里取文件 */
        //publicPath:  "http://webpackvue.fx110.com/",  // "http://localhost:"+ dirVars.host +"/", css中img的路径会出现问题，通过设置publicPath 解决，采用绝对路径
        publicPath:  "/",
        chunkFilename: 'assets/js/chunk_[name].js?v=[chunkhash:10]',
      
        /* 文件名 */
        //filename: '[name]/index.js?[chunkhash]'
         filename: 'index.js?v=[chunkhash:10]'}


module.exports = configOutput;

