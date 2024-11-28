export interface GetPermissionList {
  datas: PermissionList[]
  query: QueryPermissionList
  loading: boolean
  paginate: Paginate | null
}

export interface PermissionList {
  test: string
}

export interface Paginate {
  page: number
  size: number
  total: number
}

export interface QueryPermissionList {
  page: number
  size: number
  search: string
}
