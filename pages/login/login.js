// index.js
Page({

  data: {
    message: ''
  },

  // 登录函数
  // 注意它有一个参数: callback本身是个函数
  login() {
    if (!this.isTokenAvailable()) {
      console.log('Get Token from dj.')
      // 获取token并传入callback
      this.getToken()
    } else {
      console.log('Get Token from storage.')
      // 如果缓存中token未过期则直接执行callback
      const user_group = wx.getStorageSync('user_group')
      if (user_group == 'mom') {
        console.log('mom group')
        wx.redirectTo({
          url: '../mom-home/mom-home',
        })
      } else if (user_group == 'employer') {
        wx.redirectTo({
          url: "../employer-home/employer-home",
        })
      } else {
        console.log('admin log in')
      }
    }
  },
  getToken() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {

          // --------------
          // 步骤二：用code换取token
          // --------------

          wx.request({
            url: 'http://127.0.0.1:8000/api/weixin/login/',
            method: 'POST',
            data: {
              code: res.code
            },
            success: res => {
              // 在小程序调试器中查看是否收到token
              console.log(res)
              if (res.data.code == 'success') {
                const access = res.data.access
                const user_group = res.data.user_group
                // 将token保存到缓存
                wx.setStorageSync('access', access)
                wx.setStorageSync("user_group", user_group)
                // 保存token的获取时间
                wx.setStorage({
                  key: "access_time",
                  data: Date.parse(new Date())
                })

                if (user_group == 'mom') {
                  console.log('mom group')
                  wx.redirectTo({
                    url: '../mom-home/mom-home',
                  })
                } else if (user_group == 'employer') {
                  wx.redirectTo({
                    url: "../employer-home/employer-home",
                  })
                } else {
                  console.log('admin log in')
                }
              } else {
                that.setData({
                  message: '请注册账号！',//赋值
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 返回布尔值，检查token是否过期
  isTokenAvailable() {
    const now = Date.parse(new Date());
    try {
      const accessTime = wx.getStorageSync('access_time')
      if ((accessTime !== '') && (now - accessTime < 5 * 60 * 1000)) {
        return true
      }
    } catch {
      // do something...
    }
    return false
  }
  // ...

})

