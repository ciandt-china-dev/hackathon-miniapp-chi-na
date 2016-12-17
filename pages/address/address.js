'use strict'


Page({
  data: {
    myaddress:[],
  },
  onShow:function(){
    var page = this;
    wx.getStorage({
      key: 'myaddress',
      success: function(res) {
        if (res.data) {
          var data_result = new Array();
          var data_array = res.data.split("|||");
          for (var i = data_array.length-1; i >=0 ; i--) {
            var store_detail_array = data_array[i].split("###");
            data_result[data_array.length-i-1] = store_detail_array[2];
          };
          page.data.myaddress = data_result;
        }else{
          console.log('None');
        };
      },
      fail: function() {
        console.log('Fail');
      }
    })
  },
  formSubmit: function(e) {
    var myAddressdata = "0###家###"+e.detail.value.address_0+"|||1###公司###"+e.detail.value.address_1;
    try {
      wx.setStorageSync('myaddress', [e.detail.value.address_0, e.detail.value.address_1]);
    } catch (e) {
      console.log('Add myAddressdata fail');
    }
  },
})