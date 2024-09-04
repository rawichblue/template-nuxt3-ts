export const errorResp = (error: any) => { 
    if (error) {
      var httpCode = error.status
      var message = error.data?.message || ''
      var payloadCode = error.data.code
  
      if (httpCode == 403 || httpCode == 401) {
        swalToast({
          icon: 'error',
          title: 'Unauthorized',
        })
        setTimeout(() => {
          logout()
        }, 1000)
        return false
      }
  
      // switch (payloadCode) {
      //   case '400':
      //     message = 'blueeeeeeeeeeeeee'
      //     break
      // }
  
      swalToast({
        icon: 'error',
        title: message,
      })
    }
  }
  