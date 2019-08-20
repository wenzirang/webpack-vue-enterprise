
const dirVars = require('../../base/dir.conf')
const pageArr = require('../../base/page-entries.config.js')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
console.log(process.env.NODE_ENV);
const configPlugins = [
    new webpack.NamedModulesPlugin(),
    //设置全局变量
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new ExtractTextPlugin({
        filename: 'index.css?v=[contenthash:10]',
        allChunks: true,
    }),

    new webpack.optimize.UglifyJsPlugin({    //压缩代码 js压缩
        compress: {
            warnings: false,
            drop_console: true
        },
        output: {
            comments: false, // 去掉注释内容
        },
        except: ['$', 'exports', 'require']    //排除关键字
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons', // 这公共代码的chunk名为'commons'
        filename: 'assets/lib/[name].js?v=[hash:10]', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
        minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
    }),   
];




pageArr.forEach(page => {
    configPlugins.push(
        new HtmlWebpackPlugin({
            title: '',
            minify: { //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            },
            filename:  '/index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            template: path.resolve(dirVars.src, `./index.html`),
            chunks: [page, 'dll', 'commons'],
            chunkhash: true, // 为静态资源生成hash值
            xhtml: true,
        })
    )
})
module.exports = configPlugins;