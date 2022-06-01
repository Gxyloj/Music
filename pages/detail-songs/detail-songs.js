import rankingStore from "../../store/ranking-store";
import {getPersonalizedNewSong} from "../../servies/api_music";

Page({
  data: {
    rankingName: '',
    rankingList: {},
  },
  getRankingListHandler(res) {
    this.setData({rankingList: res})
  },
  onLoad: function(options) {
    this.setData({rankingName:options.rankingName})
    rankingStore.onState(this.data.rankingName, this.getRankingListHandler)
  },
  onUnload() {
    rankingStore.offState(this.data.rankingName, this.getRankingListHandler)
  }
});