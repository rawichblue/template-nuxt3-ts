import { client } from './httpClient'
import type { QueryEmpolyeeList, CreateEmpolyee } from '~/models/employee.model'

export const getEmployeeList = (payload: QueryEmpolyeeList) => {
  return client({
    url: 'employee/list',
    method: 'get',
    params: {
      ...payload,
    },
  })
}

export const deleteEmployee = (id: string) => {
  return client({
    url: `employee/${id}`,
    method: 'delete',
  })
}

export const createEmployee = (payload: FormData) => {
  return client({
    url: 'employee/create',
    method: 'post',
    data: payload,
  })
}

export const updateEmployee = (id: string, payload: FormData) => {
  return client({
    url: `employee/${id}`,
    method: 'patch',
    data: payload,
  })
}
