export interface GetEmpolyeeList {
  datas: EmpolyeeList[]
  query: QueryEmpolyeeList
  loading: boolean
  paginate: Paginate | null
}

export interface EmpolyeeList {
  test: string
}

export interface Paginate {
  page: number
  size: number
  total: number
}

export interface QueryEmpolyeeList {
  page: number
  size: number
  search: string
}
