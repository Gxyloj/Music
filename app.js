// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    menuButtonHeight:0,
    deviceRadio:0
  },
  onLaunch(options) {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.menuButtonRect = wx.getMenuButtonBoundingClientRect()
    this.globalData.deviceRadio = info.screenHeight / info.screenWidth
  }

})
