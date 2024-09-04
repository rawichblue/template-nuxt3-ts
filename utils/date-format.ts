export function formatDate(datestring: string) {
    if (datestring == '') {
      return ''
    }
    let date = new Date(datestring)
    let day: any = date.getDate()
    let month: any = date.getMonth() + 1
    let year: any = date.getFullYear()
  
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
  
    return day + '/' + month + '/' + year
  }
  