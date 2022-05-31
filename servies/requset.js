const BASE_URL = 'http://123.207.32.32:9001'

class MusicRequest{
  request(url,method,params){
    return new Promise((resolve,reject) => {
      wx.request({
        url: BASE_URL + url,
        method:method,
        data:params,
        header:{
          "cookie":"NMTID=00OikdfwZRockz0OUD1oOR7ca0f-owAAAGBGRgEtw;"//临时cookie
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
