import {HYEventStore} from "hy-event-store";
import {getLyric, getSongDetail} from "../servies/api_music";
import moment from "moment";
import {parseLyric} from "../utils/parse-lyric";
import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";

const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSongDetail: [], //歌曲详情
    duration: '',  //歌曲时长
    current: 0,      //当前时间
    isPlay: false, //播放状态
    lyricInfos: [],  //歌词信息
    currentLyricIndex: 0,//歌词Index
    currentLyricText: '',//歌词文本
    playModeIndex: 0, //0 顺序播放 1 单曲循环 2随机播放
    playListSong: [], //播放列表
    playListIndex: 0,
    testArray: []//索引

  },
  actions: {
    playMusicWithIDAction(ctx, id) {
      if (ctx.id === id) return
      ctx.id = id

      //重置
      ctx.currentSongDetail = []
      ctx.duration = ''
      ctx.current = 0
      ctx.isPlay = false
      ctx.lyricInfos = []
      ctx.currentLyricText = ''

      //请求歌曲数据
      getSongDetail(id).then(res => {
        //把歌曲时长转为mm:ss格式
        res.data.songs[0].dt = moment(res.data.songs[0].dt).format('mm:ss')
        ctx.currentSongDetail = res.data.songs
        ctx.duration = res.data.songs[0].dt
      })
      //请求歌词
      let lyricString = ''
      let lyrics
      getLyric(id).then(res => {
        lyricString = res.data.lrc.lyric
        //处理歌词
        lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics
      })
      //歌曲播放
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      //监听歌曲的状态
      this.dispatch('setupAudioContextListener')
    },
    setupAudioContextListener(ctx) {
      audioContext.onCanplay(() => {
        audioContext.play()
        ctx.isPlay = true
      })
      audioContext.onTimeUpdate(() => {
        //获取当前时间
        const currentTime = audioContext.currentTime * 1000
        if (!ctx.duration.length) return
        //如果没在滑动进度条
        // if (!this.data.isSliderChanging) {
        //   //修改当前时间
        //   const duration = this.data.duration.slice(0, 2) * 60 + this.data.duration.slice(3) * 1
        //   this.setData({current: currentTime})
        //   const sliderValue = currentTime / duration / 10
        //   this.setData({sliderValue})
        // }
        //修改当前时间
        ctx.current = currentTime
        //根据当前时间查找歌词
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          //拿到每一行歌词
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {//如果当前时间 小于 这行歌词应显示的时间
            const currentIndex = i - 1  //拿到这一行的上一行
            if (ctx.currentLyricIndex !== currentIndex) {
              const currentLyricInfo = ctx.lyricInfos[currentIndex]
              // this.setData({
              //   currentLyricText: currentLyricInfo,
              //   currentLyricIndex: currentIndex,
              //   lyricScrollTop: currentIndex * 35
              // })
              ctx.currentLyricText = currentLyricInfo
              ctx.currentLyricIndex = currentIndex

            }
            break;
          }
        }
      })
    },
    changeMusicPlayStatusAction(ctx) {
      ctx.isPlay = !ctx.isPlay
      ctx.isPlay ? audioContext.play() : audioContext.pause()
    },
    //添加到播放列表
    AddToPlayListAction(ctx, index, playList) {
      if (ctx.playListSong.length === 0) {
        //如果播放列表为空，则直接添加到播放列表
        this.setState('playListSong', playList)
        this.setState('playListIndex', index)
      } else {
        // if (playList[index] === ctx.id) return
        //如果播放列表不为空，则保留列表前半部分，添加到最后一项
        const playListSong = ctx.playListSong.slice(0, ctx.playListIndex + 1)
        this.setState('playListSong', [...playListSong, playList[index]])
        this.setState('playListIndex', ctx.playListSong.length - 1)
      }
      console.log(ctx.playListSong, ctx.playListIndex)
    },
    //上一首下一首
    handleNewSongAction(ctx, handle) {
      let id = 0
      if (handle === 'prev') {
        console.log(ctx.playModeIndex)
        //判断播放模式 0默认 1单曲 2随机
        switch (ctx.playModeIndex){
          case 0:
            //如果已经是第一首，则不能再上一首
            if(ctx.playListIndex === 0){
              wx.showToast({
                title:'没有上一首了',
                icon:'none'
              })
              // Toast('没有上一首了')
              audioContext.seek(0)
              //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
              audioContext.play()
              setTimeout(() => {
                const update = audioContext.paused
              }, 100)
              return
            }
            //否则 id为列表内的上一首
            id = ctx.playListSong[ctx.playListIndex - 1]
            this.dispatch('playMusicWithIDAction', id)
            this.setState('playListIndex', ctx.playListIndex - 1)
            break
          case 1:
            audioContext.seek(0)
            //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
            audioContext.play()
            setTimeout(() => {
              const update = audioContext.paused
            }, 100)
            break
          case 2:
            //如果已经是第一首，则不能再上一首
            if(ctx.playListIndex === 0){
              wx.showToast({
                title:'没有上一首了',
                icon:'none'
              })
              // Toast('没有上一首了')
              audioContext.seek(0)
              //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
              audioContext.play()
              setTimeout(() => {
                const update = audioContext.paused
              }, 100)
              return
            }
            //否则 id为列表内的上一首
            let randomIndex = Math.floor(Math.random() * ctx.playListSong.length)
            id = ctx.playListSong[randomIndex]
            this.dispatch('playMusicWithIDAction', id)
            this.setState('playListIndex', randomIndex)
            break
        }

      } else if (handle === 'next') {
        //判断播放模式
        switch (ctx.playModeIndex){
          case 0:
            //如果已经是最后一首 return
            if (ctx.playListIndex === ctx.playListSong.length - 1) {
              wx.showToast({
                title:'没有下一首了',
                icon:'none'
              })
              audioContext.seek(0)
              //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
              audioContext.play()
              setTimeout(() => {
                audioContext.paused
              }, 100)
              return
            }
            //id为列表内的下一首
            id = ctx.playListSong[ctx.playListIndex + 1]
            this.dispatch('playMusicWithIDAction', id)
            this.setState('playListIndex', ctx.playListIndex + 1)
            break
          case 1:
            audioContext.seek(0)
            //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
            audioContext.play()
            setTimeout(() => {
              const update = audioContext.paused
            }, 100)
            break
          case 2:
            //如果已经是第一首，则不能再上一首
            if(ctx.playListIndex === 0){
              wx.showToast({
                title:'没有上一首了',
                icon:'none'
              })
              // Toast('没有上一首了')
              audioContext.seek(0)
              //seek以后会触发不了onTimeUpdate事件 重新读取一下歌曲状态
              audioContext.play()
              setTimeout(() => {
                const update = audioContext.paused
              }, 100)
              return
            }
            //否则 id为列表内的上一首
            let randomIndex = Math.floor(Math.random() * ctx.playListSong.length)
            id = ctx.playListSong[randomIndex]
            this.dispatch('playMusicWithIDAction', id)
            this.setState('playListIndex', randomIndex)
            break
        }

      }
    }
  }
})


export {
  audioContext,
  playerStore
}