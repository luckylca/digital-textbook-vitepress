<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    steps?: string[]
  }>(),
  {
    title: '分步骤讲解',
    steps: () => []
  }
)
</script>

<template>
  <n-card class="teaching-card step-explain" embedded>
    <template #header>{{ title }}</template>

    <n-timeline v-if="steps.length > 0">
      <n-timeline-item
        v-for="(step, index) in steps"
        :key="step"
        :title="`步骤 ${index + 1}`"
        :content="step"
      />
    </n-timeline>

    <div v-else class="step-explain__slot">
      <slot />
    </div>
  </n-card>
</template>

<style scoped>
.step-explain {
  margin: 18px 0;
}

.step-explain__slot {
  line-height: 1.8;
}
</style>
