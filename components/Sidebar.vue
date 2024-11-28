<template>
  <div class="w-full h-full bg-defaultColor relative">
    <nav class="flex">
      <div class="w-full">
        <div
          v-for="(menu, i) in menus"
          :key="i"
          :class="{
            'mb-16': i === menus.length - 1,
          }"
          class="text-center"
        >
          <div v-if="menu.subMenu.length == 0">
            <nuxt-link
              exact
              :to="menu.path"
              class="uppercase w-full flex items-center duration-150 hover:bg-black/10 hover:text-green-500 h-12"
            >
              <Icon :name="menu.icon" class="w-1/4" />
              <div class="capitalize">{{ menu.name }}</div>
            </nuxt-link>
          </div>

          <div v-else class="flex">
            <nuxt-link
              exact
              :to="menu.path"
              @click="menus[i].active = !menus[i].active"
              class="relative uppercase w-full flex items-center duration-150 hover:bg-black/10 h-12"
            >
              <Icon :name="menu.icon" class="w-1/4" />
              <div class="capitalize">{{ menu.name }}</div>

              <div
                class="absolute top-2 right-3"
                :class="!menu.active ? 'rotate-10 transition duration-500' : ''"
              >
                <i
                  :class="
                    menu.active
                      ? 'fa-solid fa-caret-up'
                      : 'fa-solid fa-caret-down'
                  "
                ></i>
              </div>
            </nuxt-link>
          </div>

          <div v-if="menu.active">
            <div
              v-for="(subMenu, j) in menu.subMenu"
              :key="j"
              class="min-h-[40px]text-center"
            >
              <nuxt-link
                exact
                :to="subMenu.path"
                @click.stop="menu.subMenu[j].active = !menu.subMenu[j].active"
                class="ps-4 w-full flex items-center h-[40px] hover:bg-black/10 relative"
              >
                <Icon :name="subMenu.icon" class="w-1/4"></Icon>
                <div class="capitalize">{{ subMenu.name }}</div>
                <div
                  v-if="subMenu.children.length > 0"
                  class="absolute top-2 right-3"
                  :class="
                    !subMenu.active ? 'rotate-10 transition duration-500' : ''
                  "
                >
                  <i
                    :class="
                      subMenu.active
                        ? 'fa-solid fa-caret-up'
                        : 'fa-solid fa-caret-down'
                    "
                  ></i>
                </div>
              </nuxt-link>

              <div v-if="subMenu.active">
                <div
                  v-for="(child, k) in subMenu.children"
                  :key="k"
                  class="h-[40px] text-center hover:bg-black/10"
                >
                  <nuxt-link
                    exact
                    :to="child.path"
                    class="ps-8 w-full flex h-full items-center"
                  >
                    <Icon :name="child.icon" class="w-1/4"></Icon>
                    <div class="capitalize">{{ child.name }}</div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from '~/store/main'

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

const store = useIndexStore()
const menus = ref<MenuSidebar[]>([
  {
    icon: 'mage:dashboard-plus-fill',
    name: 'Dashbord',
    path: '/',
    active: false,
    permission: '',
    subMenu: [],
  },
  {
    icon: 'mdi:account-filter',
    name: 'Employee',
    path: '/employee',
    active: false,
    permission: '',
    subMenu: [],
  },
  {
    icon: 'heroicons:building-storefront-solid',
    name: 'Product',
    path: '/product',
    active: false,
    permission: 'vendor-check-slip-get',
    subMenu: [],
  },
  {
    icon: 'mdi:cog',
    name: 'Setting',
    path: '',
    active: false,
    permission: 'system-get',
    subMenu: [
      {
        icon: 'mdi:human-handsup',
        name: 'Role',
        path: '/setting/role',
        active: false,
        permission: 'role-get',
        children: [],
      },
      {
        icon: 'material-symbols:shield-locked-rounded',
        name: 'Permission',
        path: '/setting/permission',
        active: false,
        permission: 'permission-get',
        children: [],
      },
      // {
      //   icon: 'uis:layer-group',
      //   name: 'จัดกลุ่ม',
      //   path: '',
      //   active: false,
      //   permission: 'group-bot-get',
      //   children: [
      //     {
      //       icon: 'material-symbols:supervisor-account',
      //       name: 'จัดกลุ่ม บัญชี',
      //       path: '',
      //       active: false,
      //       permission: 'group-bot-get',
      //     },
      //     {
      //       icon: 'hugeicons:message-outgoing-02',
      //       name: 'จัดกลุ่ม ข้อความ',
      //       path: '',
      //       active: false,
      //       permission: 'group-temp-text-get',
      //     },
      //   ],
      // },
    ],
  },
])
const checkMenus = (name: any) => {
  let setting = false

  menus.value.forEach((menu: any) => {
    if (menu.name === 'ตั้งค่า') {
      setting = menu.active
    }

    if (menu.name === name) {
      menu.active = true
    } else {
      menu.active = false
    }
  })

  if (name === 'ตั้งค่า' && setting) {
    menus.value.forEach((menu: any) => {
      if (menu.name === 'ตั้งค่า') {
        menu.active = false
      }
    })
  }
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-green-500 bg-black/10;
}
</style>
