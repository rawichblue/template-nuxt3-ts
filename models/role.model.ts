export interface GetRoleList {
  datas: RoleList[]
  query: QueryRoleList
  loading: boolean
  paginate: Paginate | null
}

export interface RoleList {
  id: string
  name: string
  description: string
  is_active: boolean
}

export interface Paginate {
  page: number
  size: number
  total: number
}

export interface QueryRoleList {
  page: number
  size: number
  search: string
}

export interface CreateUpdateRole {
  name: string
  description: string
  is_active: boolean
}

export interface SetPermission {
  role_id: number | null
  permission_ids: number[]
}
