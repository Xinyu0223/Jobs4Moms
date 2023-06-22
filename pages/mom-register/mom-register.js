// pages/mom-register/mom-register.js
Component({
  behaviors: ['wx://form-field-group'],
  data: {

  },
  methods: {
    formSubmit: function (e) {
      this.setData({
        value: e.detail.value,
      })

      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code)
            wx.request({
              url: 'http://127.0.0.1:8000/api/weixin/mom-register/',
              method: 'POST',
              data: {
                form: e.detail.value,
                code: res.code
              },
              success: res => {
                console.log('mom registered successfully.')
                wx.redirectTo({
                  url: '../mom-home/mom-home',
                })
              }
            })
            
          }

      
      }
      })
    }
  }
 })
 