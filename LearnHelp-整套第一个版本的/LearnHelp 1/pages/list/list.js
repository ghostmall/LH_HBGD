// pages/list/list.js
var app = getApp();
//动画状态值
var status=0; 
//当前选中的数据项
var pose=0;
//导入util包
var util = require('../../utils/util.js')

const DOMAIN_URL = app.globalData.prefix_url

const CAMPUS_LIST_URL = DOMAIN_URL+'work/listdoc.do'

const  LIST_URL = DOMAIN_URL + 'work/listdoc.do'

//all  0    文档汇总

//excellent 1 优秀文档

//learning  2  学习文档

Page({

  /**
   * 页面的初始数据
   */
  data: {      
    current: 0,
    //当前选中的Tab项
    school: [
      '河北工业',
      '廊坊师范', 
      '北华航天',
      '河北东方学院'
    ],
    // 校区选项
    major: [
      '软件工程',
      '计算机科学与技术',
      '网络工程',
      '物联网工程'
    ], 
    classmt: [
      '一班',
      '二班',
      '三班',
      '四班'
    ],
    subject:[
      '数据库',
      '单片机',
      'java',
      'python'
    ],
    listData:[
      { "type":"0","a1": "01", "a2": "张三", "a3": util.formatTime(new Date())},
      { "type":"1", "a1": "02", "a2": "李四", "a3": util.formatTime(new Date())},
      { "type":"2", "a1": "03", "a2": "王五", "a3": util.formatTime(new Date())},
      { "type":"0","a1": "04", "a2": "赵六", "a3": util.formatTime(new Date())},
      { "type":"2","a1": "05", "a2": "石七", "a3": util.formatTime(new Date())}
    ],
    //导航栏数组
    tabList: ['文档汇总', '优秀文档', '学习文档'],
    //文档类型
    //优化选择框数据
    animationData: {},
    //picker index 设置
    index:0,
    index1: 0,
    index2: 0,
    index3: 0,
    //详情页面显示参数
    method:0
  },

  /**
   *picker的响应函数 
   */
  pickerchange: function(event){
    console.log(event.detail.value);
    this.setData({
      index: event.detail.value, 
    });
  },

  pickerchange1: function (event) {
    console.log(event.detail.value);
    this.setData({
      index1: event.detail.value,
    });
  },
  pickerchange2: function (event) {
    console.log(event.detail.value);
    this.setData({
      index2: event.detail.value,
    });
  },
  pickerchange3: function (event) {
    console.log(event.detail.value);
    this.setData({
      index3: event.detail.value,
    });
  },

  tabItemClick:function(e){
    
    let that=this;

    console.log(e.currentTarget.dataset.pos);

    this.setData({
      current: e.currentTarget.dataset.pos,
    });  

    this.getRobbingList(e.currentTarget.dataset.pos);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    let that = this

    // 获取校区信息
    wx.request({
      url: CAMPUS_LIST_URL,
      success: function (res) {
        if (res.data.state) {
          that.setData({
            school: res.data.data
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
    var _school = app.globalData.school

    if (_school) {
      that.setData({
        index: _school
      })
    }

    // 查看是否已经有缓存，如有隐藏用户信息授权页面
    var flag = wx.getStorageSync('authority')
    if (flag) {
      that.setData({
        canIUse: 0
      })
    } else {
      wx.setStorageSync('authority', 1)
    }
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
      
      // setTimeout(function () {
      //   animation.translate(30).step();
      //   this.setData({
      //     animationData: animation.export()
      //   });
      // }.bind(this), 1000);
    },
    rotateAndScale: function () {
      // 旋转同时放大
      this.animation.rotate(45).scale(2, 2).step();
      this.setData({
        animationData: this.animation.export()
      });
    },
    rotateThenScale: function () {
      // 先旋转后放大
      this.animation.rotate(45).step();
      this.animation.scale(2, 2).step();
      this.setData({
        animationData: this.animation.export()
      });
    },
    rotateAndScaleThenTranslate: function () {
      // 先旋转同时放大，然后平移
      this.animation.rotate(45).scale(2, 2).step()
      this.animation.translate(100, 100).step({ duration: 1000 })
      this.setData({
        animationData: this.animation.export()
      });
    }, 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function () {
  
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
  moveTheBlock:function(){
    var animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease-in',
      });
    if(status==0){ 
      //下拉
      animation.translateY(200).step();
      status=1;
    }
    else if(status==1){
      //上提
      animation.translateY(-200).step();
      status=0;
      //同时显示选择到的注册信息
    }
      this.setData({
        animationData: animation.export()
      });
  },

  checkDetail: function (e){

    console.log(e.currentTarget.dataset.pos);
    console.log("显示参数"+method);
    let method=e.currentTarget.dataset.pos
    wx.navigateTo({
      url: '/pages/download/download?detail=' + pose+'&method='+method
    });
  },
  // 获取文档列表
  getRobbingList: function (type) {
    
    let that = this;

    this.setData({
      current:type
    })

    console.log(type);

    wx.request({
      url: LIST_URL + '?type=' + type,
      method: 'GET',
      success: function (res) {
        if (res.data.state === 1) {
          that.setData({
            listData: res.data.data
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络出错！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  }
})
 