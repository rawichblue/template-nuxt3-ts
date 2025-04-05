import { client } from './httpClient'

import type {
  QueryRoleList,
  CreateUpdateRole,
  SetPermission,
} from '~/models/role.model'

export const createRole = (payload: CreateUpdateRole) => {
  return client({
    url: 'md/role/create',
    method: 'post',
    data: {
      ...payload,
    },
  })
}

export const setPermission = (payload: SetPermission) => {
  return client({
    url: 'md/role/set-permission',
    method: 'post',
    data: {
      ...payload,
    },
  })
}

export const getPermissionByRoleId = (id: string) => {
  return client({
    url: `md/role/get-permission/${id}`,
    method: 'get',
  })
}

export const getById = (id: string) => {
  return client({
    url: `md/role/${id}`,
    method: 'get',
  })
}

export const getRoleList = (payload: QueryRoleList) => {
  return client({
    url: 'md/role/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}

export const updateRole = (id: string, payload: CreateUpdateRole) => {
  return client({
    url: `md/role/${id}`,
    method: 'patch',
    data: {
      ...payload,
    },
  })
}

export const deleteRole = (id: string) => {
  return client({
    url: `md/role/${id}`,
    method: 'delete',
  })
}

export const updateStatusRole = (id: string, IsActive: boolean) => {
  return client({
    url: `/md/role/toggle-status/${id}`,
    method: 'patch',
    data: {
      is_active: IsActive,
    },
  })
}
