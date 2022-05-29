import OJRequest from './requset'

export function getTopMV(offset,limit = 10){
  return OJRequest.get('/top/mv',{
    offset,
    limit
  })
}

export function getMVURL(id){
  return OJRequest.get('/mv/url',{
    id
  })
}

export function getMVDetail(mvid){
  return OJRequest.get('/mv/detail',{
    mvid
  })
}

export function getMVRelated(id){
  return OJRequest.get('/related/allvideo',{
    id
  })
}