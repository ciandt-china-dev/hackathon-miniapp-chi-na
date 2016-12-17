'use strict'


Page({
  data: {
    locationSrc: '../../image/icon_index_white.png',
    addressSrc: '../../image/icon_address_white.png',
    latitude:'',
    longitude:'',
    address:'',
    nearby:[],
    shops:[],
    random_shop_id:'',
    random_shop_name:''
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})