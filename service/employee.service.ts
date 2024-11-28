import { client } from './httpClient'
import type { QueryEmpolyeeList } from '~/models/employee.model'

export const getEmployeeList = (payload: QueryEmpolyeeList) => {
  return client({
    url: 'employee/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}
