// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//1.引入request-promise
var rp=require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
 //2.发送豆瓣请求
  var url =`http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rp(url).then(res=>{return res;})
  .catch(err=>{console.log(err)})
  }