import { defineStore } from 'pinia'

interface State {
  token: string | null
  openModalLange: boolean 
  roles: []
  system: []
  permissions: []
}

export const useIndexStore = defineStore('index', {
  state: (): State => ({
    token: null, 
    openModalLange: false,
    roles: [],
    system: [],
    permissions: [],
  }),
})
