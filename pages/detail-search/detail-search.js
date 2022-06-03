// pages/detail-search/detail-search.js
import {getSearchHot, getSearchResult, getSearchSuggest} from "../../servies/api_search";
import debounce from "../../utils/debouce";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWords: [],
    searchValue: '',
    suggestResult: [],
    suggestResultNodes: [],
    resultSongsList:[],
  },
  handleInputChange(e) {
    const searchValue = e.detail
    this.setData({searchValue: e.detail})
    //
    if (!searchValue) {
      this.setData({suggestResult: []})
      return
    }
    //请求搜索建议
    debounceGetSearchSuggest(searchValue).then(res => {
      const suggestResult = res.data.result.allMatch
      //转成node节点
      //把结果取出来放到一个suggestKeywords数组里
      const suggestKeywords = suggestResult.map(item => item.keyword)
      const suggestResultNodes = []
      //遍历这个数组
      for (const keyword of suggestKeywords) {
        const nodes = []
        //如果  结果  是以 搜索关键字searchValue开头的
        if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())) {
          //截出前面 即searchValue拆出来   和剩下的
          const key1 = keyword.slice(0, searchValue.length)
          const node1 = {
            name: 'span',
            attrs: {
              style: 'color:#26ce8a;'
            },
            children: [{type: 'text', text: key1}]
          }
          nodes.push(node1)
          const key2 = keyword.slice(searchValue.length)
          const node2 = {
            name: 'span',
            attrs: {
              style: 'color:#000000;'
            },
            children: [{type: 'text', text: key2}]
          }
          nodes.push(node2)
        } else {
          const node = {
            name: 'span',
            attrs: {
              style: 'color:#000000;'
            },
            children: [{type: 'text', text: keyword}]
          }
          nodes.push(node)
        }
        suggestResultNodes.push(nodes)
      }
      this.setData({suggestResultNodes: suggestResultNodes})
      this.setData({suggestResult: res.data.result.allMatch})
    })

  },
  //热门搜索关键字点击
  handleHotKeywordClick(e){
    const keyword = e.currentTarget.dataset.item
    this.setData({searchValue:keyword})
    this.handleSearchAction()
  },
  //搜索结果item点击
  handleSuggestItemClick(e){
    //点的第几个 获取index
    const index = e.currentTarget.dataset.index
    //取出 所有结构数组中的第index个
    const keyword = this.data.suggestResult[index].keyword
    //把搜索建议赋值给searchValue  发送请求
    this.setData({searchValue:keyword})
    this.handleSearchAction()
  },
  //搜索
  handleSearchAction(){
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({resultSongsList:res.data.result.songs})
      this.setData({suggestResultNodes:[]})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getSearchHot().then(res => {
      this.setData({hotKeyWords: res.data.result.hots})
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})