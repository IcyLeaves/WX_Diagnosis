// pages/signup.js
var appInst =  getApp();
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
    }, {
      name: 'password',
      rules: [{
        required: true,
        message: '请填写密码'
      }, {
        minlength: 4,
        message: '密码不能少于4位'
      }, {
        maxlength: 16,
        message: '密码不能多于16位'
      }]
    }, {
      name: 'confirmPassword',
      rules: [{
        required: true,
        message: '请确认密码'
      }, {
        equalTo: 'password',
        message: '两次密码不一致'
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
        var that = this;
        that.isSigned();

        //如果用户名密码正确

      }
    })
  },
  isSigned: function () {
    var that = this;
    var username = that.data.formData['username'];
    var password = that.data.formData['password'];
    console.log(username, password)
    wx.request({
      url: appInst.globalData.myHost + "signup/",
      method: "POST",
      data: {
        username: username,
        password: password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.msg == 'signed') {
          wx.showToast({
            title: '注册成功'
          })
          wx.reLaunch({
            url: '/pages/login/login',
          })
        } else {
          that.setData({
            error: '用户名已存在'
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        console.log('complete')
      }
    });

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