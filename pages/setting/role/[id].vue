<template>
  <Loading v-if="loading" :loading="loading" />
  <div v-else class="m-6">
    <div class="flex items-center justify-between">
      <div class="font-bold text-lg">แก้ไขบทบาท : {{ RoleName }}</div>
      <div class="flex gap-2">
        <div class="flex gap-2">
          <nuxt-link class="btn-info btn-sm rounded-md" to="/setting/role">
            Back
          </nuxt-link>
          <button @click="onSubmit()" class="btn-green btn-sm rounded-md">
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-secondary p-2 rounded-md mt-5 overflow-auto">
      <!-- <pre>{{ formUpdate }}</pre> -->
      <div class="flex justify-end pe-5 pt-3">
        <button
          v-if="
            formUpdate.permission_ids.length != getPermissionLists.datas.length
          "
          @click="selectAllPermissions()"
          class="btn-sm btn-info rounded-md"
        >
          <p>All</p>
        </button>

        <button
          v-else
          @click="clearPermissions()"
          class="btn-sm btn-red rounded-md"
        >
          <p>Clear</p>
        </button>
      </div>

      <div class="max-w-full rounded-md">
        <div class="flex justify-center w-full">
          <div class="max-md:w-11/12 overflow-auto rounded-md w-full">
            <table
              v-if="getPermissionLists.datas.length > 0"
              class="flex-col w-full divide-y divide-inherit"
            >
              <thead class="text-base h-10">
                <tr class="text-sm whitespace-nowrap">
                  <th class="text-start">Permission</th>
                  <th>Active</th>
                </tr>
              </thead>

              <tbody
                v-for="(permission, i) in getPermissionLists.datas"
                :key="i"
                class="mb-2"
              >
                <tr class="border-b">
                  <td>
                    <span class="ms-2">{{ permission.Name }}</span>
                  </td>
                  <td class="w-24">
                    <div class="flex justify-center items-center text-sm p-3">
                      <label
                        class="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          :checked="isCheckedPermissions(permission.Id)"
                          @change="togglePermissions(permission.Id)"
                          type="checkbox"
                          class="sr-only peer"
                        />
                        <div
                          class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                        ></div>
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-else
              class="w-full flex items-center justify-center gap-5 text-xl"
            >
              <i class="fa-solid fa-circle-exclamation"></i>
              <div class="capitalize">not found</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SetPermission, RoleList } from '~/models/role.model'
import type {
  GetPermissionList,
  PermissionList,
} from '~/models/permission.model'
import service from '~/service'
//   import { getPermission } from '~/service/role.service'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const loading = ref<boolean>(false)
const pathID = ref<any>(route.params?.id)
const RoleName = ref<any>(route.query?.name)

const formUpdate = ref<SetPermission>({
  role_id: null,
  permission_ids: [],
})

const getPermissionLists = ref<GetPermissionList>({
  datas: [],
  query: {
    page: 1,
    size: 999,
    search: '',
    is_active: true,
  },
  loading: false,
  paginate: null,
})

const isCheckedPermissions = computed(() => {
  return (permissionId: number) => {
    return formUpdate.value.permission_ids.includes(permissionId)
  }
})

const togglePermissions = (permissionId: any) => {
  const index = formUpdate.value.permission_ids.indexOf(permissionId)
  if (index > -1) {
    formUpdate.value.permission_ids.splice(index, 1)
  } else {
    formUpdate.value.permission_ids.push(permissionId)
  }
}

const getPermissionByRole = async (roleId: string) => {
  await service.role
    .getPermissionByRoleId(roleId)
    .then((resp: any) => {
      const { data } = resp.data
      if (data) {
        formUpdate.value.permission_ids = data
      } else {
        formUpdate.value.permission_ids = []
      }
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
}

const getPermissionList = async () => {
  getPermissionLists.value.loading = true

  await service.permission
    .getPermissionList(getPermissionLists.value.query)
    .then((resp: any) => {
      const { data } = resp.data
      let datas: PermissionList[] = []
      for (let i = 0; i < data.length; i++) {
        const e = data[i]

        const temp: PermissionList = {
          Id: e.Id,
          Name: e.Name,
          Group: e.Group,
          Description: e.Description,
          IsActive: e.IsActive,
        }
        datas.push(temp)
      }
      getPermissionLists.value.datas = datas
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      getPermissionLists.value.loading = false
    })
}

const onSubmit = async () => {
  showAlertConfirm({
    icon: 'warning',
    title: 'ยืนยันการตั้งค่าทั้งหมด',
    text: 'ต้องการบันทึกการตั้งค่าทั้งหมดใช่หรือไม่?',
  }).then(async (isConfirm) => {
    if (!isConfirm) return
    try {
      loading.value = true
      const resps = await service.role.setPermission(formUpdate.value)
      const { code } = resps.data
      if (code === '200') {
        swalToast({
          icon: 'success',
          title: 'Saved!',
        })
      }
      router.push('/setting/role')
      loading.value = false
    } catch (error: any) {
      loading.value = false
      errorResp(error.response)
    }
  })
}

const selectAllPermissions = () => {
  formUpdate.value.permission_ids = getPermissionLists.value.datas.map(
    (permission) => permission.Id,
  )
}

const clearPermissions = () => {
  formUpdate.value.permission_ids = []
}

onMounted(async () => {
  await getPermissionByRole(pathID.value)
  await getPermissionList()

  formUpdate.value.role_id = parseInt(pathID.value)
})
</script>

<style scoped>
.flex-col tr:last-child {
  border-bottom: none;
}
</style>
