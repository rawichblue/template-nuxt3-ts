import { client } from './httpClient'

import type { QueryPermissionList } from '~/models/permission.model'

export const getPermissionList = (payload: QueryPermissionList) => {
  return client({
    url: 'permission/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}
