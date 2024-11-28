<template>
  <div>home</div>

  <!-- <button @click="getCustomerList()" class="bg-red-500 p-5 rounded-md">
    click meeee
  </button> -->
  <!-- <pre>{{ em }}</pre> -->
</template>

<script setup lang="ts">
import service from '~/service'
import { useIndexStore } from '~/store/main'

definePageMeta({
  middleware: 'auth',
})

const store = useIndexStore()
const loading = ref<boolean>(false)
const em = ref([])
interface testList {
  page: number
  size: number
  search: string
}
const test = ref<testList>({
  page: 1,
  size: 10,
  search: '',
})

const getCustomerList = async () => {
  await service.employee
    .getEmployeeList(test.value)
    .then((resp: any) => {
      const { data, paginate } = resp.data
      em.value = data
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {})
}
</script>

<style scoped></style>
