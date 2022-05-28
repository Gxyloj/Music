import OJRequest from './requset'

export function getTopMV(offset,limit = 10){
  return OJRequest.get('/top/mv',{
    offset,
    limit
  })
}