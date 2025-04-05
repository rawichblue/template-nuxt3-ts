<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold text-lg">Permission</div>

      <div>
        <!-- <button
        @click="openModal"
        class="p-2 bg-green-600 hover:bg-green-700 rounded-md flex justify-center items-center"
      >
        <Icon name="material-symbols:add" />
        <p class="ms-2">Add</p>
      </button> -->
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
                  v-model="getPermissionList.query.search"
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
                    <th class="px-6 py-3 text-start">Group</th>
                    <th class="px-6 py-3 text-center">Active</th>
                    <th class="px-6 py-3">Setting</th>
                  </tr>
                </thead>

                <tbody
                  v-for="(items, i) in getPermissionList.datas"
                  :key="i"
                  class="divide-y divide-inherit"
                >
                  <tr class="h-14 max-sm:h-28 max-md:h-28">
                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center text-sm px-5"
                      >
                        {{
                          (getPermissionList.query.page - 1) *
                            getPermissionList.query.size +
                          i +
                          1
                        }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-start items-center text-sm px-5">
                        {{ items.Name }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-start items-center text-sm px-5">
                        {{ items.Group }}
                      </div>
                    </td>

                    <td class="whitespace-nowrap">
                      <div class="flex justify-center items-center">
                        <label
                          class="relative inline-flex justify-center items-center cursor-pointer"
                        >
                          <input
                            @click.prevent="toggleStatus(items)"
                            v-model="items.IsActive"
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
                        <div>
                          <Icon
                            @click="openModal(items)"
                            name="material-symbols-light:edit-square"
                            class="text-gray-300 text-xl hover:text-yellow-500 cursor-pointer"
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
            :data="getPermissionList.paginate"
            @setPage="setQueryText('page', $event)"
            @setLimit="setQueryText('limit', $event)"
            @reload="getPermissionLists()"
          />
        </div>
      </div>
    </div>

    <div v-if="modal.show">
      <ModalUpdatePermission
        :show="modal.show"
        :datas="modal.data"
        @close="closeModal"
        @reload="getPermissionLists"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalDefault } from '~/models/global.model'
import type {
  GetPermissionList,
  PermissionList,
} from '~/models/permission.model'
import Swal from 'sweetalert2/dist/sweetalert2.js'
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

const getPermissionList = ref<GetPermissionList>({
  datas: [],
  query: {
    page: 1,
    size: 10,
    search: '',
    is_active: true,
  },
  loading: false,
  paginate: null,
})

const getPermissionLists = async () => {
  getPermissionList.value.loading = true

  await service.permission
    .getPermissionList(getPermissionList.value.query)
    .then((resp: any) => {
      const { data } = resp
      console.log(data)
      getPermissionList.value.datas = data.data.map((e: PermissionList) => ({
        Id: e.Id,
        IsActive: e.IsActive,
        Name: e.Name,
        Group: e.Group,
        Description: e.Description,
      }))

      // getPermissionList.value.datas = datas
      getPermissionList.value.paginate = data.paginate
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      getPermissionList.value.loading = false
    })
}

const setQueryText = (prefix: any, event: any) => {
  switch (prefix) {
    case 'page':
      getPermissionList.value.query.page = event
      break
    case 'limit':
      getPermissionList.value.query.size = event
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
    getPermissionLists()
  }, 1000)
}

const openModal = async (items: any) => {
  modal.value.show = true
  modal.value.data = items
}

const closeModal = async () => {
  modal.value.show = false
}

const toggleStatus = async (items: any) => {
  let text = ''
  if (!items.IsActive === true) {
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
      getPermissionList.value.loading = true
      await service.permission
        .updateStatusPermissison(items.Id, !items.IsActive)
        .then((resp: any) => {
          const { data } = resp.data
          if (data) {
            swalToast({
              icon: 'success',
              title: 'Saved!',
            })
            getPermissionLists()
          }
        })
        .catch((err: any) => {
          errorResp(err.response)
        })
        .finally(() => {
          getPermissionList.value.loading = false
        })
    } else {
      for (let i = 0; i < getPermissionList.value.datas.length; i++) {
        const e = getPermissionList.value.datas[i]
        if (e.Id === items.id) {
          e.IsActive = !e.IsActive
          break
        }
      }
    }
  })
}

onMounted(async () => {
  await getPermissionLists()
})
</script>

<style scoped></style>
