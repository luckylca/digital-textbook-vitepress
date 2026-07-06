<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    type?: 'info' | 'warning' | 'success' | 'error'
  }>(),
  {
    title: '重点提醒',
    type: 'warning'
  }
)
</script>

<template>
  <n-alert :title="title" :type="type" class="important-card" bordered>
    <slot />
  </n-alert>
</template>

<style scoped>
.important-card {
  margin: 18px 0;
  border-radius: 16px;
}
</style>
