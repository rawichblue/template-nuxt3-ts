export interface GetRoleList {
  datas: RoleList[]
  query: QueryRoleList
  loading: boolean
  paginate: Paginate | null
}

export interface RoleList {
  ID: string
  Name: string
  Description: string
  IsActived: boolean
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
  is_actived: boolean
}

export interface SetPermission {
  role_id: string
  permission_ids: number[]
}
