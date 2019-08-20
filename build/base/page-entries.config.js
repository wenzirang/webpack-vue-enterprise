var glob = require('glob');
var dirVars = require('./dir.conf.js');
var options = {
  cwd: dirVars.src, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
};
var globInstance = new glob.Glob('**/index.html', options); // 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录


for(var i=0;i<globInstance.found.length;i++)
{
  var v = globInstance.found[i];
 globInstance.found[i] = v.slice(0,v.lastIndexOf('/'))
}

module.exports = globInstance.found; // 一个数组，形如['index/index', 'index/login', 'alert/index']  
