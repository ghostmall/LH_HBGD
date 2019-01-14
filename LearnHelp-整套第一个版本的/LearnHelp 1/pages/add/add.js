// pages/add/add.js
var app=getApp();
var util = require('../../utils/util.js')
const DOMAIN_URL = app.globalData.prefix_url
const CAMPUS_LIST_URL = DOMAIN_URL + 'work/listdoc.do'
function getCurrentTime() {
  var now = new Date();
  return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
}
function showMsg(msg) {
  wx.showToast({
    title: msg,
    duration: 2000,
    icno: 'none'
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
 

    // 职位类型 相关数据
    pickerIndex: 1,
    classIndex:0,
 
    classList: [
      '一班',
      '二班',
      '三班',
      '四班',
      '五班',
      '六班',
      '七班',
      '八班',
      '九班'
    ],
    //时间相关数据
    begindate: getCurrentTime(),
    
    //上传图片的文件路径
    filepath: [
      '/image/icon/add_image.png'
    ],
    imagePath:'image/icon/add_image.png'
  },
  choosePhoto: function (option) {
    let that = this
    let variable = option.currentTarget.dataset.variable

    console.log(variable)

    const original = '/image/icon/add_image.png'

    wx.chooseImage({
      sizeType: ['original'],
      sourceType: ['album'],
      count: (variable == 'filepath' ? 12 : 1),
      success: function (res) {
        if ("expressCodePath" == variable) {
          that.setData({
            expressCodePath: res.tempFilePaths[0]
          })
        } else if ("idcardPath" == variable) {
          that.setData({
            idcardPath: res.tempFilePaths[0]
          })
        } else {
          let lastAdded = that.data.filepath
          let add = res.tempFilePaths

          let _filepath = add.concat(lastAdded)
          that.setData({
            filepath: _filepath
          })
        }
      }
    })
  },

  
        /**
  * 上传照片//选择图片时限制9张，如需超过9张，同理亦可参照此方法上传多张照片
  */
        uploadImg: function() {
          var that = this;
          wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var successUp = 0; //成功
              var failUp = 0; //失败
              var length = res.tempFilePaths.length; //总数
              var count = 0; //第几张
              that.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length);
            },
          });
        },
      /**
        * 采用递归的方式上传多张
        */
      uploadOneByOne(imgPaths, successUp, failUp, count, length, _id) {
        var that = this;
        wx.showLoading({
          title: '正在上传第' + count + '张',
        })
        wx.uploadFile({
          url: UPLOAD_ORDER_URL, //仅为示例，非真实的接口地址
          filePath: imgPaths[count],
          formData: {
            id: _id
          },
          name: 'order',
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
              that.uploadOneByOne(imgPaths, successUp, failUp, count, length, _id);
              console.log('正在上传第' + count + '张');
            }
          }
        })
      },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let _begindate = util.formatTime(now);
    this.setData({
      begindate: _begindate,
    })  
  },
 
 

  // 类型触发器
  changeType: function (event) {
    let that = this;
    // 获取重新选择的下标
    let index = parseInt(event.detail.value);

    that.setData({
      pickerIndex:index,   
      // 清空图片上传信息
      filepath: ['/image/icon/add_image.png'],
      // 还原bookService
      bookService: 0
    });
  },
 //班级选择器
  classChange: function (event) {
     let that=this;
     let index=parseInt(event.detail.value);
     that.setData({
       classIndex:index
     })
    // 获取校区信息
    wx.request({
      url: CAMPUS_LIST_URL,
      success: function (res) {
        if (res.data.state) {
          that.setData({
            classList: res.data.data
          })
        } else {
          wx.showToast({
            title: '网络超时',
            icon: 'none',
            duration: 2000
          })
        }
      }, fail: function () {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
      }
    })
   },






 //上传文件
 upload:function(){
   wx.navigateTo({
     url:'../webview/web',
    
   })
 },
 
//提交表单
submit:function(e){
  let that=this;
  //上传图片信息
  let _filepath=that.data.filepath;
  //获取表单信息
  let _formData=e.detail.value
  //获取班级信息

  //获取课程名

  //添加微信信息
  let userInfo=wx.getStorageSync('userInfo')
  console.log(userInfo)
  _formData.orderNickname = userInfo.nickName
  _formData.orderPicUrl = userInfo.avatarUrl
  _formData.orderGender = userInfo.gender
  _formData.campus = app.globalData.campus
  //获取用户职业
  wx.request({
    url:SAVE_FORM,
    header:{
      "Content-Type": 'application/json' 
    },
    method:'POST',
    data:{_filepath,_formData,_classData,_userInfo,_className,_zhiYe},
    success:function(e){
      console.log(e.data);
      if(e.data.status==0){
        wx.showToast({
          title: '提交失败！',
          Icon:'',
          duration: 1500
        })
      }else{
        wx.showTost({
          title:'提交成功！',
          icon:'success',
          duration:1000

        })
      }
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
  
  }
})