'use strict'



Page({
  data: {
    locationSrc: '../../image/icon_index_white.png',
    addressSrc: '../../image/icon_address_white.png'
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
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
      }
    })
  }
})