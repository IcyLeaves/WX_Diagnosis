var myValidate = require('../../utils/info-form-validate.js')
var staticData = require('../../utils/static-data.js')

const validateId = function (rule, value, param, models) {
  if (typeof (value) == undefined || value == null || value == "") return "身份证必填";
  if (!myValidate.checkIDCard(value)) {
    return "身份证格式错误";
  } else {
    return null;
  }
}

var appInst = getApp();

// pages/my/info.js
Page({
  data: {
    showTopTips: false,

    nations: staticData.nations,
    familyDisease: ["无", "有"],
    marriage: ["未婚", "已婚"],

    formData: {

    },
    rules: [{
      name: 'name',
      rules: {
        required: true,
        message: '姓名必填'
      },
    }, {
      name: 'id',
      rules: {
        validator: validateId
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

    // 额外内容
    // 1.是否填了身份证号，填完后马上校验，校验成功则显示出生日期和性别和年龄
    isIdCorrect: false
  },
  //取地区index

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
        if (res.statusCode == 200) {
          var isCorrect = myValidate.checkIDCard(res.data['idcard']);
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
            isIdCorrect: isCorrect
          })
        }
      }
    })

  },
  // radioChange: function (e) {
  //   console.log('radio发生change事件，携带value值为：', e.detail.value);

  //   var radioItems = this.data.radioItems;
  //   for (var i = 0, len = radioItems.length; i < len; ++i) {
  //     radioItems[i].checked = radioItems[i].value == e.detail.value;
  //   }

  //   this.setData({
  //     radioItems: radioItems,
  //     [`formData.radio`]: e.detail.value
  //   });
  // },
  // checkboxChange: function (e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value);

  //   var checkboxItems = this.data.checkboxItems,
  //     values = e.detail.value;
  //   for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
  //     checkboxItems[i].checked = false;

  //     for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
  //       if (checkboxItems[i].value == values[j]) {
  //         checkboxItems[i].checked = true;
  //         break;
  //       }
  //     }
  //   }

  //   this.setData({
  //     checkboxItems: checkboxItems,
  //     [`formData.checkbox`]: e.detail.value
  //   });
  // },
  // bindDateChange: function (e) {
  //   this.setData({
  //     date: e.detail.value,
  //     [`formData.date`]: e.detail.value
  //   })
  // },
  formInputChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  //身份证号码改变时且校验成功，则设置年龄，出生日期，性别
  idInputChange: function (e) {
    this.formInputChange(e);
    if (myValidate.checkIDCard(e.detail.value)) {
      this.setData({
        [`formData.sex`]: myValidate.getSex(e.detail.value),
        [`formData.age`]: myValidate.getAge(e.detail.value),
        [`formData.date`]: myValidate.getDate(e.detail.value),
        isIdCorrect: true
      })
    } else {
      this.setData({
        isIdCorrect: false
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
        var that = this;
        console.log("表单数据如下:")
        console.log(that.data.formData)
        wx.request({
          url: appInst.globalData.myHost + 'updatePatientInfo/',
          method: 'POST',
          data: {
            userid: appInst.globalData.myUserId,
            info:{
              name: that.data.formData['name'],
              careid: that.data.formData['careId'],
              idcard: that.data.formData['id'],
              birthday: that.data.formData['date'],
              gender: that.data.formData['sex'] == '男' ? 'M' : 'W',
              age: that.data.formData['age'],
              nation: staticData.nations[that.data.formData['nationIndex']],
              tel: that.data.formData['tel'],
              emername: that.data.formData['emergencyName'],
              emertel: that.data.formData['emergencyTel'],
              familydisease: Number(that.data.formData['familyDiseaseIndex']) == 0 ? 'N' : 'Y',
              marriage: Number(that.data.formData['marriageIndex']) == 0 ? 'N' : 'Y',
              region: that.data.formData['region'][0] + ' ' +
                that.data.formData['region'][1] + ' ' +
                that.data.formData['region'][2],
              address: that.data.formData['address'],
            }
            
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res)
          }
        })
        wx.showToast({
          title: '保存成功'
        })
      }
    })
  }

})