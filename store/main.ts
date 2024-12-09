import { defineStore } from 'pinia'

interface State {
  token: string | null
  openModalLange: boolean
  openSidebar: boolean
  openPopupProfile: boolean
  roles: []
  system: []
  permissions: []
  user: {
    image: string
    id: number
    name: string
    role_id: string
    user_id: string
    email: string
  }
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
    user: {
      image: '',
      id: 0,
      name: '',
      role_id: '',
      user_id: '',
      email: '',
    },
  }),
})
