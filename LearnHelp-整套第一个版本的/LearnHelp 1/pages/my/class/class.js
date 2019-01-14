// pages/my/class/class.js
var app = getApp()
var util = require('../../../utils/util.js')

const SIGN_UP_INFO = app.globalData.prefix_url + 'user/saveclazz.do'

Page({
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
  // 搜索校区input 组件输入动作
  inputMethod:function(arg){
    let that = this

    let value = arg.detail.value
    let currentIndex = that.data.currentIndex

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
  // 移动选择框
  moveChoser:function(distance){
    let that = this

    var animation = wx.createAnimation({
      delay:0,
      duration:500
    })

    let width = app.globalData.width
    let translate = width * distance

    animation.translate(-translate).step()
    that.setData({
      choserAnimation:animation.export(),
      currentIndex:distance
    })
  },
  chooseSchool:function(arg){
    let that = this
    let index = parseInt(arg.currentTarget.dataset.index)
    that.moveChoser(index)
    let school = arg.currentTarget.dataset.school
    this.setData({
      chosenSchool:school
    })
  },
  chooseDepartment:function(arg){
    let that = this
    let index = parseInt(arg.currentTarget.dataset.index)
    that.moveChoser(index)
    let department = arg.currentTarget.dataset.department
    this.setData({
      chosenDepartment:department
    })
  },
  chooseMajor:function(arg){
    let that = this
    let index = parseInt(arg.currentTarget.dataset.index)
    that.moveChoser(index)
    let major = arg.currentTarget.dataset.major
    this.setData({
      chosenMajor:major
    })
  },
  // 
  finishChose:function(arg){
    let that = this
    let chosenSchool = that.data.chosenSchool
    let chosenDepartment = that.data.chosenDepartment
    let chosenMajor = that.data.chosenMajor
    if(!chosenSchool){
      that.moveChoser(0)
    }else if(!chosenDepartment){
      that.moveChoser(1)
    }else if(!chosenMajor){
      that.moveChoser(2)
    }else{
      let clazz = arg.currentTarget.dataset.clazz
      that.data.chosenClazz = clazz
      that.signClazz()
    }
  },
  //
  buttonMove:function(arg){
    let that = this
    let index = parseInt(arg.currentTarget.dataset.index)
    that.moveChoser(index)
  },
  // 学生保存自己的所在班级信息
  signClazz:function(){
    let that = this
    wx.request({
      url:SIGN_UP_INFO,
      data:{
        school:that.data.chosenSchool,
        department:that.data.chosenDepartment,
        major:that.data.chosenMajor,
        clazz:that.data.chosenClazz,
        id:app.globalData.platUserInfo.id,
        auth_identityId:app.globalData.platUserInfo.id,
        auth_openid:'otgaf4t7Hj70-r9NO55YIB8zimco'
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        if(res.data.state){
          util.showMsg('已注册','success')
        }else{
          util.showMsg(res.data.message,'none')
        }
      }
    })
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
  /**
   * 页面的初始数据
   */
  data: {
    school:[
      
    ],
    department:[
      
    ],
    major:[
      
    ],
    clazz:[
      
    ],
    //移动选择面板的动画
    choserAnimation:{},
    // 当前页面索引
    currentIndex:0
  }
})