// pages/identityValidate/identitValidate.js
var app = getApp()

const UPLOAD_URL = app.globalData.prefix_url + 'user/upload.do'
const PLATUSERINFO_URL = app.globalData.prefix_url + 'user/platinfo.do'
const PAY_ORDER_URL = app.globalData.prefix_url + 'common/wxpay.do';



function getNum() {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = "";
  for (var i = 0; i < 31; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcardPath: "/image/icon/add_image.png",
    schoolPath: '/image/icon/add_image.png',
    prepage: ''
  },

  choosePhoto: function (option) {
    let that = this
    let variable = option.currentTarget.dataset.variable

    wx.chooseImage({
      sizeType: ['original'],
      sourceType: ['album'],
      count: 1,
      success: function (res) {
        if ("idcard" == variable) {
          that.setData({
            idcardPath: res.tempFilePaths[0]
          })
        } else {
          that.setData({
            schoolPath: res.tempFilePaths[0]
          })
        }
      }
    })
  },

  // 提交订单
  submit: function (option) {
    let that = this

    let value = option.detail.value
    console.log(value)

    let openid = app.globalData.openid

    wx.showModal({
      title: '是否支付1元审核费？',
      success: function () {
        // 发起付款请求
        wx.request({
          url: PAY_ORDER_URL,
          data: {
            id: getNum(),
            openid: app.globalData.openid,
            body: 'orderPayment',
            orderPayment: 1,
            type: 'vip'
          },
          success: function (result) {
            console.log(result)
            wx.requestPayment({
              timeStamp: result.data['timeStamp'],
              nonceStr: result.data['nonceStr'],
              package: result.data['package'],
              signType: 'MD5',
              paySign: result.data['paySign'],
              success: function (res) {
                wx.showLoading({
                  title: '正在上传信息...'
                })
                wx.uploadFile({
                  url: UPLOAD_URL, //仅为示例，非真实的接口地址
                  filePath: that.data.idcardPath,
                  name: 'idcard',
                  formData: {
                    'openid': openid,
                    realname: value.name
                  },
                  success(res) {
                    //do something
                    let data = JSON.parse(res.data)
                    let state = data.state

                    if (state) {
                      wx.uploadFile({
                        url: UPLOAD_URL, //仅为示例，非真实的接口地址
                        filePath: that.data.schoolPath,
                        name: 'school',
                        formData: {
                          'openid': openid,
                          realname: value.name
                        },
                        success(res) {
                          let data = JSON.parse(res.data)
                          let state = data.state
                          //do something
                          if (state) {
                            wx.hideLoading();
                            wx.navigateTo({
                              url: '/pages/my/my'
                            })

                            // 更新平台用户信息
                            wx.request({
                              url: PLATUSERINFO_URL,
                              data: {
                                openid: openid
                              },
                              success: function (res) {
                                if (res.data.state) {
                                  app.globalData.platUserInfo = res.data.data
                                  wx.setStorageSync('platUserInfo', res.data.data)
                                }
                              }
                            })

                            // 返回页面
                            wx.navigateBack({
                              delta: 1
                            })
                          } else {
                            wx.showToast({
                              title: '网络超时！',
                              duration: 2000,
                              icon: 'none'
                            })
                          }
                        },
                        fail: function () {
                          wx.showToast({
                            title: '网络超时！',
                            duration: 2000,
                            icon: 'none'
                          })
                        }
                      })
                    }
                  },
                  fail: function () {
                    wx.showToast({
                      title: '网络超时！',
                      duration: 2000,
                      icon: 'none'
                    })
                  }
                })

              },
              fail: function (res) {
                wx.showToast({
                  title: '网络超时',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    })

  },

  /**
  * 采用递归的方式上传
  */
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    wx.uploadFile({
      url: app.globalData.prefix_url + 'user/.do', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: count,//示例，使用顺序给文件命名
      success: function (e) {
        successUp++;//成功+1
      },
      fail: function (e) {
        failUp++;//失败+1
      },
      complete: function (e) {
        count++;//下一张
        if (count == length) {
          //上传完毕，作一下提示
          console.log('上传成功' + successUp + ',' + '失败' + failUp);
          wx.showToast({
            title: '上传成功' + successUp,
            icon: 'success',
            duration: 2000
          })
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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