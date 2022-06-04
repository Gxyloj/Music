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
      wx.navigateTo({
        url:`/pages/music-player/music-player?id=${id}`
      })
    }
  }
});
