<template>
  <div>
    <div class="flex justify-end items-center" v-if="props.show">
      <div class="fixed inset-0 flex items-center justify-center z-40">
        <div
          class="modal-overlay absolute w-full h-full bg-black/50"
          @click="hide"
        />

        <div
          class="rounded-md bg-secondary max-sm:w-[90%] w-[70%] z-40 px-4 py-2 overflow-auto max-h-[550px]"
        >
          <!-- <pre>{{ props.datas }}</pre> -->
          <div class="flex justify-between items-center me-2 pt-1">
            <div class="font-bold text-lg" v-if="props.datas.ID">
              Update Role
            </div>
            <div class="font-bold text-lg" v-else>Create Role</div>
            <button @click="hide">
              <i class="fa-solid fa-xmark text-xl" />
            </button>
          </div>

          <div class="w-full h-full rounded-lg">
            <hr class="border my-3" />

            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-2">
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Name</div>
                <input
                  v-model="formUpdateRole.name"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Description</div>
                <input
                  v-model="formUpdateRole.description"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
            </div>

            <div class="mt-2">
              <div class="mb-2">Active</div>

              <label
                class="relative inline-flex justify-center items-center cursor-pointer"
              >
                <input
                  v-model="formUpdateRole.is_active"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <div>
              <input v-model="formUpdateRole.is_active" class="sr-only peer" />
            </div>

            <div class="flex justify-end gap-2 mt-5 mb-2 pl-5">
              <button @click="hide" class="btn-sm btn-white rounded-md">
                cancel
              </button>
              <button @click="onSubmit" class="btn-md btn-green rounded-md">
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateUpdateRole } from '~/models/role.model'

import service from '~/service'

const props = defineProps<{
  show: boolean
  datas: any
}>()

const emit = defineEmits(['close', 'reload'])
const loading = ref<boolean>(false)

const formUpdateRole = ref<CreateUpdateRole>({
  name: '',
  description: '',
  is_active: false,
})

const hide = () => {
  emit('close')
}

const onSubmit = async () => {
  if (props.datas.id) {
    showAlertConfirm({
      icon: 'warning',
      title: 'ยืนยันการ update Role',
      text: 'ต้องการ update Role ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      await service.role
        .updateRole(props.datas.id, formUpdateRole.value)
        .then((resp: any) => {
          if (resp.status === 200) {
            swalToast({
              icon: 'success',
              title: 'Saved!',
            })
            emit('reload')
            hide()
          }
        })
        .catch((err: any) => {
          errorResp(err.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  } else {
    showAlertConfirm({
      icon: 'warning',
      title: 'ยืนยันการสร้าง Role',
      text: 'ต้องการสร้าง Role ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      await service.role
        .createRole(formUpdateRole.value)
        .then((resp: any) => {
          console.log(resp.status)
          if (resp.status === 200) {
            swalToast({
              icon: 'success',
              title: 'Saved!',
            })
            emit('reload')
            hide()
          }
        })
        .catch((err: any) => {
          errorResp(err.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }
}

const checkData = async () => {
  if (props.datas) {
    formUpdateRole.value.name = props.datas.name
    formUpdateRole.value.description = props.datas.description
    formUpdateRole.value.is_active = props.datas.is_active
  }
}

onMounted(async () => {
  await checkData()
})
</script>

<style scoped></style>
