// pages/video/video.js
import {getTopMV} from '../../servies/api_video'
import moment from '../../miniprogram_npm/moment/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore:true,
  },

  formatTime(time){
    return moment(time).format('mm:ss')
  },
  async getTopMVData(offset){
    //hasMore为true时才可以发起请求
    if(!this.data.hasMore) return
    wx.showNavigationBarLoading()
    

    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    //格式化视频时长
    res.data.data.forEach(data => {
      data.mv.videos[0].duration = moment(data.mv.videos[0].duration).format('mm:ss') 
    })
    //赋值
    //如果原来没有，就把请求到的赋值给newData
    if(offset === 0 ){
      newData = res.data.data
    }else{//如果有 就把请求到的拼接给原来的
      newData = [...this.data.topMVs,...res.data.data]
    }
    //把newData赋值给topMVs
    this.setData({topMVs:newData})
    //如果加载完了，把hasMore设置为false
    this.setData({hasMore:res.data.hasMore})
    wx.hideNavigationBarLoading()
    if(offset === 0){
      wx.stopPullDownRefresh()
    }
  },
  handleVideoClick(e){
    const id = e.currentTarget.dataset.item.id
    console.log('点击',id);
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${id}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   getTopMV(0).then(res => {
  //     this.setData({topMVs:res.data.data})
  //   })
  // },
  onLoad: function (options) {
    this.getTopMVData(0)
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
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getTopMVData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})