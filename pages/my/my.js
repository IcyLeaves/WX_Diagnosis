// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo:{
      headImgUrl:"",//用户头像
      nickName:"",//用户昵称
    }

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户信息
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          'userInfo.headImgUrl': res.userInfo.avatarUrl,
          'userInfo.nickName':res.userInfo.nickName,
      })
      }
    })
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