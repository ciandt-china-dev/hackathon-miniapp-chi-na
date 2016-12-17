'use strict'


Page({
  data: {
    locationSrc: '../../image/icon_index_white.png',
    addressSrc: '../../image/icon_address_white.png',
    latitude:'',
    longitude:'',
    address:''
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getLocation: function(e) {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        page.setData({
            latitude :res.latitude,
            longitude :res.longitude
        })
      }
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
          address:res.address
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