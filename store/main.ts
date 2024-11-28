import { defineStore } from 'pinia'

interface State {
  token: string | null
  openModalLange: boolean
  openSidebar: boolean
  openPopupProfile: boolean
  roles: []
  system: []
  permissions: []
}

export const useIndexStore = defineStore('index', {
  state: (): State => ({
    token: null,
    openModalLange: false,
    openSidebar: false,
    openPopupProfile: false,
    roles: [],
    system: [],
    permissions: [],
  }),
})
