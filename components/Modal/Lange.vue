<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    v-if="store.openModalLange"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black/50"
      @click="store.openModalLange = !store.openModalLange"
    ></div>

    <div
      class="w-11/12 md:max-w-lg mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto bg-secondary"
    >
      <div class="modal-content py-8 text-left px-6">
        <div class="flex justify-between">
          <div class="font-bold text-xl uppercase">
            {{ $t('modal.lange.title') }}
          </div>
          <i
            class="fa-solid fa-xmark text-2xl cursor-pointer"
            @click="store.openModalLange = !store.openModalLange"
          ></i>
        </div>
        <hr class="my-4" />
        <div class="content">
          <div class="mt-4">
            <div
              v-for="(item, index) in locales"
              :key="index"
              class="flex gap-2 items-center justify-start mt-3 cursor-pointer py-3 hover:rounded-md hover:bg-gray-500"
              @click="setLange(item)"
            >
              <img
                class="ms-2 w-6 h-6 bg-cover rounded-full"
                :src="item.path_image"
                :alt="item.name"
                @click="setLocale(item.code)"
              />
              <p v-if="item.code === 'th'">{{ $t('modal.lange.thai') }}</p>
              <p v-else>
                {{ $t('modal.lange.eng') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from '~/store/main'
const store = useIndexStore()
const { locales, locale, setLocale }: any = useI18n()

const setLange = (item: any) => {
  setLocale(item.code)
  // window.location.reload()
}
</script>

<style scoped></style>
