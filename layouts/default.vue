<template>
  <div class="flex min-h-screen bg-primary text-gray-300">
    <ModalLange />

    <div class="w-full max-w-72 p-5 max-md:hidden">
      <div
        class="flex flex-col h-[calc(96vh-10px)] overflow-auto mini-scrolls bg-secondary rounded-xl"
      >
        <Sidebar />
      </div>
    </div>
    <div class="w-full fixed z-10">
      <SidebarMoblie />
    </div>

    <div class="relative w-full overflow-auto">
      <div class="h-[60px] w-full sticky top-0 z-30">
        <Header />
      </div>

      <div class="flex-1 w-full max-md:ms-0 p-7 max-sm:p-5 mt-1 overflow-auto">
        <slot />
      </div>

      <div
        class="absolute bottom-6 z-30 bg-secondary rounded-xl w-[98%] max-md:hidden"
      >
        <div class="w-full px-7 py-2 max-sm:p-5">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.overflow-auto {
  max-width: 100%;
  overflow-x: auto;
}
</style>
