const app = getApp()
Component({
  properties: {
    title: {
      type: String,
      default: '默认标题'
    },
    songMenu: {
      type: Array,
      default: []
    }
  },
  data: {
    screenWidth: app.globalData.screenWidth
  },
  methods: {
    handleMenuItemClick(e) {
      const item = e.currentTarget.dataset.item
      wx.navigateTo({
        url:`/pages/detail-songs/detail-songs?id=${item.id}&type=menu`
      })
    }
  }
});
