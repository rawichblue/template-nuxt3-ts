<template>
  <div>
    <div class="flex justify-end items-center" v-if="props.show">
      <div class="fixed inset-0 flex items-center justify-center z-40">
        <div
          class="modal-overlay absolute w-full h-full bg-black/50"
          @click="hide"
        />

        <div
          class="rounded-md bg-secondary max-sm:w-[90%] w-[70%] z-40 px-4 py-2 overflow-auto mini-scroll max-h-[550px]"
        >
          <div class="flex justify-between items-center me-2 pt-1">
            <div class="font-bold text-lg">{{ props.title }} Employee</div>
            <button @click="hide">
              <i class="fa-solid fa-xmark text-xl" />
            </button>
          </div>

          <div class="w-full h-full rounded-lg">
            <hr class="border my-3" />

            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-2">
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Email</div>
                <input
                  v-model="formCreate.email"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Password</div>
                <input
                  v-model="formCreate.password"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
            </div>

            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-2">
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Name</div>
                <input
                  v-model="formCreate.name"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Role</div>

                <select
                  v-model="selectedRole"
                  class="block w-full p-2 h-11 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option disabled value="" selected>Choose a role</option>
                  <option
                    v-for="(r, i) in getRoleList.datas"
                    :key="i"
                    :value="r.id"
                  >
                    {{ r.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-2">
              <div class="my-2 max-md:my-1">
                <div class="mb-2">Phone</div>
                <input
                  v-model="formCreate.phone"
                  class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder=".."
                />
              </div>

              <div class="my-2 max-md:my-1">
                <div class="mb-2">Upload Image</div>
                <div class="relative">
                  <button
                    @click="triggerFileInput"
                    class="block w-full h-[42px] text-sm text-white bg-green-600 border border-green-500 rounded-lg cursor-pointer hover:bg-green-500"
                  >
                    Choose File
                  </button>
                  <span
                    class="block mt-2 text-sm text-gray-400 truncate"
                    v-if="selectedFileName"
                  >
                    flie name : {{ selectedFileName }}
                  </span>

                  <input
                    type="file"
                    ref="imageInput"
                    class="hidden"
                    @change="handleFileChange"
                  />
                </div>
              </div>
            </div>

            <div class="max-md:mt-2">
              <div class="mb-2">Address</div>
              <textarea
                rows="3"
                v-model="formCreate.address"
                class="block w-full p-2 bg-gray-800 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Write your address here..."
              ></textarea>
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
import type { GetRoleList, RoleList } from '~/models/role.model'
import type { CreateEmpolyee, EmpolyeeList } from '~/models/employee.model'

import service from '~/service'

const props = defineProps<{
  show: boolean
  datas: any
  title: string
}>()

const formData: FormData = new FormData()
const emit = defineEmits(['close', 'reload'])
const loading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)
const selectedFileName = ref<string>('')
const selectedRole = ref<number>(0)

const formCreate = ref<CreateEmpolyee>({
  name: '',
  email: '',
  password: '',
  role_id: null,
  address: '',
  phone: '',
  image: '',
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

const triggerFileInput = () => {
  imageInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    selectedFileName.value = files[0].name
    handleImageChanges()
  }
}

const hide = () => {
  emit('close')
}

const getRoleLists = async () => {
  getRoleList.value.loading = true

  await service.role
    .getRoleList(getRoleList.value.query)
    .then((resp: any) => {
      const { data, paginate } = resp.data

      getRoleList.value.datas = data.map((e: RoleList) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        is_active: e.is_active,
      }))

      // getRoleList.value.datas = datas
      getRoleList.value.paginate = paginate
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      getRoleList.value.loading = false
    })
}

const handleImageChanges = async () => {
  const files = imageInput.value?.files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const resizedImageBase64 = await resizeImage(file, 800, 600)

        const [blob, contentType] = base64ToBlob(resizedImageBase64)

        const imageFile = new File([blob], file.name, { type: contentType })

        formCreate.value.image = resizedImageBase64

        formData.append('image', imageFile)
      } else {
        swalToast({
          icon: 'error',
          title: `ประเภทไฟล์ไม่รองรับ : ${file.type}!`,
        })
      }
    }
  }
}

const base64ToBlob = (base64Data: string): [Blob, string] => {
  let contentType = ''
  if (base64Data.startsWith('data:image/jpeg')) {
    contentType = 'image/jpeg'
  } else if (base64Data.startsWith('data:image/png')) {
    contentType = 'image/png'
  } else if (base64Data.startsWith('data:image/gif')) {
    contentType = 'image/gif'
  } else if (base64Data.startsWith('data:image/bmp')) {
    contentType = 'image/bmp'
  } else if (base64Data.startsWith('data:image/webp')) {
    contentType = 'image/webp'
  } else if (base64Data.startsWith('data:image/svg+xml')) {
    contentType = 'image/svg+xml'
  } else if (base64Data.startsWith('data:image/tiff')) {
    contentType = 'image/tiff'
  } else {
    contentType = 'application/octet-stream'
  }
  const byteCharacters = atob(base64Data.split(',')[1])
  const byteNumbers = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  return [new Blob([byteNumbers], { type: contentType }), contentType]
}

const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  maxFileSizeKB: number = 1024,
): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event: any) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width))
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height))
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)

        let quality = 1.0
        let dataURL = canvas.toDataURL(file.type, quality)
        let fileSizeKB = (dataURL.length * 0.75) / 1024

        while (fileSizeKB > maxFileSizeKB && quality > 0.1) {
          quality -= 0.05
          dataURL = canvas.toDataURL(file.type, quality)
          fileSizeKB = (dataURL.length * 0.75) / 1024
        }

        resolve(dataURL)
      }
    }
    reader.readAsDataURL(file)
  })
}

// const validateForm = (): boolean => {
//   const { email, password, name, phone, address } = formCreate.value

//   if (!validateEmail(email)) {
//     swalToast({ icon: 'error', title: 'Invalid email format!' })
//     return false
//   }

//   if (!validatePassword(password)) {
//     swalToast({
//       icon: 'error',
//       title: 'Password must be at least 8 characters!',
//     })
//     return false
//   }

//   if (!validateName(name)) {
//     swalToast({ icon: 'error', title: 'Name cannot be empty!' })
//     return false
//   }

//   if (!validatePhone(phone)) {
//     swalToast({ icon: 'error', title: 'Invalid phone number!' })
//     return false
//   }

//   if (!validateAddress(address)) {
//     swalToast({
//       icon: 'error',
//       title: 'Address must be at least 10 characters!',
//     })
//     return false
//   }

//   return true
// }

const onSubmit = async () => {
  // if (!validateForm()) return
  formCreate.value.role_id = selectedRole.value
  formData.append('name', `${formCreate.value.name}`)
  formData.append('email', `${formCreate.value.email}`)
  formData.append('password', `${formCreate.value.password}`)
  formData.append('role_id', `${formCreate.value.role_id}`)
  formData.append('address', `${formCreate.value.address}`)
  formData.append('phone', `${formCreate.value.phone}`)

  if (props.datas.id) {
    showAlertConfirm({
      icon: 'warning',
      title: 'ยืนยันการ update employee',
      text: 'ต้องการ update employee ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      await service.employee
        .updateEmployee(props.datas.id, formData)
        .then((resp: any) => {
          if (resp.ode === 200) {
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
      title: 'ยืนยันการสร้าง employee',
      text: 'ต้องการสร้าง employee ใช่หรือไม่?',
    }).then(async (isConfirm) => {
      if (!isConfirm) return
      loading.value = true
      await service.employee
        .createEmployee(formData)
        .then((resp: any) => {
          if (resp.ode === 200) {
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
    formCreate.value.address = props.datas.address
    formCreate.value.email = props.datas.email
    formCreate.value.image = props.datas.images
    formCreate.value.name = props.datas.name
    formCreate.value.phone = props.datas.phone
    selectedRole.value = parseInt(props.datas.role_id)
  }
}

onMounted(async () => {
  await checkData()
  await getRoleLists()
})
</script>

<style scoped></style>
