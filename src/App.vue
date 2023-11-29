<script setup lang="ts">
import Logo from "./components/Logo.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div
      class="w-full flex flex-none flex-col items-center py-3 bg-black text-white"
    >
      <Logo class="stroke-[40] w-14" />
    </div>
    <div
      class="flex-1 w-full p-5 text-center text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-950 text-gray-200"
    >
      Welcome to XGI
    </div>
  </div>
</template>
