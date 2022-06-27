import OJRequest, {OJLoginRequest} from "./requset";

export function login(phone,password){
  return OJRequest.get('/login/cellphone',{
    phone,
    password
  })
}

export function getLoginCode(){
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:1000,
      success:res => {
        const code = res.code
        resolve(code)
      },
      fail:err => {
        console.log(err)
        reject(err)
      }
    })
  })
}

export function codeToToken(code){
  return OJLoginRequest.post('/login',{code})
}

export function checkToken(){
  return OJLoginRequest.post('/auth',{},true)
}

export function checkSession(){
  return new Promise((resolve) => {
    wx.checkSession({
      success:() => {
        resolve(true)
      },
      fail:() => {
        resolve(false)
      }
    })
  })
}

export function getUserInfo(){
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc:'1111',
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}