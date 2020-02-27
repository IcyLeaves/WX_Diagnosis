// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {

    },
    formRules: [{
      name: 'username',
      rules: {
        required: true,
        message: '请填写用户名'
      }
    },{
      name:'password',
      rules:[{
        required:true,
        message:'请填写密码'
      },{
        minlength:4,
        message:'密码不能少于4位'
      },{
        maxlength:16,
        message:'密码不能多于16位'
      }]
    }]
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindGetUserInfo: function (res) {
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
      wx.switchTab({
        url: '/pages/index/index',
        fail:(res)=>{
          console.log(res)
        },
        success:(res)=>{
          console.log(res)
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
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
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        var that=this;
        //如果用户名密码正确
        if(that.isAuthorized())
        {
          wx.showToast({
            title: '登录成功'
          })
          wx.switchTab({
            url: '/pages/index/index',
            fail:(res)=>{
              console.log(res)
            },
            success:(res)=>{
              console.log(res)
            }
          })
        }
        else
        {
          this.setData({
            error: '用户名或密码错误'
          })
        }
      }
    })
  },
  isAuthorized:function(){
    var that=this;
    var username=that.data.formData['username'];
    var password=that.data.formData['password'];
    if(username=='123' && password=='1234')
    {
      return true;
    }
    return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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