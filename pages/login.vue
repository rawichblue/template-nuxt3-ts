<template>
  <div
    class="flex justify-center items-center h-screen p-40 max-lg:p-10 bg-white"
  >
    <div class="flex justify-between w-full h-full max-lg:block gap-x-10">
      <div class="w-1/2 h-full max-lg:hidden">
        <div class="flex justify-center items-center w-full h-full">
          <img src="~/public/img/test.webp" />
        </div>
      </div>
      <div class="w-1/2 max-lg:w-full">
        <div class="flex justify-center items-center max-sm:mt-16">
          <img src="~/public/img/login.png" class="w-32 h-32" />
        </div>

        <div>
          <div class="text-3xl max-sm:text-xl text-center my-2">
            Log in to your account
          </div>
          <div class="text-center text-md text-gray-500 mb-2">
            Welcome back! Please enter your details.
          </div>
          <div class="mb-3">
            <label class="block mb-2 text-sm font-medium">Email</label>
            <input
              class="bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:border-2 rounded-lg w-full p-2"
              placeholder="please enter user name.."
              @keypress.enter="login()"
              required
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 text-sm font-medium">Password</label>

            <div class="relative">
              <input
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

          <div class="mb-3">
            <div class="flex">
              <div class="flex items-center gap-x-2 w-1/2">
                <label class="custom-checkbox">
                  <input type="checkbox" />
                  <span class="checkbox-box"></span>
                </label>

                <div>Remember me</div>
              </div>
              <div class="w-1/2 flex items-center justify-end text-primary">
                Forgot Password
              </div>
            </div>
          </div>

          <NuxtLink to="/">
            <button
              class="bg-primary text-white border border-gray-300 text-sm rounded-lg focus:outline-none focus:border-blue-500 hover:bg-blue-700 focus:border-2 w-full p-2 mb-2"
            >
              Sign in
            </button>
          </NuxtLink>

          <!-- @click="login()" -->
          <button
            class="text-black border border-gray-300 text-sm rounded-lg focus:outline-none focus:border-blue-500 hover:bg-gray-100 focus:border-2 w-full p-2"
          >
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import service from '~/service'
import { useIndexStore } from '@/store/main'
import type { Login } from '~/models/auth.model'

definePageMeta({
  layout: 'auth',
})
const loading = ref<boolean>(false)
const store = useIndexStore()
const router = useRouter()
const showPassword = ref<boolean>(false)

const login = async () => {}
</script>
