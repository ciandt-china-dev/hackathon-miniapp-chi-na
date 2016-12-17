// pages/detail/detail.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  setFavorite:function(){
    var store_id = "4";
    var title = "title"+store_id;
    var address_info = "address_info"+store_id;
    var image_path = "image_path"+store_id;
    //id###title+###address###pic###num
    var store_info = store_id+"###"+title+"###"+address_info+"###"+image_path+"###"+"1";
    wx.getStorage({
      key: 'myfavorite',
      success: function(res) {
        if (res.data) {
          var data_array = res.data.split("|||");
          var this_id = -1;
          for (var i = 0; i < data_array.length; i++) {
            var store_detail_array = data_array[i].split("###");
            if (store_detail_array[0] == store_id) {
              this_id = i;
              store_detail_array[4] = parseInt(store_detail_array[4])+1;
              var store_detail = store_detail_array.join("###");
              data_array[i] = store_detail;
              var data_update = data_array.join("|||");
              data_update = data_update;
              break;
            };
          };
          if (this_id == -1) {
            res.data = res.data+"|||"+store_info;
            try {
              wx.setStorageSync('myfavorite', res.data);
              console.log(res.data);
            } catch (e) {  
              console.log('Add new store fail');  
            }
          }else{
            try {
              wx.setStorageSync('myfavorite', data_update);
              console.log(res.data);
            } catch (e) {  
              console.log('Update new store fail');  
            }
          }
        }
      },
      fail: function() {
        try {
            wx.setStorageSync('myfavorite', store_info);
            console.log(store_info);
        } catch (e) {  
            console.log('Add new key fail');  
        }
        
      }
    })
  },
})