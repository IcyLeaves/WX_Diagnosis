var myValidate = require('../../utils/info-form-validate.js')
var staticData=require('../../utils/static-data.js')

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
  // Page展示前调用
  onReady: function (options) {
    var isCorrect=myValidate.checkIDCard(appInst.globalData.userTable['id']);
    //提取表单数据
    this.setData({
      ['formData.name']: appInst.globalData.userTable['name'],
      ['formData.sex']: appInst.globalData.userTable['sex'],
      ['formData.age']: appInst.globalData.userTable['age'],
      ['formData.careId']: appInst.globalData.userTable['careId'],
      ['formData.id']: appInst.globalData.userTable['id'],
      ['formData.tel']: appInst.globalData.userTable['tel'],
      ['formData.emergencyName']: appInst.globalData.userTable['emergencyName'],
      ['formData.emergencyTel']: appInst.globalData.userTable['emergencyTel'],
      ['formData.region']: appInst.globalData.userTable['region'],
      ['formData.address']: appInst.globalData.userTable['address'],
      ['formData.nationIndex']: appInst.globalData.userTable['nationIndex'],
      ['formData.date']: appInst.globalData.userTable['birthday'],
      ['formData.familyDiseaseIndex']: appInst.globalData.userTable['familyDiseaseIndex'],
      ['formData.marriageIndex']: appInst.globalData.userTable['marriageIndex'],
      isIdCorrect:isCorrect
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
        //保存表单数据
        appInst.globalData.userTable['name'] = this.data.formData['name'];
        appInst.globalData.userTable['sex'] = this.data.formData['sex'];
        appInst.globalData.userTable['age'] = this.data.formData['age'];
        appInst.globalData.userTable['careId'] = this.data.formData['careId'];
        appInst.globalData.userTable['id'] = this.data.formData['id'];
        appInst.globalData.userTable['tel'] = this.data.formData['tel'];
        appInst.globalData.userTable['emergencyName'] = this.data.formData['emergencyName'];
        appInst.globalData.userTable['emergencyTel'] = this.data.formData['emergencyTel'];
        appInst.globalData.userTable['region'] = this.data.formData['region'];
        appInst.globalData.userTable['address'] = this.data.formData['address'];
        appInst.globalData.userTable['nationIndex'] = this.data.formData['nationIndex'];
        appInst.globalData.userTable['birthday'] = this.data.formData['date'];
        appInst.globalData.userTable['familyDiseaseIndex'] = this.data.formData['familyDiseaseIndex'];
        appInst.globalData.userTable['marriageIndex'] = this.data.formData['marriageIndex'];
        console.log(appInst.globalData);
        wx.showToast({
          title: '保存成功'
        })
      }
    })
  }

})