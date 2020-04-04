var appInst =  getApp();

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.request({
  url: appInst.globalData.myHost+'login/',
  method:'POST',
  data:{
    openid:appInst.globalData.myOpenId
  },
  header: {
    'Content-Type': 'application/json'
  },
  success: function(res) {
    console.log(res);
    appInst.globalData.myUserId=res.data.userid;
  }
})
  },
  onDiagnosisBtnClick: function (btn) {
    wx.navigateTo({
      url: '/pages/patient/diagnosis/diagnosis',
      success: (result) => {
        console.log("重定向成功")
      },
      fail: (msg) => {
        console.log(msg)
      },
      complete: () => {}
    });
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
    wx.hideHomeButton();
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