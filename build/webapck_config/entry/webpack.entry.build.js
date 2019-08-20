
const path = require('path');
const dirVars = require('../../base/dir.conf')
const pageArr = require('../../base/page-entries.config.js');
var configEntry = {};

pageArr.forEach((page) => {
  configEntry[page] = ["babel-polyfill", path.resolve(dirVars.src, './index.js')];

});

module.exports = configEntry;