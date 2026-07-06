<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    type?: 'default' | 'concept' | 'formula' | 'summary'
  }>(),
  {
    type: 'default'
  }
)

const typeTextMap = {
  default: '知识点',
  concept: '概念',
  formula: '公式',
  summary: '总结'
}
</script>

<template>
  <n-card class="teaching-card knowledge-card" embedded>
    <template #header>
      <div class="knowledge-card__header">
        <span>{{ props.title }}</span>
        <n-tag size="small" round>{{ typeTextMap[props.type] }}</n-tag>
      </div>
    </template>

    <div class="knowledge-card__body">
      <slot />
    </div>
  </n-card>
</template>

<style scoped>
.knowledge-card {
  margin: 18px 0;
}

.knowledge-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.knowledge-card__body {
  color: var(--vp-c-text-1);
  line-height: 1.8;
}
</style>
