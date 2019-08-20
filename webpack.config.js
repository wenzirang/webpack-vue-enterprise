const path = require('path')



const vuxLoader = require('vux-loader')

const modulesDev = require('./build/webapck_config/module/webpack.module.dev')
const modulesBuild = require('./build/webapck_config/module/webpack.module.build')
const pluginsDev = require('./build/webapck_config/plugins/webpack.plugins.dev')
const pluginsBuild = require('./build/webapck_config/plugins/webpack.plugins.build')

const entrysDev = require('./build/webapck_config/entry/webpack.entry.dev')
const entrysBuld = require('./build/webapck_config/entry/webpack.entry.build')

const outputsDev = require('./build/webapck_config/output/webpack.output.dev')
const outputsBuild = require('./build/webapck_config/output/webpack.output.build')

const devServer = require('./build/vendor/devSever')
const resolves = require('./build/lib/resolve.config')

const externals = require('./build/lib/externals')
//var BomPlugin = require('webpack-utf8-bom');//将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = function (env) {
    // if(JSON.parse(env.compress) )       
    var devtool = env ? "source-map" : "";
    if (env) {
        return new webpack(devtool, entrysDev, outputsDev, modulesDev, pluginsDev, resolves, {});
    } else {
        return new webpack(devtool, entrysBuld, outputsBuild, modulesBuild, pluginsBuild, resolves, {});
    }

    /* 输入文件 */
    // entry:entrys,
    // output:outputs,
    // module: modules,
    // plugins:plugins, 
    //devServer:devServer,
    //其它解决方案配置
    // resolve: resolves,


    //    source-map	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
    //    cheap-module-source-map	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    //    eval-source-map	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
    //    cheap-module-eval-source-map	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具

    // eval
    // 每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.

    // source-map
    // 生成一个 SourceMap 文件.

    // hidden-source-map
    // 和 source-map 一样，但不会在 bundle 末尾追加注释.

    // inline-source-map
    // 生成一个 DataUrl 形式的 SourceMap 文件.

    // eval-source-map
    // 每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的 SourceMap .

    // cheap-source-map
    // 生成一个没有列信息（column-mappings）的 SourceMaps 文件，不包含 loader 的 sourcemap（譬如 babel 的 sourcemap）

    // cheap-module-source-map
    // 生成一个没有列信息（column-mappings）的 SourceMaps 文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。

    // devtool:"cheap-module-eval-source-map"
    //cheap-module-eval-source-map 开发
    //cheap-module-source-map 生产
}
function webpack(devtool, entry, output, module, plugins, resolve, externals, devServer) {
    this.devtool = devtool;
    this.entry = entry;
    this.output = output;
    this.module = module;
    this.plugins = plugins;
    this.resolve = resolve;
    this.externals = externals;
    this.devServer = devServer;
}
