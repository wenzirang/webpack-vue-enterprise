var path = require('path');
var moduleExports = {};

moduleExports.host = 5678; // 服务器的端口号

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录

moduleExports.dev = path.resolve(moduleExports.staticRootDir, './view/dev'); // 开发代码文件夹

moduleExports.src = path.resolve(moduleExports.dev, './vue'); // 项目业务代码根目录

moduleExports.build = path.resolve(moduleExports.staticRootDir, './build')

moduleExports.base = path.resolve(moduleExports.build, './base')

moduleExports.dist = path.resolve(moduleExports.staticRootDir, './view/dist'); // 生成的代码

moduleExports.assets = path.resolve(moduleExports.dist, './assets'); // 生成的代码

moduleExports.dllDir = path.resolve(moduleExports.assets, './lib'); // 存放由各种不常改变的js/css打包而来的dll

moduleExports.vendor = path.resolve(moduleExports.build, './vendor')

moduleExports.img = path.resolve(moduleExports.dist, './view/img'); // 生成的图片

module.exports = moduleExports;
