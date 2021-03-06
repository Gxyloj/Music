// pages/home/home.js
import {
  getBanner, getPersonalizedNewSong, getSongMenu
} from '../../servies/api_music'
import {querySelectRect} from '../../utils/querySelectRect'
import {throttle} from '../../utils/throttle'
import rankingStore from "../../store/ranking-store";
import {login} from "../../servies/api_login";
import {playerStore} from "../../store/player-store";

const throttleQueryRect = throttle(querySelectRect, 200, {trailing: true})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    swiperHeight: 0,
    personalizedNewList: {},
    recommendSongMenu: [],
    hotSongMenu: [],
    rankingList: {0: {}, 1: {}, 2: {}, 3: {}},
    currentSongDetail: {},
    isPlay: true,
    playAnimState:'paused'
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
        playCount: res.playCount,
        songList: id === 3 ? res.tracks.slice(0, 5) : res.tracks.slice(0, 3)
      }
      let originRanking = {...this.data.rankingList, [id]: newRankingList}
      this.setData({rankingList: originRanking})
    }


  },
  navigateToDetailSongPage(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/detail-songs?rankingName=${rankingName}&type=ranking`
    })
  },
  handleMoreClick() {
    this.navigateToDetailSongPage('hotRankingList')
  },
  handleRankingClick(e) {
    const id = e.currentTarget.dataset.id
    const rankingName = id === '0' ? 'newRankingList' : id === '1' ? 'originalRankingList' : 'upRankingList'
    this.navigateToDetailSongPage(rankingName)
  },
  handleItemClickFormList(e) {
    const index = e.currentTarget.dataset.index
    const songList = this.data.rankingList[3].songList.map(item => item.id)
    const name = this.data.rankingList[3].songList.map(item => item.name)
    playerStore.dispatch('AddToPlayListAction', index, songList, name)
  },
  setupPlayerStoreListener() {
    playerStore.onStates(['currentSongDetail', 'isPlay'],
      ({currentSongDetail, isPlay}) => {
        if (currentSongDetail) this.setData({currentSongDetail})
        if (isPlay !== undefined) this.setData({isPlay,
          playAnimState:isPlay ? 'running' : 'paused'})
      })

  },
  handleState(e) {
    playerStore.dispatch('changeMusicPlayStatusAction')
  },
  handlePlayBarClick(){
    wx.navigateTo({
      url:'/pages/music-player/music-player'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

    // playerStore.dispatch('playMusicWithIDAction', 1489040856)


    rankingStore.dispatch('getRankingDataAction')
    rankingStore.onState('newRankingList', this.getNewRankingList(0))
    rankingStore.onState('originalRankingList', this.getNewRankingList(1))
    rankingStore.onState('upRankingList', this.getNewRankingList(2))
    rankingStore.onState('hotRankingList', this.getNewRankingList(3))
    const res = await getBanner()
    this.setData({
      bannerList: res.data.banners
    })
    // rankingStore.dispatch('getRankingDataAction')  //换用推荐新音乐
    getPersonalizedNewSong(5).then(res => {
      this.setData({personalizedNewList: res.data.result.splice(5)})
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
    //监听当前歌曲
    this.setupPlayerStoreListener()
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
