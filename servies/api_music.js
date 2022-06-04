import OJRequest from './requset'

export function getBanner() {
  return OJRequest.get('/banner', {
    type: 2
  })
}


// export function getRankings(idx) {
//   return OJRequest.get('/top/list', {
//     idx
//   })
// }
//上方的获取热门列表需要登录
//首页第一个列表换成推荐新音乐

export function getPersonalizedNewSong(limit = 10) {
  return OJRequest.get('/personalized/newsong', {
    limit
  })
}

export function getSongMenu(cat = '全部', limit = 8, offset = 0) {
  return OJRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}
//获取全部榜单
export function getAllTopList(){
    return OJRequest.get('/toplist')
}
//获取具体榜单
export function getRanking(id){
  return OJRequest.get('/playlist/detail',{
    id
  })
}
//获取歌单详情数据
export function getSongMenuDetail(id){
  return OJRequest.get('/playlist/detail/dynamic',{
    id
  })
}

//获取热门歌单的分类tag和id
export function getHotPlayList(){
  return OJRequest.get('/playlist/hot')
}

export function getSongDetail(ids){
  return OJRequest.get('/song/detail',{
    ids
  })
}