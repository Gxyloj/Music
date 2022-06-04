const BASE_URL = 'http://123.207.32.32:9001'

class MusicRequest{
  request(url,method,params){
    return new Promise((resolve,reject) => {
      wx.request({
        url: BASE_URL + url,
        method:method,
        data:params,
        header:{
          "cookie":"__remember_me=true; __csrf=b0d9ed116bc1a8e21bc24a4d14251313; MUSIC_U=861e925150745e2a2f825434d3ee6ffb5ccd1e6e5fb11054b371bd2ae445e370993166e004087dd3c0d2a9a29ac8ae74c89d6380a9420866587cbf85bd4304e9ec223a10bb626d2dad8b3b53860f12d6; NMTID=00OseHlzT3VXPXkyU_OtPJb17lf6-wAAAGBI6_dqQ"//临时cookie
        },
        success:res => {
          resolve(res)
        },
        fail:err => {
          reject(err)
        }
      })
    })


  }
  get(url,params){
    return this.request(url,'GET',params)
  }
  post(url,data){
    return this.request(url,'POST',data)
  }
}

const OJRequest = new MusicRequest()

export default OJRequest
