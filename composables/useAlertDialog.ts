import Swal, { type SweetAlertIcon } from 'sweetalert2'

interface Toast {
  icon: string
  title: string
}

interface Alert {
  icon: SweetAlertIcon
  title: string
  text?: string | null
}

export const swalToast = (payload: Toast) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: payload.icon as SweetAlertIcon,
    title: payload.title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  if (payload.title === 'Unauthorized') {
    setTimeout(() => {
      logout()
    }, 1000)
  }
}

export const showAlert = (payload: Alert) => {
  Swal.fire({
    icon: payload.icon as SweetAlertIcon,
    title: payload.title,
    text: payload?.text || '',
  })
}

export const showAlertConfirm = (payload: Alert) =>
  new Promise((resolve) => {
    Swal.fire({
      icon: payload.icon as SweetAlertIcon,
      title: payload.title,
      text: payload?.text || '',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#9d9d9d',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((resp: any) => {
      if (resp.isConfirmed) {
        return resolve(true)
      }
      return resolve(false)
    })
  })

export const showAlertConfirmDelete = (payload: Alert) =>
  new Promise((resolve) => {
    Swal.fire({
      icon: payload.icon as SweetAlertIcon,
      title: payload.title,
      text: payload?.text || '',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#9d9d9d',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((resp: any) => {
      if (resp.isConfirmed) {
        return resolve(true)
      }
      return resolve(false)
    })
  })
