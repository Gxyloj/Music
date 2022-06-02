import rankingStore from "../../store/ranking-store";
import {getPersonalizedNewSong, getSongMenuDetail} from "../../servies/api_music";

Page({
  data: {
    type:'',
    rankingName: '',
    songsList: {},
  },
  getRankingListHandler(res) {
    this.setData({songsList: res})
  },
  onLoad: function(options) {
    const type = options.type
    this.setData({type:type})
    if (type === 'menu') {//数据为歌单
      const id = options.id
      getSongMenuDetail(id).then(res => {
        this.setData({songsList:res.data.playlist})
      })
    } else if (type === 'ranking') {//数据为四大榜单
      this.setData({rankingName: options.rankingName})
      rankingStore.onState(this.data.rankingName, this.getRankingListHandler)
    }

  },
  onUnload() {
    if (!this.data.rankingName) return
    rankingStore.offState(this.data.rankingName, this.getRankingListHandler)
  }
});