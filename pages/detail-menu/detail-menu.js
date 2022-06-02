import {getHotPlayList, getSongMenu} from "../../servies/api_music";

Page({
  data: {
    index: 0,
    tags: [],
    menuList: {}
  },
  getMoreMenu() {
    getSongMenu(this.data.tags[this.data.index]).then(res => {
      this.setData({index: this.data.index + 1})
      const originMenuList = {...this.data.menuList, [this.data.index]: res.data}
      this.setData({menuList: originMenuList})
    })
  },
  handleGoDetail(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail-songs/detail-songs?id=${id}&type=menu`
    })
  },
  onLoad: function(options) {
    getHotPlayList().then(res => {
      //拿到所有的tag
      const tagList = []
      res.data.tags.forEach(item => {
        tagList.push(item.name)
      })
      this.setData({tags: tagList})
      //先请求第一个tag对应的数据
      this.getMoreMenu()
    })

  },
  onReachBottom() {
    //拉到底 获取下一个tag的数据
    this.getMoreMenu()
  }
});