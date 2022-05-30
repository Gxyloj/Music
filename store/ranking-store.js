import {HYEventStore} from "hy-event-store";


const rankingStore = new HYEventStore({
  state:{
    hotRanking:{}
  },
  actions:{
    getRankingDataAction(){

    }
  }
})

