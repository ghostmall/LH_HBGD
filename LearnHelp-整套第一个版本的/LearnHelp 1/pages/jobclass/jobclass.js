// pages/jobclass/jobclass.js
var app = getApp();
const DOMAIN_URL = app.globalData.prefix_url
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jobclass:[
        { id:'1',name: 'C++', content: '0' }, { id:'2',name: 'Java', content: '1' }, {id:'3', name: 'UML建模', content: '2' }, {id:'3', name: 'JS编程', content: '3'}, 
      ],
      // jobclass:[],
      //jobId,
    // pageIndex: 0,
    // pageSize: 20,
  },
  //下拉加载更多
  loadMore: function () {
    let that = this
    wx.request({//cat表示页数，_limit表示每页页最大数据量，_page表示默认到第一页
      url: DOMAIN_URL + 'categories/' + that.data.jobId + '/.do',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        console.log(res);
        //bug:每次请求过来的数据把本来的数据替换掉了
        //6.解决bug的思路，先获取本来的数据,再通过concatb把新数据拼接起来
        var newList = this.data.jobclass.concat(res.data);
        this.setData({
          jobclass: newList
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.title) {
    //   wx.setNavigationBarTitle({
    //     title: options.title,
    //   });
    // }
    // //2.把获取的页参数添加到data中方便重复使用
    // this.setData({
    //   catId: options.cat
    // })
    // //4.调用加载数据的函数
    // this.loadMore();
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