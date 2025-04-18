import { client } from './httpClient'

import type { QueryProductList } from '~/models/product.modal'

export const getProductList = (payload: QueryProductList) => {
  return client({
    url: 'product/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}
