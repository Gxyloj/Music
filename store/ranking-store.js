import { HYEventStore } from '../miniprogram_npm/hy-event-store/index'

import { getRankings } from '../servies/api_music'

const rankingStore = new HYEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    getRankingDataAction(ctx) {
      getRankings(1).then(res => {
        // ctx.hotRanking = res.playlist
        // console.log('这里要改-----',res);//TODO 接口要登录了
      })
    }
  }
})

export {
  rankingStore
}
