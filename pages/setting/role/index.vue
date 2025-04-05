<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold text-lg">Role</div>

      <div>
        <button
          @click="openModal"
          class="p-2 bg-green-600 hover:bg-green-700 rounded-md flex justify-center items-center"
        >
          <Icon name="material-symbols:add" />
          <p class="ms-2">Add</p>
        </button>
      </div>
    </div>

    <div>
      <div class="p-2 rounded-md my-5 overflow-auto bg-secondary">
        <div class="flex justify-end m-3">
          <div class="w-full flex items-center justify-between">
            <div class="font-bold"></div>

            <div class="">
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <Icon name="ic:round-search" class="text-2xl text-gray-400" />
                </div>
                <input
                  v-model="getRoleList.query.search"
                  @keyup="searchText()"
                  class="p-2 ps-10 text-sm rounded-md border bg-gray-800 border-gray-700 text-white focus:border-gray-500 focus:outline-none"
                  placeholder="Search..."
                />
                <div
                  v-if="loadingSearch"
                  class="absolute top-3 right-3 flex items-center"
                >
                  <Icon name="svg-spinners:tadpole" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-full rounded-md">
          <div class="flex justify-center w-full">
            <div class="max-md:w-11/12 overflow-auto rounded-md w-full">
              <table class="flex-col w-full divide-y divide-inherit">
                <thead class="text-base h-16">
                  <tr class="text-sm whitespace-nowrap">
                    <th class="px-6 py-3">#</th>
                    <th class="px-6 py-3 text-start">Name</th>
                    <th class="px-6 py-3 text-start">Description</th>
                    <th class="px-6 py-3 text-center">Active</th>
                    <th class="px-6 py-3 text-center">Set Permission</th>
                    <th class="px-6 py-3">Setting</th>
                  </tr>
                </thead>

                <tbody
                  v-for="(items, i) in getRoleList.datas"
                  :key="i"
                  class="divide-y divide-inherit"
                >
                  <tr class="h-14 max-sm:h-28 max-md:h-28">
                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center text-sm px-5"
                      >
                        {{
                          (getRoleList.query.page - 1) *
                            getRoleList.query.size +
                          i +
                          1
                        }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-start items-center text-sm px-5">
                        {{ items.name }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-start items-center text-sm px-5">
                        {{ items.description }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-center items-center">
                        <label
                          class="relative inline-flex justify-center items-center cursor-pointer"
                        >
                          <input
                            @click.prevent="toggleStatus(items)"
                            v-model="items.is_active"
                            type="checkbox"
                            class="sr-only peer"
                          />
                          <div
                            class="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                          ></div>
                        </label>
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center gap-5 text-sm"
                      >
                        <nuxt-link
                          :to="{
                            path: `role/${items.id}`,
                            query: { name: items.name },
                          }"
                        >
                          <Icon
                            name="solar:key-minimalistic-square-3-bold"
                            class="text-gray-300 text-xl hover:text-green-500 cursor-pointer"
                          />
                        </nuxt-link>
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center gap-5 text-sm"
                      >
                        <div>
                          <Icon
                            @click="openModal(items)"
                            name="material-symbols-light:edit-square"
                            class="text-gray-300 text-xl hover:text-yellow-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <Icon
                            @click="deleteRole(items.id)"
                            class="text-gray-300 text-xl hover:text-red-500 cursor-pointer"
                            name="material-symbols:delete"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            :data="getRoleList.paginate"
            @setPage="setQueryText('page', $event)"
            @setLimit="setQueryText('limit', $event)"
            @reload="getRoleLists()"
          />
        </div>
      </div>
    </div>

    <div v-if="modal.show">
      <ModalUpdateRole
        :show="modal.show"
        :datas="modal.data"
        @close="closeModal"
        @reload="getRoleLists"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalDefault } from '~/models/global.model'
import type { GetRoleList, RoleList } from '~/models/role.model'
import service from '~/service'
import { useIndexStore } from '~/store/main'

definePageMeta({
  middleware: 'auth',
})

const store = useIndexStore()
const loadingSearch = ref<boolean>(false)
let timer: any

const modal = ref<ModalDefault>({
  show: false,
  data: null,
})

const getRoleList = ref<GetRoleList>({
  datas: [],
  query: {
    page: 1,
    size: 10,
    search: '',
  },
  loading: false,
  paginate: null,
})

const getRoleLists = async () => {
  getRoleList.value.loading = true

  await service.role
    .getRoleList(getRoleList.value.query)
    .then((resp: any) => {
      const { data } = resp
      console.log(data)
      getRoleList.value.datas = data.data.map((e: RoleList) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        is_active: e.is_active,
      }))

      // getRoleList.value.datas = datas
      getRoleList.value.paginate = data.paginate
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      getRoleList.value.loading = false
    })
}

const setQueryText = (prefix: any, event: any) => {
  switch (prefix) {
    case 'page':
      getRoleList.value.query.page = event
      break
    case 'limit':
      getRoleList.value.query.size = event
      break
    default:
      break
  }
}

const searchText = () => {
  loadingSearch.value = true
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(() => {
    loadingSearch.value = false
    getRoleLists()
  }, 1000)
}

const openModal = async (items: any) => {
  modal.value.show = true
  modal.value.data = items
}

const closeModal = async () => {
  modal.value.show = false
}

const deleteRole = (id: string) => {
  showAlertConfirmDelete({
    icon: 'warning',
    title: 'ยืนยันการลบ',
    text: 'ต้องการลบหรือไม่ ?',
  }).then(async (isConfirm) => {
    if (!isConfirm) return
    try {
      const resps = await service.role.deleteRole(id)
      if (resps.data.code === 200) {
        swalToast({
          icon: 'success',
          title: 'ลบสำเร็จ!',
        })
        getRoleLists()
      }
    } catch (error: any) {
      errorResp(error.response)
    }
  })
}

const toggleStatus = async (items: any) => {
  let text = ''
  if (!items.is_actived === true) {
    text = 'เปิดการใช้งาน'
  } else {
    text = 'ปิดการใช้งาน'
  }

  showAlertConfirm({
    icon: 'warning',
    title: `ยืนยันการ${text}`,
    text: `ต้องการ${text}ใช่หรือไม่?`,
  }).then(async (ok: any) => {
    if (ok) {
      getRoleList.value.loading = true
      await service.role
        .updateStatusRole(items.id, !items.is_active)
        .then((resp: any) => {
          const { data } = resp.data
          if (data) {
            swalToast({
              icon: 'success',
              title: 'Saved!',
            })
            getRoleLists()
          }
        })
        .catch((err: any) => {
          errorResp(err.response)
        })
        .finally(() => {
          getRoleList.value.loading = false
        })
    }
  })
}

onMounted(async () => {
  await getRoleLists()
})
</script>

<style scoped></style>
