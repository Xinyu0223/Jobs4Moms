// pages/job-submission/job-submission.js
Component({
  behaviors: ['wx://form-field-group'],
  data: {

  },
  methods: {
    formSubmit: function (e) {
      this.setData({
        value: e.detail.value,
      })

      wx.request({
        url: 'http://127.0.0.1:8000/api/job_post/job_post/',
        method: 'POST',
        data: {
          form: e.detail.value
        },
        success: res => {
          console.log('job submitted successfully.')
          wx.redirectTo({
            url: '../employer-home/employer-home',
          })
        }
      })
            
    }
  }
 })