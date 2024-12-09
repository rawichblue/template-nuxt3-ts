import { client } from './httpClient'
import type { FormLogin } from '~/models/auth.model'

export const login = (payload: FormLogin) => {
  return client({
    url: `auth/login`,
    method: 'post',
    data: {
      ...payload,
    },
  })
}

export const getUserInfo = () => {
  return client({
    url: `auth/getInfo`,
    method: 'get',
  })
}
