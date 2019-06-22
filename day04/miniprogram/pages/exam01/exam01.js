//1.初始化数据库
const db=wx.cloud.database({
  env:'web-text-01-v8obw'   //env:'环境ID'
  //当有多个环境id时，需在此处修改
});
// pages/exam01/exam01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /* 添加数据*/ 
  insert:function(){
    db.collection('webwx04').add({
      data:{
        name:'jerry',
        age:20
      }
    }).then(res=>{console.log(res)}).catch(err=>{
      console.log(err)
    })
  },
  //查询数据
  select:function(){
    db.collection('webwx04')
    .get()
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  },
  //上传图片
  upload:function(){
    wx.chooseImage({  //选择图片
      count:1,  //一次性选择几张图片
      sizeType:['original','compressed'],//选择图片（原图/压缩图）
      sourceType:['album','camera'],//图片来源
      success:function(res){ //回调函数
        var file=res.tempFilePaths[0];   //选中图片：数组
        //上传图片
        wx.cloud.uploadFile({
          //新图片名称
          cloudPath:new Date().getTime()+'.jpg',
          filePath:file,//选中图片
          success: res => { console.log(res.fileID) } //res.fileID云存储的图片路径
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})