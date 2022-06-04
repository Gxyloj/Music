import {HYEventStore} from "hy-event-store";
import {getAllTopList, getRanking} from "../servies/api_music";


const rankingStore = new HYEventStore({
  state: {
    // rankingID: {
    //   up: 0,
    //   new: 0,
    //   original: 0,
    //   hot: 0
    // },
    // rankingList: {
    //   up: {},//飙升榜
    //   new: {},//新歌榜
    //   original: {},//原创榜
    //   hot: {}//热歌榜
    // },
    // getRankingAllDone:false
    upRankingID: 0,
    upRankingList: {},
    newRankingID: 0,
    newRankingList: {},
    originalRankingID: 0,
    originalRankingList: {},
    hotRankingID: 0,
    hotRankingList: {}
  },
  actions: {
    // getRankingDataAction(ctx) {
    //   //先获取所有榜单
    //   getAllTopList().then(res => {
    //     // console.log(res.data.list);
    //     res.data.list.forEach(item => {
    //         switch (item.name) {
    //           case '飙升榜':
    //             ctx.rankingID.up = item.id
    //             break;
    //           case '新歌榜':
    //             ctx.rankingID.new = item.id
    //             break;
    //           case '原创榜':
    //             ctx.rankingID.original = item.id
    //             break;
    //           case '热歌榜':
    //             ctx.rankingID.hot = item.id
    //             break;
    //         }
    //       }
    //     )
    //     //获取具体的4个榜单
    //     for (let item in ctx.rankingID) {
    //       getRanking(ctx.rankingID[item]).then(res => {
    //         ctx.rankingList[item] = res.data.playlist
    //       })
    //     }
    //     ctx.getRankingAllDone = true
    //   })
    // }
    async getRankingDataAction(ctx) {
      //获取4个榜单的ID
      await getAllTopList().then(res => {
        res.data.list.forEach(item => {
            switch (item.name) {
              case '飙升榜':
                ctx.upRankingID = item.id
                break;
              case '新歌榜':
                ctx.newRankingID = item.id
                break;
              case '原创榜':
                ctx.originalRankingID = item.id
                break;
              case '热歌榜':
                ctx.hotRankingID = item.id
                break;
            }
          }
        )
      })
      //请求4个榜单的数据
      getRanking(ctx.hotRankingID).then(res => {
        ctx.hotRankingList = res.data.playlist
      })
      getRanking(ctx.upRankingID).then(res => {
        ctx.upRankingList = res.data.playlist
      })
      getRanking(ctx.newRankingID).then(res => {
        ctx.newRankingList = res.data.playlist
      })
      getRanking(ctx.originalRankingID).then(res => {
        ctx.originalRankingList = res.data.playlist
      })

    }
  }
})

// export {
//   rankingStore
// }

export default rankingStore