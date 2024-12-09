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
          <div class="flex justify-between items-center me-2 pt-1">
            <div class="font-bold text-lg">Update Permission</div>
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
                  v-model="formCreate.Name"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Group</div>
                <input
                  v-model="formCreate.Group"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
            </div>

            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-2">
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Description</div>
                <input
                  v-model="formCreate.Description"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
              <div class="my-2 max-md:my-1">
                <div class="mb-2">IsActive</div>
                <input
                  v-model="formCreate.IsActive"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
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
import type { CreatePermission } from '~/models/permission.model'

import service from '~/service'

const props = defineProps<{
  show: boolean
  datas: any
}>()

const emit = defineEmits(['close', 'reload'])
const loading = ref<boolean>(false)

const formCreate = ref<CreatePermission>({
  IsActive: false,
  Name: '',
  Group: '',
  Description: '',
})

const hide = () => {
  emit('close')
}

const onSubmit = async () => {
  // if (!validateForm()) return

  if (props.datas.id) {
    showAlertConfirm({
      icon: 'warning',
      title: 'ยืนยันการ update employee',
      text: 'ต้องการ update employee ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      //   await service.permission.(props.datas.id, formData)
      // .then((resp: any) => {
      //   if (resp.ode === 200) {
      //     swalToast({
      //       icon: 'success',
      //       title: 'Saved!',
      //     })
      //     emit('reload')
      //     hide()
      //   }
      // })
      // .catch((err: any) => {
      //   errorResp(err.response)
      // })
      // .finally(() => {
      //   loading.value = false
      // })
    })
  } else {
    showAlertConfirm({
      icon: 'warning',
      title: 'ยืนยันการสร้าง employee',
      text: 'ต้องการสร้าง employee ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      //   await service.employee
      //     .createEmployee(formData)
      //     .then((resp: any) => {
      //       if (resp.ode === 200) {
      //         swalToast({
      //           icon: 'success',
      //           title: 'Saved!',
      //         })
      //         emit('reload')
      //         hide()
      //       }
      //     })
      //     .catch((err: any) => {
      //       errorResp(err.response)
      //     })
      //     .finally(() => {
      //       loading.value = false
      //     })
    })
  }
}

const checkData = async () => {
  //   if (props.datas) {
  //     formCreate.value.address = props.datas.address
  //     formCreate.value.email = props.datas.email
  //     formCreate.value.image = props.datas.images
  //     formCreate.value.name = props.datas.name
  //     formCreate.value.phone = props.datas.phone
  //     selectedRole.value = parseInt(props.datas.role_id)
  //   }
}

onMounted(async () => {
  await checkData()
})
</script>

<style scoped></style>
