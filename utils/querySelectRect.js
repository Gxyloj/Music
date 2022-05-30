export function querySelectRect(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    //获取.swiper-image这个元素的属性 比如位置 宽高
    query.select(selector).boundingClientRect()
    //相对于视窗的滚动位置
    // query.selectViewport().scrollOffset()
    // query.exec((res) => {
    //   // res[0].top //节点的上边界坐标
    //   // res[1].scrollTop // 显示区域的竖直滚动位置
    //   const rect = res[0]
    //   this.setData({
    //     swiperHeight: rect.height
    //   })
    // })
    query.exec(resolve)

  })
}
