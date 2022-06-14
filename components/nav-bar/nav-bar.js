import {playerStore} from "../../store/player-store";

const app = getApp()

Component({
  options:{
    multipleSlots:true
  },
  properties: {
    title:{
      type:String,
      value:'默认标题'
    }

  },
  data: {
    statusBarHeight:app.globalData.statusBarHeight,
    menuButtonRect:app.globalData.menuButtonRect,
  },
  methods: {
    handleNavigateBack(){
      wx.navigateBack({
        delta:1
      })

    }
  },
  lifetimes: {
    ready() {

    }
  }
});
