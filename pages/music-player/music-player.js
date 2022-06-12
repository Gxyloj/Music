import {getLyric, getSongDetail} from "../../servies/api_music";
import {querySelectRect} from "../../utils/querySelectRect";
import {audioContext, playerStore} from "../../store/player-store";
import moment from "moment";
import {parseLyric} from "../../utils/parse-lyric";

const app = getApp()
const playModeIcon = ['order','repeat','random']

Page({
  data: {
    id: 0,
    songDetail: [],
    currentPage: 0,
    isPlay: false,
    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: '',
    contentHeight: 0,
    infoPaddingLeft: 0,
    showLyric: true,
    sliderValue: 0,
    current: 0,
    duration: 0,
    isSliderChanging: false,
    lyricScrollTop: 0,
    playModeIndex:0, //0 顺序播放 1 单曲循环 2随机播放
    playModeIcon:'order'

  },
  //监听player-store 即歌曲数据信息的变化
  setupPlayerStoreListener() {
    playerStore.onStates(['currentSongDetail', 'duration', 'lyricInfos'],
      ({
         currentSongDetail,
         duration,
         lyricInfos
       }) => {
        if (currentSongDetail) this.setData({songDetail: currentSongDetail})
        if (duration) this.setData({duration})
        if (lyricInfos) this.setData({lyricInfos})
      })
    //歌词相关监听
    playerStore.onStates(['current', 'currentLyricIndex', 'currentLyricText'],
      ({
         current,
         currentLyricIndex,
         currentLyricText
       }) => {
        if (current && !this.data.isSliderChanging) {
          const duration = this.data.duration.slice(0, 2) * 60 + this.data.duration.slice(3) * 1
          const sliderValue = current / duration / 10
          this.setData({current, sliderValue})
        }
        if (currentLyricIndex) {
          this.setData({currentLyricIndex, lyricScrollTop: currentLyricIndex * 35})
        }
        if (currentLyricText) this.setData({currentLyricText})
      })
    //播放模式相关
    playerStore.onState('playModeIndex',playModeIndex => {
      this.setData({playModeIndex,playModeIcon:playModeIcon[playModeIndex]})
    })
    //播放and暂停
    playerStore.onState('isPlay',isPlay => {
      this.setData({isPlay})
    })
    //上一首下一首

  },

  //轮播图
  handleSwiperChange(e) {
    this.setData({currentPage: e.detail.current})
  },
  handleGoLyric() {
    this.setData({currentPage: 1})
  },
  //进度条
  handleSliderChange(e) {
    const value = e.detail.value
    //要放哪里
    const duration = this.data.duration.slice(0, 2) * 60 + this.data.duration.slice(3) * 1
    const currentTime = duration * value / 100
    audioContext.pause()
    audioContext.seek(currentTime)
    // audioContext.play()   //加了模拟器不能更新当前进度  不加真机不能跳转
    this.setData({sliderValue: value, isSliderChanging: false})
  },
  //一直拖
  handleSliderChanging(e) {
    const value = e.detail.value
    const duration = this.data.duration.slice(0, 2) * 60 + this.data.duration.slice(3) * 1
    //现在滑到多少秒
    const currentTime = duration * value * 10
    this.setData({isSliderChanging: true, current: currentTime})

  },
  handleNewSongClick(e){
    const handle = e.currentTarget.dataset.handle
    playerStore.dispatch('handleNewSongAction',handle)
  },
  //音频上下文监听
  // setupAudioContextListener() {
  //   audioContext.onCanplay(() => {
  //     audioContext.play()
  //   })
  //   audioContext.onTimeUpdate(() => {
  //     //获取当前时间
  //     const currentTime = audioContext.currentTime * 1000
  //     if (!this.data.duration.length) return
  //     //如果没在滑动进度条
  //     if (!this.data.isSliderChanging) {
  //       //修改当前时间
  //       const duration = this.data.duration.slice(0, 2) * 60 + this.data.duration.slice(3) * 1
  //       this.setData({current: currentTime})
  //       const sliderValue = currentTime / duration / 10
  //       this.setData({sliderValue})
  //     }
  //     //根据当前时间查找歌词
  //     for (let i = 0; i < this.data.lyricInfos.length; i++) {
  //       //拿到每一行歌词
  //       const lyricInfo = this.data.lyricInfos[i]
  //       if (currentTime < lyricInfo.time) {//如果当前时间 小于 这行歌词应显示的时间
  //         const currentIndex = i - 1  //拿到这一行的上一行
  //         if (this.data.currentLyricIndex !== currentIndex) {
  //           const currentLyricInfo = this.data.lyricInfos[currentIndex]
  //           this.setData({
  //             currentLyricText: currentLyricInfo,
  //             currentLyricIndex: currentIndex,
  //             lyricScrollTop:currentIndex * 35
  //           })
  //         }
  //         break;
  //       }
  //     }
  //
  //   })
  // },
  //播放暂停
  //暂停播放
  handleState() {
    // if (this.data.isPlay){
    //   playerStore.setState('isPlay',false)
    // }else{
    //   playerStore.setState('isPlay',true)
    // }
    playerStore.dispatch('changeMusicPlayStatusAction')
  },
  //模式按钮
  handleModeBtnClick(){
    let  playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0
    playerStore.setState('playModeIndex',playModeIndex)
  },
  onLoad: function(options) {
    const id = options.id
    this.setData({id})
    // //请求歌曲数据
    // getSongDetail(id).then(res => {
    //   res.data.songs[0].dt = moment(res.data.songs[0].dt).format('mm:ss')
    //   this.setData({songDetail: res.data.songs, duration: res.data.songs[0].dt})
    // })
    // //请求歌词
    // let lyricString = ''
    // let lyrics
    // getLyric(id).then(res => {
    //   lyricString = res.data.lrc.lyric
    //   lyrics = parseLyric(lyricString)
    //   this.setData({lyricInfos: lyrics})
    // })

    //改到store里
    this.setupPlayerStoreListener()

    //动态获取content高度
    const screenHeight = app.globalData.screenHeight
    const statusBarHeight = app.globalData.statusBarHeight
    const menuButtonHeight = app.globalData.menuButtonHeight
    const deviceRadio = app.globalData.deviceRadio
    //控制是否显示歌词
    this.setData({showLyric: deviceRadio >= 2})
    querySelectRect('#nav-bar').then(res => {
      const contentHeight = screenHeight - res[0].height
      this.setData({contentHeight: contentHeight})
    })
    querySelectRect('.image').then(res => {
      const infoPaddingLeft = res[0].left - 10
      this.setData({infoPaddingLeft})
    })

    // //歌曲播放
    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // audioContext.autoplay = true
    // this.setupAudioContextListener()
  }

});