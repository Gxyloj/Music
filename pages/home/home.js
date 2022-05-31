// pages/home/home.js
import {
  getBanner, getPersonalizedNewSong, getSongMenu
} from '../../servies/api_music'
import {querySelectRect} from '../../utils/querySelectRect'
import {throttle} from '../../utils/throttle'
import {rankingStore} from "../../store/index";

const throttleQueryRect = throttle(querySelectRect, 50)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    swiperHeight: 0,
    personalizedNewSong: {},
    recommendSongMenu:[],
    hotSongMenu:[]
  },

  handleSearchInput() {

    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  //轮播图片加载完成处理函数
  handleSwiperImageLoaded() {
    if (this.data.swiperHeight !== 0) return
    throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({swiperHeight: rect.height})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const res = await getBanner()
    this.setData({
      bannerList: res.data.banners
    })
    // rankingStore.dispatch('getRankingDataAction')  //换用推荐新音乐
    getPersonalizedNewSong(5).then(res => {
      this.setData({personalizedNewSong: res.data.result.splice(5)})
    })
    //获取推荐歌单 cat=全部
    getSongMenu().then(res => {
      this.setData({recommendSongMenu:res.data.playlists})
    })
    //获取热门歌单 cat=华语
    getSongMenu('华语').then(res => {
      this.setData({hotSongMenu:res.data.playlists})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
