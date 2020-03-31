var appInst=getApp();
//app.js
App({
  onLaunch: function () {
    var that=this;
   
     // 登录
     wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.myHost+'getOpenId/',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              console.log(res);
              //openId获取成功
              if (res.statusCode == 200) {
                that.globalData.myOpenId=res.data.openid;
              } else {
                console.log(res)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.data.errMsg)
        }
      }
    });
    wx.getSetting({
      success: (res) => {
        console.log("app加载，授权信息如下:")
        console.log(res)
        if (res.authSetting['scope.userInfo'] == true) {
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/enter/enter',
          })
        }
      },
    });

  },
  globalData: {
    myHost:"http://127.0.0.1:8000/",
    myOpenId:'',
    myUserId:-1,
    userInfo:null
  }
})