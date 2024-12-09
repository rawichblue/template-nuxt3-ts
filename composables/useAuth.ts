import service from '~/service'
import { useIndexStore } from '~/store/main'

export const verify = async () => {
  var refToken: any = useStatefulCookie('token')
  const store = useIndexStore()

  if (refToken.value) {
    await service.auth
      .getUserInfo()
      .then(async (resp: any) => {
        const { data } = resp.data
        store.$state.user.id = data.ID
        store.$state.user.image = data.images
        store.$state.user.name = data.name
        store.$state.user.role_id = data.role_id
        store.$state.user.user_id = data.user_id
        store.$state.user.email = data.Email
      })
      .catch((err: any) => {
        errorResp(err.response)
      })
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
