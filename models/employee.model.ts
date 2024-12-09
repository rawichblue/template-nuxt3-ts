export interface GetEmpolyeeList {
  datas: EmpolyeeList[]
  query: QueryEmpolyeeList
  loading: boolean
  paginate: Paginate | null
}

export interface EmpolyeeList {
  id: string
  userId: string
  email: string
  name: string
  images: string
  role_id: Role
  address: string
  phone: string
}
export interface Role {
  id: string
  Name: string
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

export interface CreateEmpolyee {
  name: string
  email: string
  password: string
  role_id: number | null
  address: string
  phone: string
  image: string
}
