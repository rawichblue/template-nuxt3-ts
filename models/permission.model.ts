export interface GetPermissionList {
  datas: PermissionList[]
  query: QueryPermissionList
  loading: boolean
  paginate: Paginate | null
}

export interface PermissionList {
  Id: number
  IsActive: boolean
  Name: string
  Group: string
  Description: string
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

export interface CreatePermission {
  IsActive: boolean
  Name: string
  Group: string
  Description: string
}
