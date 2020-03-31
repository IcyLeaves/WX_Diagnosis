var appInst =  getApp();

// pages/my/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    iconUrl: {
      bind: "/icons/bind.png"
    },
    isBinded:'',
    isHide:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isBinded:appInst.globalData.myOpenId
    })
  },
  confirmLogOut: function () {
    this.setData({
      show: true
    })
  },
  onLogOutConfirm: function () {
    wx.reLaunch({
      url: '/pages/login/login',
      success: (result) => {
        appInst.globalData.myOpenId='';
        appInst.globalData.myUserId=-1;
      },
      fail: () => {},
      complete: () => {}
    });
  },
  bindGetUserInfo:function(res){
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      console.log("OpenId为");
      console.log(appInst.globalData.myOpenId);
      wx.request({
        url: appInst.globalData.myHost + "bind/",
        method: "POST",
        data: {
          userid: appInst.globalData.myUserId,
          openid: appInst.globalData.myOpenId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          if (res.data.msg=='success') {
            //绑定成功
            wx.navigateTo({
              url:'/pages/login/bind',
            })
          } else if(res.data.msg=='exist') {
            // 如果是已有帐户，禁止绑定
            appInst.globalData.myUserId = res.data.userid;
            console.log("已有帐户id："+appInst.globalData.myUserId)
  
            wx.switchTab({
              url: '/pages/index/index',
              fail: (res) => {
                console.log(res)
              },
              success: (res) => {
                console.log(res)
              }
            })
          }
          
        }
      });

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，小程序部分功能将无法访问！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      })
    }
  },
  onLogOutCancel: function (e) {
    this.selectComponent('#halfDialog').close(e);
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