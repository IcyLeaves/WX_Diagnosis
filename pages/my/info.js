var myValidate= require('../../utils/info-form-validate.js')


const validateId=function(rule,value,param,models){
  if (typeof(value) == undefined || value == null || value == "") return "身份证必填";
  if (!myValidate.checkIDCard(value))
  {
    return "身份证格式错误";
  }
  else {
    return null;
  }
}
// pages/my/info.js
Page({
  data: {
    showTopTips: false,

    isAgree: false,
    date: "",

    nations: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
    "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
    "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
   "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"],
    nationIndex: 0,

    familyDisease:["无","有"],
    familyDiseaseIndex:0,

    marriage:["未婚","已婚"],
    marriageIndex:0,

    currentZone:'',

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
    },{
      name: 'careId',
      rules: {
        required: true,
        message: '医疗卡号必填'
      },
    },{
      name:'sex',
      rules:{}
    },{
      name:'age',
      rules:{}
    },{
      name:'tel',
      rules:[{
        required:true,
        message:'联系电话必填'
      },{
        mobile:true,
        message:'联系电话格式错误'
      }]
    },{
      name:'emergencyTel',
      rules:[{
        required:true,
        message:'紧急联系方式必填'
      },{
        mobile:true,
        message:'紧急联系方式格式错误'
      }]
    }],

    // 额外内容
    // 1.是否填了身份证号，填完后马上校验，校验成功则显示出生日期和性别和年龄
    isIdCorrect: false
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

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
      [`formData.checkbox`]: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  formInputChange:function(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  //身份证号码改变时且校验成功，则设置年龄，出生日期，性别
  idInputChange:function(e){
    this.formInputChange(e);
    if(myValidate.checkIDCard(e.detail.value))
    {
      this.setData({
        [`formData.sex`]:myValidate.getSex(e.detail.value),
        [`formData.age`]:myValidate.getAge(e.detail.value),
        date:myValidate.getDate(e.detail.value),
        isIdCorrect: true
      })
    }
    else
    {
      this.setData({
        isIdCorrect: false
      })
    }
  },
  nationIndexChange: function (e) {
    this.setData({
      nationIndex: e.detail.value
    })
  },
  regionChange: function (e) {
    this.setData({
      currentZone: e.detail.value
    })
  },
  marriageIndexChange: function (e) {
    this.setData({
      marriageIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
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
        wx.showToast({
          title: '校验通过'
        })
      }
    })
  }

})