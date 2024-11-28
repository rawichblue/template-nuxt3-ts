import { client } from './httpClient'

import type { QueryRoleList } from '~/models/role.model'

export const getRoleList = (payload: QueryRoleList) => {
  return client({
    url: 'role/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}
