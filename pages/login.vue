<template>
  <div
    class="flex justify-center items-center h-screen p-40 max-lg:p-10 bg-white relative"
  >
    <div class="w-10 h-10 ms-2 absolute top-5 right-5">
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
    <div
      class="flex justify-between w-full h-full max-lg:block gap-x-10 max-sm:mt-16"
    >
      <div class="w-1/2 h-full max-lg:hidden">
        <div class="flex justify-center items-center w-full h-full">
          <img src="~/public/img/test.webp" />
        </div>
      </div>
      <div class="w-1/2 max-lg:w-full">
        <!-- <div class="flex justify-center items-center max-sm:mt-16">
          <img src="~/public/img/login.png" class="w-32 h-32" />
        </div> -->

        <div>
          <div class="text-3xl max-sm:text-xl text-center my-2">
            {{ i18n.t('page.login.title') }}
          </div>
          <div class="text-center text-md text-gray-400 mb-2">
            {{ i18n.t('page.login.description') }}
          </div>

          <div class="flex justify-center items-center">
            <div
              class="bg-gray-200 flex justify-center gap-3 w-80 p-1 rounded-xl"
            >
              <div class="w-1/2 text-center">
                <button
                  @click="activeBtn('singIn')"
                  :class="checkBtn === 'singIn' ? 'bg-white' : ''"
                  class="w-full rounded-xl p-2"
                >
                  {{ i18n.t('button.login.singIn') }}
                </button>
              </div>
              <div class="w-1/2 text-center">
                <button
                  :class="checkBtn === 'singUp' ? 'bg-white' : ''"
                  @click="activeBtn('singUp')"
                  class="w-full rounded-xl p-2"
                >
                  {{ i18n.t('button.login.singUp') }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="checkBtn === 'singIn'">
            <div class="mb-3 max-sm:mt-3">
              <label class="block mb-2 text-sm font-medium">
                {{ i18n.t('page.login.email') }}</label
              >
              <input
                v-model="formLogin.userId"
                class="bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:border-2 rounded-lg w-full p-2"
                placeholder="please enter user name.."
                @keypress.enter="login()"
                required
              />
            </div>

            <div class="mb-3">
              <label class="block mb-2 text-sm font-medium">
                {{ i18n.t('page.login.password') }}</label
              >

              <div class="relative">
                <input
                  v-model="formLogin.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:border-2 w-full p-2"
                  placeholder="please enter password.."
                  @keypress.enter="login()"
                  required
                />

                <div
                  class="absolute right-1 top-2/4 transform -translate-y-2/4 cursor-pointer"
                  @click="showPassword = !showPassword"
                >
                  <div
                    v-if="showPassword"
                    class="h-[35px] w-10 bg-gray-50 rounded-r-md flex justify-center items-center"
                  >
                    <i class="fa-light fa-eye" />
                  </div>

                  <div
                    v-else
                    class="h-[35px] w-10 bg-gray-50 rounded-r-md flex justify-center items-center"
                  >
                    <i class="fa-light fa-eye-slash" />
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="login()"
              :disabled="formLogin.userId == '' || formLogin.password == ''"
              class="bg-primary text-white border border-gray-300 text-sm rounded-lg focus:outline-none focus:border-blue-500 hover:bg-blue-700 focus:border-2 w-full p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ i18n.t('button.login.singIn') }}
            </button>

            <div class="my-5 text-gray-400 flex items-center">
              <hr class="flex-grow border-gray-300" />
              <span class="px-3 text-sm">{{
                i18n.t('page.login.orther')
              }}</span>
              <hr class="flex-grow border-gray-300" />
            </div>

            <div class="flex justify-center items-center gap-5">
              <div v-for="(items, i) in conncetLogin" :key="i">
                <a
                  :href="`${url}/auth/google/login?redirect_url=${baseUrl}/login`"
                  class="w-80"
                >
                  <button
                    v-if="items.name === '123456789'"
                    class="w-16 h-16 flex justify-center items-center rounded-full border-2"
                  >
                    <Icon
                      :name="items.image"
                      class="w-[90%] h-[90%] object-cover rounded-full"
                    />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import service from '~/service'
import { useIndexStore } from '@/store/main'
import type { FormLogin } from '~/models/auth.model'

definePageMeta({
  layout: 'auth',
  middleware: 'login',
})

interface conncet {
  name: string
  image: string
}

const runtimeConfig = useRuntimeConfig()
const url = runtimeConfig.public.WEB_API
const baseUrl = runtimeConfig.public.BASE_URL
const cookie = useStatefulCookie('token')
const store = useIndexStore()
const router = useRouter()
const route = useRoute()
const { locales, locale, setLocale }: any = useI18n()
const i18n = useI18n()

const conncetLogin = ref<conncet[]>([
  {
    name: 'facebook',
    image: 'logos:facebook',
  },
  {
    name: '123456789',
    image: 'devicon:google',
  },
  {
    name: 'apple',
    image: 'uim:apple-alt',
  },
])

const formLogin = ref<FormLogin>({
  userId: '',
  password: '',
})

const loading = ref<boolean>(false)
const checkBtn = ref<string>('singIn')

const token = useStatefulCookie('token')
const showPassword = ref<boolean>(false)

const activeBtn = async (name: string) => {
  checkBtn.value = name
}
const login = async () => {
  loading.value = true
  await service.auth
    .login(formLogin.value)
    .then(async (resp: any) => {
      const { data } = resp

      token.value = data.token
      router.push('/')
    })
    .catch((err: any) => {
      errorResp(err.response)
    })
    .finally(() => {
      loading.value = false
    })
}

const checkGoogleLogin = async () => {
  if (route.query?.error === 'forbidden') {
    showAlert({
      icon: 'warning',
      title: 'รอการอนุมัติจากผู้ดูแลระบบ',
    })
  } else if (route.query?.error === 'internal-error') {
    showAlert({
      icon: 'error',
      title: 'Login fail!',
      text: `${route.query?.error || ''}`,
    })
  }
  if (route.query?.token) {
    cookie.value = route.query?.token
    router.push('/')
  }
}

onMounted(() => {
  checkGoogleLogin()
})
</script>
