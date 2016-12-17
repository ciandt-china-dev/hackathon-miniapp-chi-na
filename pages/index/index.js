'use strict'


Page({
  data: {
    locationSrc: '../../image/icon_index_white.png',
    latitude:'',
    longitude:'',
    address:'',
    nearby:[],
    shops:[],
    random_shop_id:'',
    random_shop_name:'',
    myAddressPicker: {
      array: ['家', '单位'],
      index: 0
    },
    myAddress:[],
  },

  bindPickerChange: function(e) {
    var page = this;
    this.setData({
      address: page.data.myAddress[e.detail.value][2]
    })
  },

  onLoad:function(options){
    var page = this;
    var myAddressdata = "0###家###印象城|||1###公司###和邦大厦";
    console.log(myAddressdata);
    var data_result = new Array();
    var data_array = myAddressdata.split("|||");
    for (var i = data_array.length-1; i >=0 ; i--) {
      var store_detail_array = data_array[i].split("###");
      data_result[data_array.length-i-1] = store_detail_array;
    };
    page.data.myAddress = data_result;
    console.log(data_result);


    // wx.getStorage({
    //   key: 'myaddress',
    //   success: function(res) {
    //     res.data = "0###家###鄞州区印象城|||1###公司###和邦大厦"
    //     if (res.data) {
    //       var data_result = new Array();
    //       var data_array = res.data.split("|||");
    //       for (var i = data_array.length-1; i >=0 ; i--) {
    //         var store_detail_array = data_array[i].split("###");
    //         data_result[data_array.length-i-1] = store_detail_array;
    //       };
    //       page.data.myAddress = data_result;
    //       console.log(data_result);
    //     }else{
    //       console.log('None');
    //     };
    //   },
    //   fail: function() {
    //     console.log('Fail');
    //   }
    // })
    wx.getLocation({

      type: 'wgs84',
      success: function(res) {
        page.setData({
            latitude :res.latitude,
            longitude :res.longitude
        })

        wx.request({
          url: 'https://wechatcitdevhfzdlijkdc.devcloud.acquia-sites.com/geocoder/v2',
          data:{
            location:page.data.latitude+','+page.data.longitude,
            output:'json',
            pois:1,
            ak:'RGOaR2I5rcjRGy5k8Rg5Wa3C'
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
          'Content-Type': 'application/json'
          }, // 设置请求的 header
          success: function(res){
            page.setData({
              nearby:res,
              address:res.data.result.addressComponent.street
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete

          }
        })
      }
    })
  },

  randomShop: function(e) {
    var page = this
    var keyword = page.data.address
    wx.request({
      url: 'http://www.dianping.com/search/map/ajax/json',
      data: 'cityId=11&cityEnName=ningbo&shopType=10&categoryId=10&shopSortItem=1&keyword='+keyword+'&searchType=1',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res){
        // success
        // console.log('success')
        page.setData({
            shops: res.data.shopRecordBeanList
        })
      },
      fail: function() {
              // fail
      },
      complete: function() {
              // complete
      }
    })
   //生成0到19的随机数
   var randomNum = Math.ceil(Math.random()*19)

   console.log(page.data.shops[randomNum].shopId)
   page.setData({
     random_shop_id:page.data.shops[randomNum].shopId,
     random_shop_name:page.data.shops[randomNum].shopName
   })
    var targetUrl = '/pages/detail/detail'
    if(e.currentTarget.dataset.shopId != null)
      targetUrl = targetUrl + '?shopId=' + e.currentTarget.dataset.shopId+'&shopName='+e.currentTarget.dataset.shopName
    wx.navigateTo({
      url: targetUrl
    })

  },

  //选择位置
  locationTap: function(e){
    var page = this
    wx.chooseLocation({
      success: function(res){
        // success
        // console.log(res.address)
        page.setData({
          address:res.name
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
