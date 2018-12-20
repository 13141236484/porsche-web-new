// 这两个设置是因为开发环境的特殊性导致的
// const PUPLIC_DIR ='/yu/project_yu/';//静态资源目录存放地址，不填为后台设置的静态资源目录
// const PORSCHE_HOSTS ="http://test.porsche-fan.com:8085/service";//接口域名地址
// const PORSCHE_HOSTS ="http://127.0.0.1:5001";//接口域名地址/service
// const PORSCHE_HOSTS ='//'+location.hostname+"/service";//正式接口域名地址
// const PORSCHE_HOSTS ="http://192.168.1.152:5001";//高宇域名地址
//    const PORSCHE_HOSTS ="http://10.232.17.65:5001";//万友锋域名地址
// const PORSCHE_HOSTS ="http://192.168.1.144:5001";//高志清域名地址
// const PORSCHE_HOSTS ="http://127.0.0.1:5001/service";//接口域名地址1212
// const PORSCHE_HOSTS ="http://43.254.90.210:8084/service"; //测试域名地址
   const PORSCHE_HOSTS ='//'+location.hostname+"/service";//接口域名地址
// const PORSCHE_HOSTS ="http://192.168.1.35:5001";//接口域名地址

const PUPLIC_DIR ="/";//静态资源目录存放地址，不填为后台设置的静态资源目录
//  const PORSCHE_HOSTS ="//porsche.time-stone.cn/service";//接口域名地址
const CONFIG={
  PUPLIC_DIR,PORSCHE_HOSTS
};
module.exports=CONFIG;

//
