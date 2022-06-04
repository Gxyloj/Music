Component({
  properties: {
    index: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: {}
    }
  },
  data: {},
  methods: {
    handleSongItemClick(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url:`/pages/music-player/music-player?id=${id}`
      })
    }
  }
});
