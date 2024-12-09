export interface MenuSidebarM {
  icon: string
  name: string
  path: string
  active: boolean
}

export interface Modal {
  show: boolean
  data: any
}

export interface MenuList {
  name: string
  active: boolean
}

export interface MenuNavbar {
  icon: string
  name: string
  path: string
  active: boolean
}

export interface MenuSidebar {
  icon: string
  name: string
  path: string
  active: boolean
  permission: string
  subMenu: SubMenu[]
}

export interface SubMenu {
  icon: string
  name: string
  path: string
  active: boolean
  permission: string
  children: SubMenuChildren[]
}
export interface SubMenuChildren {
  icon: string
  name: string
  path: string
  active: boolean
  permission: string
}
