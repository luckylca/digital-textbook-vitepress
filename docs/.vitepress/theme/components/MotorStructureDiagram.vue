<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { section51MotorParts } from '../data/section51'
import type { MotorPart } from '../types/teaching'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  parts?: MotorPart[]
}>(), {
  title: '异步电机结构图例',
  subtitle: '点击图中的不同部位，查看定子、转子、气隙、转轴和机座的作用。'
})

const resolvedParts = computed(() => props.parts?.length ? props.parts : section51MotorParts)
const activeId = ref(resolvedParts.value[0]?.id || 'stator')

watch(resolvedParts, (nextParts) => {
  activeId.value = nextParts[0]?.id || 'stator'
}, { deep: true })

const activePart = computed(() => resolvedParts.value.find((part) => part.id === activeId.value) || resolvedParts.value[0])

function selectPart(id: string) {
  activeId.value = id
}
</script>

<template>
  <n-card class="structure-diagram teaching-card" embedded>
    <template #header>{{ title }}</template>

    <p class="structure-diagram__intro">{{ subtitle }}</p>

    <div class="structure-diagram__layout">
      <div class="structure-diagram__canvas">
        <svg viewBox="0 0 420 300" role="img" aria-label="电机简化剖面图">
          <rect x="38" y="50" width="344" height="200" rx="28" class="part part--frame" :class="{ active: activeId === 'frame' }" @click="selectPart('frame')" />
          <circle cx="210" cy="150" r="96" class="part part--stator" :class="{ active: activeId === 'stator' }" @click="selectPart('stator')" />
          <circle cx="210" cy="150" r="67" class="part part--gap" :class="{ active: activeId === 'gap' }" @click="selectPart('gap')" />
          <circle cx="210" cy="150" r="50" class="part part--rotor" :class="{ active: activeId === 'rotor' }" @click="selectPart('rotor')" />
          <rect x="100" y="141" width="220" height="18" rx="9" class="part part--shaft" :class="{ active: activeId === 'shaft' }" @click="selectPart('shaft')" />
          <text x="210" y="42" text-anchor="middle">机座</text>
          <text x="210" y="82" text-anchor="middle">定子</text>
          <text x="292" y="155">气隙</text>
          <text x="210" y="154" text-anchor="middle">转子</text>
          <text x="210" y="134" text-anchor="middle">转轴</text>
        </svg>
      </div>

      <div v-if="activePart" class="structure-diagram__info">
        <n-tag round type="info">当前部位</n-tag>
        <h3>{{ activePart.name }}</h3>
        <p>{{ activePart.description }}</p>

        <div class="structure-diagram__buttons">
          <n-button
            v-for="part in resolvedParts"
            :key="part.id"
            size="small"
            :type="part.id === activeId ? 'primary' : 'default'"
            secondary
            @click="selectPart(part.id)"
          >
            {{ part.name }}
          </n-button>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.structure-diagram {
  margin: 22px 0;
}

.structure-diagram__intro {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.structure-diagram__layout {
  display: grid;
  grid-template-columns: minmax(300px, 1.1fr) minmax(240px, 0.9fr);
  gap: 20px;
  align-items: center;
}

.structure-diagram__canvas {
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08));
  overflow: hidden;
}

.structure-diagram__canvas svg {
  display: block;
  width: 100%;
  height: auto;
}

.structure-diagram__canvas text {
  fill: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 700;
  pointer-events: none;
}

.part {
  cursor: pointer;
  transition: opacity 0.2s ease, stroke-width 0.2s ease, filter 0.2s ease;
}

.part:hover,
.part.active {
  filter: drop-shadow(0 8px 14px rgba(37, 99, 235, 0.18));
  opacity: 1;
  stroke-width: 5;
}

.part--frame { fill: rgba(148, 163, 184, 0.16); stroke: #64748b; stroke-width: 3; }
.part--stator { fill: rgba(37, 99, 235, 0.18); stroke: #2563eb; stroke-width: 3; }
.part--gap { fill: rgba(255, 255, 255, 0.82); stroke: #f59e0b; stroke-width: 3; stroke-dasharray: 8 7; }
.part--rotor { fill: rgba(22, 163, 74, 0.22); stroke: #16a34a; stroke-width: 3; }
.part--shaft { fill: rgba(15, 23, 42, 0.72); stroke: #0f172a; stroke-width: 2; }

.structure-diagram__info {
  padding: 20px;
  border-radius: 20px;
  background: rgba(248, 250, 252, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.24);
}

.structure-diagram__info h3 {
  margin: 12px 0 8px;
}

.structure-diagram__info p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.structure-diagram__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

@media (max-width: 760px) {
  .structure-diagram__layout {
    grid-template-columns: 1fr;
  }
}
</style>
