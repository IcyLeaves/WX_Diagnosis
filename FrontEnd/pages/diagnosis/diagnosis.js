var staticData = require('../../utils/static-data.js')

var appInst = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNum: -1,

    navbar: ['个人信息', '问诊信息', '检查报告', '报告查看'],
    currentTab: 0,

    //表单相关
    showTopTips: false,
    nations: staticData.nations,
    familyDisease: ["无", "有"],
    marriage: ["未婚", "已婚"],

    formData: {},
    rule0: [{
      name: 'name',
      rules: {
        required: true,
        message: '姓名必填'
      },
    }, {
      name: 'id',
      rules: {
        
      },
    }, {
      name: 'careId',
      rules: {
        required: true,
        message: '医疗卡号必填'
      },
    }, {
      name: 'sex',
      rules: {}
    }, {
      name: 'age',
      rules: {}
    }, {
      name: 'tel',
      rules: [{
        required: true,
        message: '联系电话必填'
      }, {
        mobile: true,
        message: '联系电话格式错误'
      }]
    }, {
      name: 'emergencyTel',
      rules: [{
        required: true,
        message: '紧急联系方式必填'
      }, {
        mobile: true,
        message: '紧急联系方式格式错误'
      }]
    }, {
      name: 'emergencyName',
      rules: {}
    }, {
      name: 'region',
      rules: {}
    }, {
      name: 'nationIndex',
      rules: {}
    }, {
      name: 'date',
      rules: {}
    }, {
      name: 'familyDiseaseIndex',
      rules: {}
    }, {
      name: 'marriageIndex',
      rules: {}
    }, {
      name: 'address',
      rules: {}
    }],


    diabeteType: ["1型糖尿病", "2型糖尿病", "不清楚"],
    checkboxItems: [{
        name: '多饮多尿',
        value: '0'
      },
      {
        name: '多食',
        value: '1'
      },
      {
        name: '消瘦',
        value: '2'
      },
      {
        name: '肥胖',
        value: '3'
      },
      {
        name: '疲乏无力',
        value: '4'
      }
    ],
    formData1: {
      diabeteTypeIndex: 0
    },
    rules1:[{
      name:'feature',
      rules:{}
    },{
      name:'diabeteTypeIndex',
      rules:{}
    }]
  },
  // Page展示前调用
  onReady: function (options) {
    var that = this;
    wx.request({
      url: appInst.globalData.myHost + 'getPatientInfo/' + appInst.globalData.myUserId + '/',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        //转化表单中的region，按空格分割字符串
        var regionList = new Array();
        regionList = res.data['region'].split(" ");
        //转化表单中的nation，查找index
        var nationIndex = staticData.getNationIndex(res.data['nation']);
        //提取表单数据
        that.setData({
          ['formData.name']: res.data['name'],
          ['formData.sex']: res.data['gender'] == 'M' ? '男' : '女',
          ['formData.age']: res.data['age'],
          ['formData.careId']: res.data['careid'],
          ['formData.id']: res.data['idcard'],
          ['formData.tel']: res.data['tel'],
          ['formData.emergencyName']: res.data['emername'],
          ['formData.emergencyTel']: res.data['emertel'],
          ['formData.region']: regionList,
          ['formData.address']: res.data['address'],
          ['formData.nationIndex']: nationIndex,
          ['formData.date']: res.data['birthday'],
          ['formData.familyDiseaseIndex']: res.data['familydisease'] == 'Y' ? 1 : 0,
          ['formData.marriageIndex']: res.data['marriage'] == 'N' ? 0 : 1,
        })
        if (res.data['age'] <= 0) {
          wx.showModal({
            title: '提示',
            content: '进行辅助诊断需要完善个人信息，是否现在去完善？',
            confirmText: '现在就去',
            cancelText: '暂不完善',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.redirectTo({
                  url: '/pages/my/info'
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
    
    
  },
  form1InputChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData1.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.setData({
      currentTab: 1,
      topNum: 0
    });
  },
  submitForm1() {
    this.selectComponent('#form1').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        this.setData({
          currentTab: 2,
          topNum: 0
        });
      }
    })
  },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      [`formData1.feature`]: e.detail.value
    });
  },
  //点击切换，滑块index赋值
  navbarSwitch: function (e) {
    if (this.data.currentTab >= e.currentTarget.dataset.idx)
      this.setData({
        currentTab: e.currentTarget.dataset.idx,
        topNum: 0
      })

    //全局变量
    //app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
})