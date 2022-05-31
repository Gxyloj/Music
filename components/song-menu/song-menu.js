const app = getApp()
Component({
  properties: {
    title:{
      type:String,
      default:'默认标题'
    },
    songMenu:{
      type:Array,
      default:[]
    }
  },
  data: {
    screenWidth:app.globalData.screenWidth
  },
  methods: {}
});
