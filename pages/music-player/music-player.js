import {getSongDetail} from "../../servies/api_music";
import {querySelectRect} from "../../utils/querySelectRect";

const app = getApp()

Page({
  data: {
    songDetail:[],
    currentPage:0,
    contentHeight:0,
    infoPaddingLeft:0

  },
  handleSwiperChange(e){
    this.setData({currentPage:e.detail.current})
  },
  onLoad: function(options) {
    const id = options.id
    //请求歌曲数据
    getSongDetail(id).then(res => {
      this.setData({songDetail:res.data.songs})
    })
    //动态获取content高度
    const screenHeight = app.globalData.screenHeight
    const statusBarHeight = app.globalData.statusBarHeight
    const menuButtonHeight = app.globalData.menuButtonHeight
    querySelectRect('#nav-bar').then(res => {
      const contentHeight = screenHeight - res[0].height
      this.setData({contentHeight:contentHeight})
    })
    querySelectRect('.image').then(res => {
      const infoPaddingLeft = res[0].left - 10
      this.setData({infoPaddingLeft})
    })
    // const contentHeight = screenHeight - statusBarHeight - menuButtonHeight
  }
});