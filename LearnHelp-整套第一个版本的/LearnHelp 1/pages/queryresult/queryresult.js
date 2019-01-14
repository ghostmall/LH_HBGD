var app = getApp();

const DOMAIN_URL = app.globalData.prefix_url
const LIST_URL = DOMAIN_URL + 'categories/1/shops'
//const CAMPUS_LIST_URL = DOMAIN_URL + 'campus/list.do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryresult: [],
    //由于第一次加载页面的时候页面会自增1，所以设置为0
    pageIndex: 0,
    pageSize: 20,
    resId: 1,
  },

  loadMore: function () {
    wx.request({//cat表示页数，_limit表示每页页最大数据量，_page表示默认到第一页
      url: 'https://locally.uieee.com/categories/' + this.data.resId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        console.log(res);
        //bug:每次请求过来的数据把本来的数据替换掉了
        //6.解决bug的思路，先获取本来的数据,再通过concatb把新数据拼接起来
        var newList = this.data.queryresult.concat(res.data);
        this.setData({
          queryresult: newList
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
    }
    //2.把获取的页参数添加到data中方便重复使用
    this.setData({
      catId: options.cat
    })
    //4.调用加载数据的函数
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("B3:店铺列表页----监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("C3:店铺列表页----监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("D3:店铺列表页----监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("E3:店铺列表页----监听页面卸载");
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})