// pages/detail/detail.js
var app = getApp()

const DOMAIN_URL = app.globalData.prefix_url

const DETAIL_URL = DOMAIN_URL+ 'work/listdoc.do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix_url: app.globalData.prefix_url,
    //当前选中的Tab项
    detail:[
      { "type": "0", iconUrl: "/image/icon/1.png","remark": "01", fileType:"0","submitor": "张三", "url": "/docs/1.pdf","sort":"2班"},
      { "type": "1", iconUrl: "/image/icon/1.png","remark": "02", fileType:"0","submitor": "李四", "url": "/docs/2.docx", "sort":"1班"},
      { "type": "2", iconUrl: "/image/icon/1.png","remark": "03", fileType:"0","submitor": "王五", "url": "/docs/3.pptx", "sort":"3班"},
      { "type": "0", iconUrl: "/image/icon/1.png","remark": "04", fileType:"0", "submitor": "赵六", "url": "/docs/4.zip", "sort":"4班"},
      { "type": "2", iconUrl: "/image/icon/1.png","remark": "05", fileType:"0", "submitor": "石七", "url": "/docs/5.xlsx", "sort":"2班"} 
    ],
    _method: 'detail',
    _app: app,
    catIds:0,
    //跳转显示页面的类型
    method:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let pose = options.detail

    console.log('detail的pose' + pose)
    this.data.catIds=--pose
    
    this.setData({
      detail: that.data.data,
      catIds:++this.data.catIds
    })

    wx.request({
      url: DETAIL_URL,
      data: {
        pose:pose
      },
      success: function (res) {
        let state = res.data.state

        if (state) {
          that.setData({
            detail: res.data.data
          })
        } else {
          wx.showToast({
            title: '网络繁忙',
            duration: 2000,
            icon: 'none'
          })
        }
      }, fail: function () {
        wx.showToast({
          title: '网络繁忙',
          duration: 2000,
          icon: 'none'
        })
      }
    })
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
  opendocs:function(e){
    console.log(e.currentTarget.dataset.pos);
    console.log(this.data.method);
    let fileType = e.currentTarget.dataset.pos
    let method = this.data.method

    wx.navigateTo({
      url: '/pages/download/download?method='+method
    });
    
    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: '/docs/1.pdf',
    //   success(res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath,
    //       success(res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
  }
})