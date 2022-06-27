import {getUserInfo, login} from "../../servies/api_login";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  data: {
    username: '',
    password: ''

  },
  handleLogin(){
    login(this.data.username,this.data.password).then(res => {
      if (res.data.code!== 200) return Toast.fail(res.data.msg)
      Toast.success(res.data.msg)
    })
  },
  async handleGetUser(){
    const userInfo = await getUserInfo()
    console.log(userInfo)
  },
  handleGetPhoneNumber(e){
    console.log(e)
  },
  onLoad: function(options) {

  }
});