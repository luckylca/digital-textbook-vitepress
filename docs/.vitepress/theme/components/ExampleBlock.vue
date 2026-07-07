<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <n-card class="teaching-card example-block" embedded>
    <template #header>
      <div class="example-block__title">{{ title }}</div>
    </template>
    <div class="example-block__content">
      <slot />
    </div>
  </n-card>
</template>

<style scoped>
.example-block {
  margin: 18px 0;
}

.example-block__title {
  font-weight: 700;
}

.example-block__content {
  line-height: 1.8;
}

.example-block__content > :deep(p) {
  margin: 0.7rem 0;
}

.example-block__content > :deep(ul),
.example-block__content > :deep(ol) {
  margin: 0.7rem 0;
}
</style>
