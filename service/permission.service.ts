import { client } from './httpClient'

import type { QueryPermissionList } from '~/models/permission.model'

export const getPermissionList = (payload: QueryPermissionList) => {
  return client({
    url: '/md/permission/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}

export const updateStatusPermissison = (id: string, IsActive: boolean) => {
  return client({
    url: `/md/permission/${id}`,
    method: 'patch',
    data: {
      is_active: IsActive,
    },
  })
}

export const updatePermissison = (id: string, payload: QueryPermissionList) => {
  return client({
    url: `/md/permission/${id}`,
    method: 'patch',
    data: {
      ...payload,
    },
  })
}
