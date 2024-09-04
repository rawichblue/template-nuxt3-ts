import service from '~/service'
import { useIndexStore } from '~/store/main'

export const verify = async () => {
  var refToken: any = useStatefulCookie('token')
  const store = useIndexStore()
  
  if (refToken.value) {
    // await service.user
    //   .getCurrentInfo()
    //   .then(async (resp: any) => {
    //     const { data } = resp.data
    //   })
    //   .catch((err: any) => {
    //     errorResp(err.response)
    //   })
  }
}

export const logout = async () => {
  const route = useRoute()
  const router = useRouter()
  const token = useStatefulCookie('token')
  token.value = null
  router.push(`/login`)
  location.reload()
}

