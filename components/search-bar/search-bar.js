// components/search-bar/search-bar.js
/**
 * 搜索框
 * @event <focus> <input> <clear> <hide> <search>
 */
// componests/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isnavigator:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInputEvent:function(event){
      // console.log(event);
  // 传参
      var value = event.detail.value;
      var detail = {"value":value}; 
          // triggerevent（”event“）触发某一个事件
      this.triggerEvent("search_event",detail);
    }
  }
})


