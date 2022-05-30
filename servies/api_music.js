import OJRequest from './requset'

export function getBanner(){
  return OJRequest.get('/banner',{
    type:2
  })
}

