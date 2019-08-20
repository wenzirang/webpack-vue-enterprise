const path = require('path');
const dirVars = require('../base/dir.conf');
module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    vendorDir: dirVars.vendor,
    /* base */
    DirVars: path.resolve(dirVars.base, "./dir.conf"),
    '@': path.resolve(dirVars.dev, "."),

    '#': path.resolve(dirVars.dev, "./vue/"),

    '@src': path.resolve(dirVars.dev, "./vue/src")
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css', '.ts', '.less', '.json', '.vue', '.json'],
};
