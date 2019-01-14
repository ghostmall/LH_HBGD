// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    professional: [
      { id: '1', name: '软件工程' },
      { id: '1', name: '计算机科学与技术' },
      { id: '2', name: '电子信息工程' },
      { id: '3', name: '网络工程' },
      { id: '4', name: '物联网工程' },
      { id: '5', name: '英语' },
      { id: '6', name: '工商工程' },
      { id: '7', name: '工程管理' },
      { id: '8', name: '电竞' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**2.请求导航数据 */
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: (res) => {
    //     // console.log(res);
    //     /**
    //      *  this.setData 有两个功能：
    //      *     1.更新数据
    //      *     2.更新视图
    //      */
    //     this.setData({
    //       navList: res.data
    //     });
    //   },
    // });
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

  }
})