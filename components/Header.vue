<template>
  <div class="flex justify-between items-center h-16 gap-x-4 p-4">
    <div></div>
    <!-- <div class="w-60 h-full flex justify-start items-center">
      <img
        src="~/public/letsChat_logo.png"
        @click="passToIndex()"
        class="w-14 h-12 cursor-pointer"
      />
    </div> -->

    <div class="flex items-center gap-2">
      <div class="whitespace-nowrap">aa</div>
      <!-- {{ i18n.t('page.register.title') }} -->
      <div class="flex items-center gap-x-3" @click="toggleProfile()">
        <div class="rounded-full w-10 h-10 flex items-center max-sm:hidden">
          <!-- <img
            src="https://lh3.googleusercontent.com/a/ACg8ocLhN5lP9d7Uj1lKZMilCZJGHd4MLQuwg952BhxuXxaLCINCvFvL=s96-c"
            class="cursor-pointer w-full h-full object-cover rounded-full"
            sc
          /> -->
          <!-- <img
            :src="
              store.$state.userInfo?.image
                ? store.$state.userInfo.image + '?id=123'
                : '/img/user_image_empty.jpeg'
            "
            class="cursor-pointer w-full h-full object-cover rounded-full"
          /> -->

          <img
            src="/img/th.png"
            class="cursor-pointer w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div class="w-10 h-10">
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
      <!-- <div
        class="sticky z-10"
        ref="profileDropdownRef"
        v-if="store.$state.openPopupProfile"
      >
        <div
          class="absolute flex flex-col z-10 top-6 right-0 bg-white p-6 border w-48 gap-y-3"
        >
          <nuxt-link to="/profile">โปรไฟล์</nuxt-link>
          <hr />
          <a href="#" @click="logout()">ออกจากระบบ</a>
        </div>
      </div> -->

      <div class="hidden max-md:block">
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
// import { onClickOutside } from '@vueuse/core'
import { useIndexStore } from '~/store/main'

const { locales, locale, setLocale }: any = useI18n()
// const profileDropdownRef = ref()
// const i18n = useI18n()
// onClickOutside(profileDropdownRef, (event: any) => {
//   store.openPopupProfile = false
// })

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
