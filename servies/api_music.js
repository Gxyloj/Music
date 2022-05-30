import OJRequest from './requset'

export function getBanner() {
  return OJRequest.get('/banner', {
    type: 2
  })
}

export function getRankings(idx) {
  return OJRequest.get('/top/list', {
    idx
  })
}

//上方的获取热门列表需要登录
//首页第一个列表换成推荐新音乐

export function getPersonalizedNewSong(limit = 10) {
  return OJRequest.get('/personalized/newsong', {
    limit
  })
}

export function getSongMenu(cat = '全部', limit = 6, offset = 0) {
  return OJRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}