// app.js
import {checkSession, checkToken, codeToToken, getLoginCode} from "./servies/api_login";

App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    menuButtonHeight:0,
    deviceRadio:0
  },
  onLaunch(options) {
    //设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.menuButtonRect = wx.getMenuButtonBoundingClientRect()
    this.globalData.deviceRadio = info.screenHeight / info.screenWidth

    //默认登录
    this.handleLogin()
  },
  async handleLogin(){
    const token = wx.getStorageSync('token')
    //检查token是否过期
    const checkResult = await checkToken()
    console.log(checkResult)
    //判断session
    const isSessionExpire = await checkSession()

    if (!token || checkResult.errCode || isSessionExpire){
      this.loginAction()
    }
  },
  async loginAction(){
    //获取code
    const code = await getLoginCode()
    //将code发送给服务器
    const result = await codeToToken(code)
    const token = result.data.token
    wx.setStorageSync('token',token)
  }

})
