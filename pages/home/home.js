// pages/home/home.js
import {
  getBanner, getPersonalizedNewSong, getSongMenu
} from '../../servies/api_music'
import {querySelectRect} from '../../utils/querySelectRect'
import {throttle} from '../../utils/throttle'
import rankingStore from "../../store/ranking-store";

const throttleQueryRect = throttle(querySelectRect, 50)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    swiperHeight: 0,
    personalizedNewSong: {},
    recommendSongMenu: [],
    hotSongMenu: [],
    rankingList: {0:{},1:{},2:{}}
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
  //歌曲榜单数据绑定
  getNewRankingList(id) {
    //处理数据
    return (res) => {
      if (Object.keys(res).length === 0) return
      let newRankingList = {
        name: res.name,
        coverImgUrl: res.coverImgUrl,
        playCount:res.playCount,
        songList: res.tracks.slice(0, 3),
      }
      let originRanking = {...this.data.rankingList,[id]:newRankingList}
      this.setData({rankingList: originRanking})
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    rankingStore.onState('newRankingList', this.getNewRankingList(0))
    rankingStore.onState('originalRankingList', this.getNewRankingList(1))
    rankingStore.onState('upRankingList', this.getNewRankingList(2))
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
      this.setData({recommendSongMenu: res.data.playlists})
    })
    //获取热门歌单 cat=华语
    getSongMenu('华语').then(res => {
      this.setData({hotSongMenu: res.data.playlists})
    })
    //获取歌曲榜单
    rankingStore.dispatch('getRankingDataAction')
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
    // rankingStore.offState('rankingList')
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
