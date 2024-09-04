<template>
  <div class="flex flex-col min-h-screen bg-[#f1f1f1] text-color">
    <ModalLange />
    <div class="flex relative">
      <div class="w-72 h-screen sticky top-0"><Sidebar /></div>

      <div class="w-full">
        <div class="sticky top-0">
          <Header />
        </div>
        <div class="overflow-auto p-10">
          <slot />
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
