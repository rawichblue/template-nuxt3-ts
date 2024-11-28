export interface GetProductList {
  datas: ProductList[]
  query: QueryProductList
  loading: boolean
  paginate: Paginate | null
}

export interface ProductList {
  test: string
}

export interface Paginate {
  page: number
  size: number
  total: number
}

export interface QueryProductList {
  page: number
  size: number
  search: string
}
