// pages/my/my.js
var app = getApp()

const COUNTS_URL = app.globalData.prefix_url + 'order/count.do'



Page({
  data: {
    userInfo: app.globalData.userInfo,
    mytakeworking: 0,
    myworking: 0,
    mytakedone: 0,
    platUserInfo: app.globalData.platUserInfo
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    this.setData({
      userInfo: userInfo
    });
    this.getMsg();
    this.getCounts();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getCounts();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showLoading({
      "title": "加载中",
      "mask": true,
      "success": function () {
        setTimeout(function () {
          wx.stopPullDownRefresh();
          wx.hideLoading();
        }, 2000)
      }
    })

  },
  onShareAppMessage: function () {
    return {
      title: '无敌率真的超级帅哥的个人中心',
      path: '/pages/my/my',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  msg: function () {
    wx.navigateTo({
      'url': "/pages/msgOrder/msgOrder"
    })
  },
  qianbao: function () {
    wx.navigateTo({
      'url': "/pages/balance/balance"
    })
  },
  validation: function () {
    wx.navigateTo({
      'url': "/pages/validationStatus/validationStatus"
    })
  },
  we: function () {
    wx.navigateTo({
      url: '/pages/guanyuwomen/guanyuwomen',
    })
  },
  orderManager: function () {
    wx.navigateTo({
      url: "/pages/orderManager/orderManager?pageCode=" + 'send',
    })
  },
  getMsg() {
    var that = this;
    wx.request({
      url: 'https://api.wnschool.cn/user-getCount',
      data: {
        "user.id": that.data.userInfo.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({ "count": res.data });
      }
    });
  },
  checkOrder: function (arg) {
    let pageCode = arg.currentTarget.dataset.page;

    // 跳转页面
    wx.navigateTo({
      url: '/pages/orderManager/orderManager?page=' + pageCode
    });
  },
  /*
      获取订单数目
   */
  getCounts: function () {
    let that = this

    wx.request({
      url: COUNTS_URL,
      data: {
        id: wx.getStorageSync('platUserInfo').id
      },
      success: function (res) {
        if (res.data.state) {
          that.setData({
            mytakeworking: res.data.data.mytakeworking,
            myworking: res.data.data.myworking,
            mytakedone: res.data.data.mytakedone
          })
        }
      }
    })
  },
  payVip: function () {
    wx.navigateTo({ url: '/pages/vip/vip' })
  },
  feedback: function () {
    wx.makePhoneCall({
      phoneNumber: '18136440061' //仅为示例，并非真实的电话号码
    })
  }

})