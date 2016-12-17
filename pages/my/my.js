// pages/my/my.js
Page({
  data:{
    myfavorite_shops:[],
  },

  onItemClick(e){
    var targetUrl = '/pages/detail/detail'
    if(e.currentTarget.dataset.shopId != null)
      targetUrl = targetUrl + '?shopId=' + e.currentTarget.dataset.shopId+'&shopName='+e.currentTarget.dataset.shopName
    wx.navigateTo({
      url: targetUrl
    })
  },

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
          for (var i = data_array.length-1; i >=0 ; i--) {
            var store_detail_array = data_array[i].split("###");
            data_result[data_array.length-i-1] = store_detail_array;
          };
          page.data.myfavorite_shops = data_result;
          console.log(data_result);
        }else{
          console.log('None');
        };
      },
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clearFavorite:function(){
    wx.clearStorageSync('myfavorite')
    wx.redirectTo({ url: 'my' })
  }
})