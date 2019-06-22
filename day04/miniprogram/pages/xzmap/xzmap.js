// pages/xzmap/xzmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[{
      iconPath:'/images/marker.png', //标记图标
      id:0,
      longitude: 110.469208,  //经度
      latitude: 35.47197,     //纬度
      width:30, //宽度
      height:30 //高度
    }],
    polyline:[{ //线路
      points:[
        { longitude: 109.762601, latitude: 34.988937},
        { longitude: 110.469208, latitude: 35.47197}
      ],
      color:"#666666",
      width:3,
      dottedLine:true
    }],
    controls:[{   //控件
      id:1,
      iconPath:'/images/film.png',
      position:{
        left:0,
        top:290 - 50,
        width:50,
        hieght:50
      }
    }]
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