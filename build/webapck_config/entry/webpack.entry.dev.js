
const path = require('path');
const dirVars = require('../../base/dir.conf')
const pageArr = require('../../base/page-entries.config.js');
var configEntry = {};
pageArr.forEach((page) => {
  configEntry[page] = ["babel-polyfill", 'webpack-dev-server/client?http://localhost:' + dirVars.host, 'webpack/hot/only-dev-server', path.resolve(dirVars.src, './index.js')];  

});
module.exports = configEntry;