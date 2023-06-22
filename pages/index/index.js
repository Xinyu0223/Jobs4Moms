// index.js
Component({
  // 页面持有的数据
  data: {
    // todo-list数据
    items: [],
    // 输入框当前内容
    inputedValue: "",
  },

lifetimes: {
  attached() {
    this.login()
  },
},

methods: {
  // 登录函数
  // 注意它有一个参数: callback本身是个函数
  login(callback = (() => {})) {
    if (!this.isTokenAvailable()) {
      console.log('Get Token from dj.')
      // 获取token并传入callback
      this.getToken(callback)
    } else {
      console.log('Get Token from storage.')
      // 如果缓存中token未过期则直接执行callback
      callback()
    }
  },
  getToken(callback) {
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
              const access = res.data.access
              // 将token保存到缓存
              wx.setStorage({ key: "access", data: access })
              // 保存token的获取时间
              wx.setStorage({
                key: "access_time",
                data: Date.parse(new Date())
              })

              // --------------
              // 步骤三：用token获取用户数据
              // --------------

              wx.request({
                url: 'http://127.0.0.1:8000/api/weixin/data/',
                header: {
                  // 注意字符串 'Bearer ' 尾部有个空格！
                  'Authorization': 'Bearer ' + access
                },
                success: res => {
                  // 增加此句
                  // 调用callback
                  // 以便在登录完成后执行后续动作
                  callback()
                }
              })
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
  },
  // ...
},
})

