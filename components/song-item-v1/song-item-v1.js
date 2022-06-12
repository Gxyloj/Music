import {playerStore} from "../../store/player-store";

Component({
  properties: {
    item:{
      type:Object,
      default:{}
    }
  },
  data: {},
  methods: {
    songItemClick(e) {
      const id = e.currentTarget.dataset.id
      playerStore.dispatch('playMusicWithIDAction',id)
      playerStore.setState('playListSongs')
      wx.navigateTo({
        url:`/pages/music-player/music-player?id=${id}`
      })

    }
  }
});
