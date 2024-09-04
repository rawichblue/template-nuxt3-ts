<template>
  <div>
    <ModalLoading :loading="loading" />
    {{ i18n.t('page.register.title') }}
    <div class="md:flex hidden">
      <div
        v-for="(item, index) in locales"
        :key="index"
        class="flex gap-2 items-center justify-center cursor-pointer"
        @click="store.openModalLange = !store.openModalLange"
      >
        <template v-if="item.code === locale">
          <img
            class="w-11 h-9 bg-cover rounded-full"
            :src="item.path_image"
            :alt="item.name"
            @click="setLocale(item.code)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from '~/store/main'
definePageMeta({
  // middleware: 'auth',
})
const store = useIndexStore()
const i18n = useI18n()
const { locales, locale, setLocale }: any = useI18n()
const loading = ref<boolean>(false)
</script>

<style scoped></style>
