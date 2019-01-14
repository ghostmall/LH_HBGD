// pages/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileTypeList:[
      { type: 'doc', iconurl: '/image/icon/wx_app_doc.png', note: 'doc类型'},
      { type: 'docx', iconurl: '/image/icon/wx_app_docx.png', note: 'docx类型'},
      { type: 'xls', iconurl: '/image/icon/wx_app_xls.png', note: 'xls类型'},
      { type: 'xlsx', iconurl: '/image/icon/wx_app_xlsx.png', note: 'xlsx类型'},
      { type: 'ppt', iconurl: '/image/icon/wx_app_ppt.png', note: 'ppt类型' },
      { type: 'pptx', iconurl: '/image/icon/wx_app_pptx.png', note: 'pptx类型'},
      { type: 'pdf', iconurl: '/image/icon/wx_app_pdf.png', note: 'pdf类型' },
      { type: 'jpeg', iconurl: '/image/icon/wx_app_jpeg.png', note: 'jpeg类型' },
      { type: 'gif', iconurl: '/image/icon/wx_app_gif.png', note: 'gif类型' },
      { type: 'png', iconurl: '/image/icon/wx_app_png.png', note: 'png类型' },
      { type: 'jpg', iconurl: '/image/icon/wx_app_jpg.png',  note: 'jpg类型' },
        ],
  },
  //点击下载并预览文档
  // downloadDocumentList:function(){
  //   wx.navigateTo({
  //     url: '/pages/download/download',
  //   })
  // },
  downloadFile:function(event){
      var type = event.currentTarget.dataset.type,
      url='/files/demo.docx';
      switch(type){
        case "pdf":
        url+='pdf';
        break;
        case "doc":
        url+='doc';
        break;
        case "docx":
          url += 'docx';
          break;
        case "ppt":
          url += 'ppt';
          break;
        case "xls":
          url += 'xls';
          break;
        case "xlsx":
          url += 'xlsx';
          break;
        case "pptx":
          url += 'pptx';
          break;
      }
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: url,
      success(res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success:function(res) {
            console.log('打开文档成功')
          },
          fail:function(res){
            console.log(res);
          },complete:function(res){
            console.log(res);
          }
        })
      },
      fail:function(){
        console.log('下载失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let method = options.method

    console.log(method)
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