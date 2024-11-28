export interface GetRoleList {
  datas: RoleList[]
  query: QueryRoleList
  loading: boolean
  paginate: Paginate | null
}

export interface RoleList {
  test: string
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
