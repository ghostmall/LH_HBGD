// pages/my/lesson/lesson.js
var app = getApp()

const SAVE_LESSON_INFO = app.globalData.prefix_url + 'work/savelesson.do'

var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choserDisplay:[
      0,0,0,0
    ],
    inputValues:[
      '','','',''
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initClazzInfo()
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

  },
  //  初始化clazzinfo信息列表
  initClazzInfo:function(){
    let that = this
    let clazzInfo = app.globalData.clazzInfo
    that.setData({
      school:clazzInfo.school,
      department:clazzInfo['department'],
      major:clazzInfo['major'],
      clazz:clazzInfo['clazz'],
      clazzInfo:clazzInfo
    })
  },
  //  显示clazzinfo输入提示
  choserTip:function(arg){
    let index = parseInt(arg.currentTarget.dataset.index)
    let that = this

    let choserDisplay = that.data.choserDisplay
    for(let i=0;i<choserDisplay.length;i++){
      choserDisplay[i] = 0
    }
    choserDisplay[index] = 1

    that.setData({
      choserDisplay:choserDisplay
    })
  },
  // 隐藏clazzinfo输入提示
  hideTip:function(arg){
    let that = this
    let choserDisplay = that.data.choserDisplay
    for(let i=0;i<choserDisplay.length;i++){
      choserDisplay[i] = 0
    }
    that.setData({
      choserDisplay:choserDisplay
    })
  },
  // 选择clazzinfo
  chooseItem:function(arg){
    let that = this
    let type = parseInt(arg.currentTarget.dataset.type)
    let item = arg.currentTarget.dataset.item

    var inputValues = that.data.inputValues
    switch(type){
      case 0:
        inputValues[0] = item
        that.setData({
          chosenSchool:item,
          inputValues:inputValues
        })
        break;
      case 1:
        inputValues[1] = item
        that.setData({
          chosenDepartment:item,
          inputValues:inputValues
        })
        break;
      case 2:
        inputValues[2] = item
        that.setData({
          chosenMajor:item,
          inputValues:inputValues
        })
        break;
      case 3:
        inputValues[3] = item
        that.setData({
          chosenClazz:item,
          inputValues:inputValues
        })
        break;
    }
  },
  // 搜索校区input 组件输入动作
  inputMethod:function(arg){
    let that = this

    that.synchronizeInput(arg)

    let value = arg.detail.value
    let currentIndex = parseInt(arg.currentTarget.dataset.index)

    if(value){
      var regex = new RegExp("(" + value + ")+")
      let list = new Array()

      switch(currentIndex){
        case 0:
          let school = that.data.clazzInfo.school
          for(var i=0;i<school.length; i++){
            if(regex.test(school[i])){
              list.push(school[i])
            }
          }
          that.setData({
            school:list
          })
          break;
        case 1:
          let department = that.data.clazzInfo.department
          for(var i=0;i<department.length; i++){
            if(regex.test(department[i])){
              list.push(department[i])
            }
          }
          that.setData({
            department:list
          })
          break;
        case 2:
          let major = that.data.clazzInfo.major
          for(var i=0;i<major.length; i++){
            if(regex.test(major[i])){
              list.push(major[i])
            }
          }
          that.setData({
            major:list
          })
          break;
        case 3:
          let clazz = that.data.clazzInfo.clazz
          for(var i=0;i<clazz.length; i++){
            if(regex.test(clazz[i])){
              list.push(clazz[i])
            }
          }
          that.setData({
            clazz:list
          })
          break;
      }
    }else{
      that.initClazzInfo()
    }
  },
  // 同步input数据
  synchronizeInput:function(arg){
    let that = this
    let value = arg.detail.value
    let inputValues = that.data.inputValues
    let index = parseInt(arg.currentTarget.dataset.index)
    inputValues[index] = value
    that.setData({
      inputValues:inputValues
    })
  },
  //  保存数据
  saveLessonInfo:function(e){
    let formData = e.detail.value
    formData.teacherId = app.globalData.platUserInfo.id
    formData.auth_teacherId = app.globalData.platUserInfo.id

    wx.request({
      url:SAVE_LESSON_INFO,
      data:formData,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        if(res.data.state){
          util.showMsg('已保存','sucess')
        }else{
          util.showMsg(res.data.message,'none')
        }
      },fail:function(){
        util.showMsg('网络繁忙','none')
      }
    })
  }
})