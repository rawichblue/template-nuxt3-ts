import { client } from './httpClient'

import type { QueryRoleList } from '~/models/role.model'

export const getPermissionList = (payload: QueryRoleList) => {
  return client({
    url: 'role/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}
