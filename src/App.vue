<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'

import { onMounted, ref } from 'vue'

const isMounted = ref(false)

onMounted(async () => {
  isMounted.value = true
})
</script>

<template>
  <div class="h-screen">
    <Toast position="bottom-right" />
    <RouterView/>
  </div>
</template>