// const BASE_URL = 'http://123.207.32.32:9001'
const BASE_URL = 'https://netease-cloud-music-api-seven-zeta.vercel.app/'
const LOGIN_BASE_URL = 'http://123.207.32.32:3000'

const token = wx.getStorageSync('token')

class MusicRequest{
  constructor(baseURL,authHeader ) {
    this.baseURL = baseURL
    this.authHeader = authHeader || {
        "cookie":" NMTID=00OseHlzT3VXPXkyU_OtPJb17lf6-wAAAGBI6_dqQ"//临时cookie
    }
  }

  request(url,method,params,isAuth = false,header = {}){
    const finalHeader = isAuth ? {...this.authHeader,...header} : header

    return new Promise((resolve,reject) => {
      wx.request({
        url: this.baseURL + url,
        method:method,
        header:finalHeader,
        data:params,
        // header:{
        //   "cookie":"__remember_me=true; __csrf=b0d9ed116bc1a8e21bc24a4d14251313; MUSIC_U=861e925150745e2a2f825434d3ee6ffb5ccd1e6e5fb11054b371bd2ae445e370993166e004087dd3c0d2a9a29ac8ae74c89d6380a9420866587cbf85bd4304e9ec223a10bb626d2dad8b3b53860f12d6; NMTID=00OseHlzT3VXPXkyU_OtPJb17lf6-wAAAGBI6_dqQ"//临时cookie
        // },
        success:res => {
          resolve(res)
        },
        fail:err => {
          reject(err)
        }
      })
    })


  }
  get(url,params,isAuth = false,header){
    return this.request(url,'GET',params,isAuth,header)
  }
  post(url,data,isAuth = false,header){
    return this.request(url,'POST',data,isAuth,header)
  }
}

const OJRequest = new MusicRequest(BASE_URL)
const OJLoginRequest = new MusicRequest(LOGIN_BASE_URL,{
  token
})

export default OJRequest
export {
  OJLoginRequest
}
