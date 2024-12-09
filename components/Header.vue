<template>
  <div class="flex justify-between items-center h-16 gap-x-4 p-4">
    <!-- <pre>{{ store.$state.user.image }}</pre> -->
    <div class="w-60 h-full flex justify-start items-center">
      <!-- <img
        src="~/public/letsChat_logo.png"
        @click="passToIndex()"
        class="w-14 h-12 cursor-pointer"
      /> -->
    </div>

    <div class="flex items-center">
      <div class="whitespace-nowrap">{{ store.$state.user.name }}</div>
      <!-- <div class="whitespace-nowrap ms-5">
        {{ store.$state.user.image.length }}
      </div> -->
      <!-- {{ i18n.t('page.register.title') }} -->
      <div class="flex items-center ms-2" @click="toggleProfile()">
        <div class="rounded-full w-10 h-10 flex items-center">
          <img
            :src="
              store.$state.user.image.length > 0
                ? store.$state.user.image
                : '/img/login.png'
            "
            class="cursor-pointer w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div class="w-10 h-10 ms-2">
        <div
          v-for="(item, index) in locales"
          :key="index"
          class="flex gap-2 items-center justify-center cursor-pointer"
          @click="store.openModalLange = !store.openModalLange"
        >
          <template v-if="item.code === locale">
            <img
              class="w-10 h-10 bg-cover rounded-full"
              :src="item.path_image"
              :alt="item.name"
              @click="setLocale(item.code)"
            />
          </template>
        </div>
      </div>

      <!-- Overlay and dialog box -->
      <div
        class="sticky z-10"
        ref="profileDropdownRef"
        v-if="store.$state.openPopupProfile"
      >
        <div
          class="absolute flex flex-col z-10 top-6 right-14 rounded-md bg-secondary p-6 w-48 gap-y-3"
        >
          <nuxt-link to="/profile">Profile</nuxt-link>
          <hr />
          <a href="#" @click="logout()">Logout</a>
        </div>
      </div>

      <div class="hidden max-md:block ms-2">
        <div
          v-if="store.$state.openSidebar"
          class="flex items-center text-xl"
          @click="toggleSidebar()"
        >
          <Icon name="nimbus:close" />
        </div>
        <div v-else class="flex items-center text-xl" @click="toggleSidebar()">
          <Icon name="fa-solid:align-justify" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useIndexStore } from '~/store/main'

const { locales, locale, setLocale }: any = useI18n()
const i18n = useI18n()
const profileDropdownRef = ref()
onClickOutside(profileDropdownRef, (event: any) => {
  store.openPopupProfile = false
})

const store = useIndexStore()
const router = useRouter()
const passToIndex = () => {
  router.push('/')
}

const toggleSidebar = () => {
  store.openSidebar = !store.openSidebar
}

const toggleProfile = () => {
  store.openPopupProfile = !store.openPopupProfile
}
</script>

<style scoped></style>
