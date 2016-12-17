// pages/my/my.js
Page({
  data:{},
  onLoad:function(options){
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var page = this;
    wx.getStorage({
      key: 'myfavorite',
      success: function(res) {
        if (res.data) {
          var data_result = new Array();
          var data_array = res.data.split("|||");
          for (var i = 0; i < data_array.length; i++) {
            var store_detail_array = data_array[i].split("###");
            data_result['num_'+store_detail_array[4]+"_"+store_detail_array[0]] = store_detail_array;
          };
          page.setData({
            myfavorite_shops: data_result
          })
          console.log(data_result);
        }else{
          console.log('None');
        };
      },
      fail: function() {
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clearFavorite:function(){
    try {
        wx.removeStorageSync('myfavorite')
    } catch(e) {
      // Do something when catch error
    }
  }
})