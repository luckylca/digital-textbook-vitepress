<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { section51StateRegions } from '../data/section51'
import type { StateRegion } from '../types/teaching'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  states?: StateRegion[]
}>(), {
  title: '运行状态图例：转差率 s 与运行状态',
  subtitle: '点击不同区间，查看转差率范围和运行状态含义。'
})

const resolvedStates = computed(() => props.states?.length ? props.states : section51StateRegions)
const activeId = ref('motor')

watch(resolvedStates, (nextStates) => {
  activeId.value = nextStates.find((item) => item.id === 'motor')?.id || nextStates[0]?.id || 'motor'
}, { deep: true })

const activeRegion = computed(() => resolvedStates.value.find((item) => item.id === activeId.value) || resolvedStates.value[0])

function selectRegion(id: string) {
  activeId.value = id
}
</script>

<template>
  <n-card class="state-map teaching-card" embedded>
    <template #header>{{ title }}</template>
    <p class="state-map__subtitle">{{ subtitle }}</p>

    <div class="state-map__axis" aria-label="转差率状态轴">
      <button
        v-for="region in resolvedStates"
        :key="region.id"
        class="state-segment"
        :class="[`state-segment--${region.id}`, { active: activeId === region.id }]"
        type="button"
        @click="selectRegion(region.id)"
      >
        <strong>{{ region.rangeText }}</strong>
        <span>{{ region.label }}</span>
      </button>
    </div>

    <n-alert v-if="activeRegion" class="state-map__info" type="info" :title="`${activeRegion.label}：${activeRegion.rangeText}`" bordered>
      {{ activeRegion.description }}
    </n-alert>
  </n-card>
</template>

<style scoped>
.state-map {
  margin: 22px 0;
}

.state-map__subtitle {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.state-map__axis {
  display: grid;
  grid-template-columns: 1fr 0.7fr 1.2fr 0.7fr 1fr;
  gap: 8px;
  align-items: stretch;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.08), rgba(22, 163, 74, 0.1), rgba(239, 68, 68, 0.08));
}

.state-segment {
  display: grid;
  place-items: center;
  gap: 4px;
  min-height: 92px;
  padding: 10px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.state-segment span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.state-segment:hover,
.state-segment.active {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.65);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.state-segment.active {
  outline: 3px solid rgba(37, 99, 235, 0.16);
}

.state-map__info {
  margin-top: 16px;
  border-radius: 14px;
}

@media (max-width: 760px) {
  .state-map__axis {
    grid-template-columns: 1fr;
  }

  .state-segment {
    min-height: 74px;
  }
}
</style>
