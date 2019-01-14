//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //获取设备屏幕的大小
    let obj = wx.getSystemInfoSync();
    this.globalData.width = obj.windowWidth;
    this.globalData.height = obj.windowHeight;

    this.getClazzInfo()
  },
  // 获取到所有的clazz信息
  getClazzInfo:function(){
    let that = this
    wx.request({
      url:that.globalData.prefix_url + 'clazz/list.do',
      method:'POST',
      success:function(res){
        if(res.data.state){
          let clazzInfo = res.data.data
          that.globalData.clazzInfo = clazzInfo
        }
      }
    })
  },
  globalData: {
    userInfo:{},
    platUserInfo:{
      id:1
    },
    width:0,
    height:0,
    type:[
      '文档汇总',
      '优秀文档',
      '学习文档'
    ],
    typeimg:[
       'all',
       'excellent',
       'learning'
    ],
    prefix_url: 'http://localhost:8080/lhms_war_exploded/',
    // 用户openid
    openid:1
  }
})