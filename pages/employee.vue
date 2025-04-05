<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold text-lg">{{ i18n.t('page.employee.title') }}</div>

      <div>
        <button
          @click="openModalAdd('Add')"
          class="p-2 bg-green-600 hover:bg-green-700 rounded-md flex justify-center items-center"
        >
          <Icon name="material-symbols:add" />
          <p class="ms-2">{{ i18n.t('button.employee.add') }}</p>
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
                  v-model="getEmpolyeeList.query.search"
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
                    <th class="px-6 py-3 text-start">Email</th>
                    <!-- <th class="px-6 py-3 text-center">Active</th> -->
                    <th class="px-6 py-3">Setting</th>
                  </tr>
                </thead>

                <tbody
                  v-for="(items, i) in getEmpolyeeList.datas"
                  :key="i"
                  class="divide-y divide-inherit"
                >
                  <tr class="h-14 max-sm:h-28 max-md:h-28">
                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center text-sm px-5"
                      >
                        {{
                          (getEmpolyeeList.query.page - 1) *
                            getEmpolyeeList.query.size +
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
                        {{ items.email }}
                      </div>
                    </td>

                    <!-- <td class="whitespace-nowrap">
                    <div class="flex justify-center items-center">
                      <label
                        class="relative inline-flex justify-center items-center cursor-pointer"
                      >
                        <input
                          @click.prevent="toggleStatus(items)"
                          v-model="items.is"
                          type="checkbox"
                          class="sr-only peer"
                        />
                        <div
                          class="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                        ></div>
                      </label>
                    </div>
                  </td> -->

                    <td class="whitespace-nowrap">
                      <div
                        class="flex justify-center items-center gap-5 text-sm"
                      >
                        <div>
                          <Icon
                            @click="openModal(items, 'Update')"
                            name="material-symbols-light:edit-square"
                            class="text-gray-300 text-xl hover:text-yellow-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <Icon
                            @click="deleteEmployee(items.id)"
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
            :data="getEmpolyeeList.paginate"
            @setPage="setQueryText('page', $event)"
            @setLimit="setQueryText('limit', $event)"
            @reload="getEmployeeLists()"
          />
        </div>
      </div>
    </div>

    <div v-if="modal.show">
      <ModalUpdateEmployee
        :show="modal.show"
        :title="modal.title"
        :datas="modal.data"
        @close="closeModal"
        @reload="getEmployeeLists"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalEm } from '~/models/global.model'
import type { GetEmpolyeeList, EmpolyeeList } from '~/models/employee.model'
import service from '~/service'
import { useIndexStore } from '~/store/main'
const i18n = useI18n()

definePageMeta({
  middleware: 'auth',
})

const store = useIndexStore()
const loadingSearch = ref<boolean>(false)
let timer: any

const modal = ref<ModalEm>({
  show: false,
  data: null,
  title: '',
})

const getEmpolyeeList = ref<GetEmpolyeeList>({
  datas: [],
  query: {
    page: 1,
    size: 10,
    search: '',
  },
  loading: false,
  paginate: null,
})

const getEmployeeLists = async () => {
  getEmpolyeeList.value.loading = true

  await service.employee
    .getEmployeeList(getEmpolyeeList.value.query)
    .then((resp: any) => {
      const { data, paginate } = resp.data
      console.log(data)

      getEmpolyeeList.value.datas = data.map((e: EmpolyeeList) => ({
        id: e.id,
        userId: e.userId,
        name: e.name,
        email: e.email,
        images: e.images,
        role_id: e.role_id,
        address: e.address,
        phone: e.phone,
      }))

      // getEmpolyeeList.value.datas = datas
      getEmpolyeeList.value.paginate = paginate
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      getEmpolyeeList.value.loading = false
    })
}

const setQueryText = (prefix: any, event: any) => {
  switch (prefix) {
    case 'page':
      getEmpolyeeList.value.query.page = event
      break
    case 'limit':
      getEmpolyeeList.value.query.size = event
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
    getEmployeeLists()
  }, 1000)
}

const openModal = async (items: any, title: string) => {
  modal.value.show = true
  modal.value.data = items
  modal.value.title = title
}
const openModalAdd = async (title: string) => {
  modal.value.show = true
  modal.value.title = title
}

const closeModal = async () => {
  modal.value.show = false
}

const deleteEmployee = (id: string) => {
  showAlertConfirmDelete({
    icon: 'warning',
    title: 'ยืนยันการลบ',
    text: 'ต้องการลบหรือไม่ ?',
  }).then(async (isConfirm) => {
    if (!isConfirm) return
    try {
      const resps = await service.employee.deleteEmployee(id)
      if (resps.data.code === 200) {
        swalToast({
          icon: 'success',
          title: 'ลบสำเร็จ!',
        })
        getEmployeeLists()
      }
    } catch (error: any) {
      errorResp(error.response)
    }
  })
}

onMounted(async () => {
  await getEmployeeLists()
})
</script>

<style scoped></style>
