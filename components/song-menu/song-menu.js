const app = getApp()
Component({
  properties: {
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
