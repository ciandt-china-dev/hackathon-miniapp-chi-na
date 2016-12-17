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
          console.log(res.data)
          var data_result = new Array();
          var data_array = res.data.split("|||");
          for (var i = 0; i < data_array.length ; i++) {
            var store_detail_array = data_array[i].split("###");
            data_result[i] = store_detail_array[2];
          };
          page.data.myaddress = data_result;
          console.log(data_result);
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
      wx.setStorageSync('myaddress', myAddressdata);
      wx.redirectTo({ url: 'address' })
    } catch (e) {
      console.log('Add myAddressdata fail');
    }
  },
})