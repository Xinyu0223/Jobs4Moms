// pages/job-list/job-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  title: '加载中...', // 状态
  list: [], // 数据列表
  loading: true // 显示等待框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _this = this;
    wx.request({
      url: 'http://127.0.0.1:8000/api/job_post/job_post/',
      data: {
        search: "None"
      },
      success: res => {
        console.log('Get job posts successfully.')
        console.log(res.data.data)
        _this.setData({
          title: '岗位列表',
          list: res.data.data,
          loading: false // 关闭等待框
        })
        console.log(this.data.list)
      }
    })
  },

  onSearch(e) {
    const _this = this;
    wx.request({
      url: 'http://127.0.0.1:8000/api/job_post/job_post/',
      data: {
        search: e
      },
      success: res => {
        console.log('Get job posts successfully.')
        console.log(res.data.data)
        _this.setData({
          title: '岗位列表',
          list: res.data.data,
          loading: false // 关闭等待框
        })
        console.log(this.data.list)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})