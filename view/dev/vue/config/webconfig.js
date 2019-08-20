//开发
var Local = {
  agent: "http://localhost:49536", //本地iis网站的地址
  adminapi: "http://localhost:49536",//本地的api
  webapi: "http://114.11.11.201:7020/"

};//开发演示
var Developement = {
  agent: "http://dev.com", //本地iis网站的地址
  adminapi: "http://dev.com",//本地的api
  webapi: "http://114.11.11.201:7021/"
};
//测试
var Test = {
  agent: "http://test.com", //本地iis网站的地址
  adminapi: "http://test.com",//本地的api
  webapi: "http://114.11.11.201:7021/"
};
//预发布
var PreRelease = {
  agent: "http://localhost:49536", //本地iis网站的地址
  adminapi: "http://localhost:49536",//本地的api
  webapi: "http://114.55.253.201:7021/"
};
//发布
var Release = {
  agent: "http://localhost:49536", //本地iis网站的地址
  adminapi: "http://localhost:49536",//本地的api
  webapi: "http://114.55.253.201:7021/"
};
function Create() {
  switch (process.env.NODE_ENV) {
    case 'local':
      return Local;
    case 'dev':
      return Developement;
    case 'test':
      return Test;
  }
}

var Consts = {
  adminapi: "",
  webapi: ""
};
var config = Create(2);
for (var tem in config) {
  Consts[tem] = config[tem];
}

export default Consts;