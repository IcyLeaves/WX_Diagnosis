var staticData = require('../../../utils/static-data.js')
var itemHeight = 83; //rpx
var panelHeight = 251; //rpx
var singlePanelHeight = 100; //rpx
var appInst = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: {
      blood: '/icons/blood.png',
      calendar: '/icons/calendar.png',
      num: '/icons/num.png',
      append: '/icons/append.png',
      remove: '/icons/remove.png',
      arrow: '/icons/arrow.png'
    },

    topNum: -1,

    navbar: ['个人信息', '问诊信息', '检查报告', '报告查看'],
    currentTab: 0,

    //页面0
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

    //页面1
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
    rules1: [{
      name: 'feature',
      rules: {}
    }, {
      name: 'diabeteTypeIndex',
      rules: {}
    }],

    //页面2
    arrayIndex: [0, 0, 0],
    panelArray: [{
      id: 0,
      name: "糖化血红蛋白",
      isshow: true
    }, {
      id: 1,
      name: "胰岛素",
      isshow: true
    }, {
      id: 2,
      name: "血糖",
      isshow: true
    }],
    birthYear: 1998,
    yearRange: ['请选择'],
    monthRange: ['请选择', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    bloodArray: [
      [],
      [],
      []
    ],
  },
  panelItemAnimate: function (panelIndex) {
    //面板高度动态滑动动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
      delay: 0
    });
    var itemCount = this.data.bloodArray[panelIndex].length; //指定面板的元素个数
    var changedHeight = panelHeight + itemHeight * itemCount;
    animation.height(`${changedHeight}rpx`).step();
    this.setData({
      [`panelArray[${panelIndex}].panelAnimate`]: animation.export()
    })
  },
  // itemAnimate: function (panelIndex, itemIndex) {
  //   //上移动画
  //   let animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: 'ease-in',
  //     delay: 0,
  //   });
  //   animation.translateY(`-${itemHeight}rpx`).step();

  //   var bloodList = this.data.bloodArray[panelIndex];
  //   while (itemIndex < bloodList.length-1) {
  //     this.setData({
  //       [`bloodArray[${panelIndex}][${itemIndex}].animate`]: animation.export()
  //     })
  //     itemIndex += 1;
  //   }

  // },
  //isShow为终点时的显示状态，false为收缩，true为展开
  arrowAnimate: function (isShow, panelIndex) {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    var panelAnimation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    if (isShow == false) {
      animation.rotate(180).step();
      console.log("转动180度");
      panelAnimation.height(`${singlePanelHeight}rpx`).step();
    } else {
      animation.rotate(0).step();
      console.log("转动0度");
      var itemCount = this.data.bloodArray[panelIndex].length; //指定面板的元素个数
      var changedHeight = panelHeight + itemHeight * itemCount;
      panelAnimation.height(`${changedHeight}rpx`).step();
    }

    this.setData({
      [`panelArray[${panelIndex}].isshow`]: isShow,
      [`panelArray[${panelIndex}].arrowAnimate`]: animation.export(),
      [`panelArray[${panelIndex}].panelAnimate`]: panelAnimation.export()
    })
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
        if (res.statusCode==404) {
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
        } else {
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
        }
      }
    })

  },
  onShow: function (options) {
    // birthYear 赋值
    var start = this.data.birthYear;
    var now = new Date();

    var oldYearRange = this.data.yearRange;
    if (oldYearRange.length == 1) {
      for (let i = start + 1; i <= now.getFullYear(); i++) {
        oldYearRange.push(i);
      }

      this.setData({
        yearRange: oldYearRange
      })
    }


  },
  form1InputChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData1.${field}`]: e.detail.value
    })
  },
  form2InputChange: function (e) {
    const {
      field,
      panelindex,
      id
    } = e.currentTarget.dataset
    var value = e.detail.value;
    if (field == "year") {
      value = this.data.birthYear + parseInt(value);
    }
    this.setData({
      [`bloodArray[${panelindex}][${id}].${field}`]: value,
      [`bloodArray[${panelindex}][${id}].errorClass`]: '',
      error:''
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
  submitForm2() {
    
    if (!this.validateForm2()) {
      this.setData({
        error:"指标格式错误"
      })
    } else {
      this.setData({
        currentTab: 3,
        topNum: 0
      });
    }

  },
  validateForm2:function(){
    var oldBloodArray=this.data.bloodArray;
    var isOk=true;
    for(let i=0;i<oldBloodArray.length;i++)
    {
      for(let j=0;j<oldBloodArray[i].length;j++)
      {
        var temp=Number(oldBloodArray[i][j].num);
        if(temp!=NaN && temp>=0)
        {
          oldBloodArray[i][j].num=temp;
        }
        else 
        {
          isOk=false;
          oldBloodArray[i][j].errorClass="num-table-item-input-error"
        }
      }
    }
    this.setData({
      bloodArray: oldBloodArray
    })
    return isOk;
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
    if (this.data.currentTab >= e.currentTarget.dataset.idx) {
      this.setData({
        currentTab: e.currentTarget.dataset.idx,
        topNum: 0
      })
    }


    //全局变量
    //app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  changeVisible: function (e) {
    var {
      panelindex
    } = e.currentTarget.dataset;
    var oldShow = this.data.panelArray[panelindex].isshow;
    if (oldShow == false) {
      this.arrowAnimate(true, panelindex);
    } else {
      this.arrowAnimate(false, panelindex);
    }
  },
  createNewData: function (e) {
    var panelIndex = e.currentTarget.dataset.panelindex;
    var oldIndex = this.data.arrayIndex[panelIndex];
    var oldBlood = this.data.bloodArray[panelIndex];
    var now = new Date();
    //console.log(`bloodArray[${panelIndex}]`);
    //console.log(this.data.bloodArray[0])
    //console.log(e);
    var temp = {
      id: oldIndex,
      year: now.getFullYear(),
      month: 1,
      num: -1
    };

    oldBlood.push(temp);
    oldIndex += 1;
    //console.log(oldBlood)
    this.setData({
      [`bloodArray[${panelIndex}]`]: oldBlood,
      [`arrayIndex[${panelIndex}]`]: oldIndex
    });
    this.panelItemAnimate(panelIndex);
  },
  removeData: function (e) {

    var panelIndex = e.currentTarget.dataset.panelindex; //所在面板
    var idx = e.currentTarget.dataset.id; //被删除的id
    var oldBlood = this.data.bloodArray[panelIndex]; //原来的数据

    oldBlood.splice(idx, 1);

    this.setData({
      [`bloodArray[${panelIndex}]`]: oldBlood
    })
    this.panelItemAnimate(panelIndex)
  }
})