//初始化数据库
const db=wx.cloud.database({
  env:"web-text-01-v8obw"
});
// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid:0, //电影id
    detail:{}, //电影详细信息
    content:'', //评论初始值
    score:5,    //初始值5
    images:[],   //保存用户选中的图片
    fileID:[]   //保存图片fileID
  },
  onContextChange:function(e){
    //获取用户输入框评价
    //console.log(e.detail);
    this.setData({
      content:e.detail
    })
  },
  onScoreChange:function(e){
    //获取用户打分
    //console.log(e.detail);
    this.setData({
      score:e.detail
    })
  },
  /*上传图片*/
  uploadImg:function(){
    wx.chooseImage({  //选择图片张数9张
      count:9,
      sizeType:['origin','compressed'], //可以选择源图 /压缩图
      sourceType:['album','camera'],  //图片来源，相册/相机
      success:res=>{  //选择，成功
        const tempFiles=res.tempFilePaths;
      //  console.log(tempFiles);
        //预览：将用户选中的图片保存在data
        this.setData({
          images:tempFiles
        })
      }
    })
  },
  //提交评论、上传图片
  submit:function(){
    //1.上传9张图片
    wx.showLoading({
      title: '评论中...',
    });
    console.log(this.data.content+"_"+this.data.score)
    //2.上传图片到云存储
    //3.创建promise数组
    let promiseArr=[];
    //4.创建循环9次
    for(let i=0;i<this.data.images.length;i++){
    //5.创建Promise push到数组中
      promiseArr.push(new Promise((reslove, reject)=>{
      //5.1获取当前上传图片
      var item=this.data.images[i];
      //5.2创建正则表达式拆分文件后缀 .jpg .png
      let suffix=/\.\w+$/.exec(item)[0];
      //5.3上传图片
      wx.cloud.uploadFile({        
        cloudPath:new Date().getTime()+suffix, //上传至云端的路径，新文件路径
        filePath:item,  //准备上传文件路径,小程序临时路径
        success:res=>{
          //console.log(res.fileID);
          //将当前文件id保存在data中
          var ids=this.data.fileID.concat(res.fileID)
           //5.4上传成功将当前云存储fileID保存数组
           this.setData({
             fileID:ids
           })
          //5.5追加任务列表
          reslove();
        },
        //5.6失败显示失败信息
        fail:err=>{
          console.log(err)
        } 
      })      
      }));
    }
    //6.一次性将图片fileID保存集合中[集合中一条记录]
    Promise.all(promiseArr).then(res=>{
      //6.1添加数据
      db.collection('comment').add({
        data:{
          content:this.data.content,  //评论的内容
          score:this.data.score,      //评论的分数
          movieid:this.data.movieid,  //电影id
          fileID:this.data.fileID     //上传图片id
        }
      }).then(res=>{
        wx.hideLoading(); //隐藏加载框
        wx.showToast({  //显示提示框
          title: '评价成功!',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价失败..',
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.接收电影列表传递参数id并且保存data
    this.setData({
      movieid:options.id
    })
    console.log(options.id);
    //2.提示数据加载框
    wx.showLoading({
      title: '加载中...'
    })
    //3.调云函数，将电影id传递给云函数
    wx.cloud.callFunction({
      name:'getDetail',
      data:{movieid:options.id}
    })
    .then(res=>{
      //4.获取云函数返回的数据并且保存在data中    
        //console.log(res);
        //4.1将字符串转为js  obj   
        var obj=JSON.parse(res.result);
        //4.2保存data
        this.setData({
          detail:obj
        })
        //5.隐藏加载框
        wx.hideLoading()
      })
    .catch(err=>{console.log(err)})   
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