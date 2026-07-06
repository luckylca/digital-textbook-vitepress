<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { section51FlowSteps } from '../data/section51'
import type { FlowStep } from '../types/teaching'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  steps?: FlowStep[]
}>(), {
  title: '工作原理交互演示',
  subtitle: '点击右侧环节，观察定子、旋转磁场、转子导体和电磁转矩之间的关系。'
})

const resolvedSteps = computed(() => props.steps?.length ? props.steps : section51FlowSteps)
const currentIndex = ref(0)
const currentStep = computed(() => resolvedSteps.value[currentIndex.value] || resolvedSteps.value[0])
const progress = computed(() => Math.round(((currentIndex.value + 1) / Math.max(resolvedSteps.value.length, 1)) * 100))

watch(resolvedSteps, () => {
  currentIndex.value = 0
}, { deep: true })

function selectStep(index: number) {
  currentIndex.value = index
}

function goPrev() {
  if (currentIndex.value > 0) currentIndex.value -= 1
}

function goNext() {
  if (currentIndex.value < resolvedSteps.value.length - 1) currentIndex.value += 1
}

function partActive(part: 'stator' | 'field' | 'rotor' | 'conductor' | 'torque') {
  const id = currentStep.value?.id
  if (part === 'stator') return ['winding', 'grid', 'current'].includes(id)
  if (part === 'field') return ['field', 'cut', 'induction', 'torque', 'rotate'].includes(id)
  if (part === 'rotor') return ['cut', 'induction', 'torque', 'rotate'].includes(id)
  if (part === 'conductor') return ['cut', 'induction', 'torque'].includes(id)
  return ['torque', 'rotate'].includes(id)
}
</script>

<template>
  <n-card class="principle-explorer teaching-card" embedded>
    <template #header>{{ title }}</template>

    <p class="principle-explorer__intro">{{ subtitle }}</p>

    <div class="principle-explorer__layout">
      <div class="principle-explorer__visual" aria-label="旋转磁场与感应过程示意图">
        <svg viewBox="0 0 420 320" role="img">
          <circle cx="210" cy="160" r="118" class="stator-shell" :class="{ active: partActive('stator') }" />
          <circle cx="210" cy="160" r="90" class="field-zone" :class="{ active: partActive('field') }" />
          <circle cx="210" cy="160" r="58" class="rotor-core" :class="{ active: partActive('rotor') }" />
          <g class="stator-windings" :class="{ active: partActive('stator') }">
            <circle cx="210" cy="54" r="9" />
            <circle cx="118" cy="214" r="9" />
            <circle cx="302" cy="214" r="9" />
          </g>
          <g class="field-arrow" :class="{ active: partActive('field') }">
            <path d="M 210 70 A 90 90 0 0 1 300 160" />
            <polygon points="300,160 288,153 288,167" />
          </g>
          <g class="rotor-bars" :class="{ active: partActive('conductor') }">
            <line x1="176" y1="128" x2="244" y2="192" />
            <line x1="244" y1="128" x2="176" y2="192" />
          </g>
          <g class="torque-arrow" :class="{ active: partActive('torque') }">
            <path d="M 210 104 A 56 56 0 0 1 266 160" />
            <polygon points="266,160 255,154 255,166" />
          </g>
          <text x="210" y="34" text-anchor="middle">定子三相绕组</text>
          <text x="210" y="160" text-anchor="middle">转子</text>
          <text x="210" y="286" text-anchor="middle">气隙旋转磁场与转子感应过程</text>
        </svg>
      </div>

      <div class="principle-explorer__steps">
        <n-progress type="line" :percentage="progress" :show-indicator="false" />
        <button
          v-for="(step, index) in resolvedSteps"
          :key="step.id"
          class="principle-step"
          :class="{ active: index === currentIndex }"
          type="button"
          @click="selectStep(index)"
        >
          <span>{{ index + 1 }}</span>
          <strong>{{ step.title }}</strong>
        </button>
      </div>
    </div>

    <n-alert v-if="currentStep" class="principle-explorer__desc" type="info" :title="currentStep.title" bordered>
      {{ currentStep.description }}
    </n-alert>

    <div class="principle-explorer__actions">
      <n-button :disabled="currentIndex === 0" @click="goPrev">上一步</n-button>
      <n-button type="primary" :disabled="currentIndex === resolvedSteps.length - 1" @click="goNext">下一步</n-button>
    </div>
  </n-card>
</template>

<style scoped>
.principle-explorer { margin: 22px 0; }
.principle-explorer__intro { margin-top: 0; color: var(--vp-c-text-2); line-height: 1.8; }
.principle-explorer__layout { display: grid; grid-template-columns: minmax(300px, 1fr) minmax(280px, 0.9fr); gap: 20px; align-items: stretch; }
.principle-explorer__visual { display: grid; place-items: center; min-height: 340px; border: 1px solid rgba(148, 163, 184, 0.28); border-radius: 24px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(16, 185, 129, 0.08)); }
.principle-explorer__visual svg { width: 100%; max-width: 430px; height: auto; }
.principle-explorer__visual text { fill: var(--vp-c-text-1); font-size: 13px; font-weight: 800; }
.stator-shell { fill: rgba(37, 99, 235, 0.06); stroke: rgba(37, 99, 235, 0.24); stroke-width: 18; transition: stroke 0.2s ease, filter 0.2s ease; }
.field-zone { fill: none; stroke: rgba(245, 158, 11, 0.26); stroke-width: 20; stroke-dasharray: 9 8; transition: stroke 0.2s ease, filter 0.2s ease; }
.rotor-core { fill: rgba(22, 163, 74, 0.12); stroke: rgba(22, 163, 74, 0.38); stroke-width: 14; transition: stroke 0.2s ease, filter 0.2s ease; }
.stator-windings circle { fill: rgba(37, 99, 235, 0.28); transition: fill 0.2s ease, filter 0.2s ease; }
.field-arrow path, .torque-arrow path { fill: none; stroke-width: 5; stroke-linecap: round; opacity: 0.35; transition: opacity 0.2s ease, stroke 0.2s ease; }
.field-arrow path { stroke: #2563eb; }
.field-arrow polygon { fill: #2563eb; opacity: 0.35; }
.torque-arrow path { stroke: #16a34a; }
.torque-arrow polygon { fill: #16a34a; opacity: 0.35; }
.rotor-bars line { stroke: #16a34a; stroke-width: 6; stroke-linecap: round; opacity: 0.32; transition: opacity 0.2s ease, stroke-width 0.2s ease; }
.active.stator-shell, .active.field-zone, .active.rotor-core { filter: drop-shadow(0 10px 18px rgba(37, 99, 235, 0.18)); stroke-opacity: 1; }
.stator-windings.active circle { fill: rgba(37, 99, 235, 0.78); filter: drop-shadow(0 6px 10px rgba(37, 99, 235, 0.22)); }
.field-arrow.active path, .field-arrow.active polygon, .torque-arrow.active path, .torque-arrow.active polygon { opacity: 1; }
.rotor-bars.active line { opacity: 1; stroke-width: 8; }
.principle-explorer__steps { display: grid; gap: 8px; align-content: start; }
.principle-step { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: center; padding: 11px 12px; border: 1px solid rgba(148, 163, 184, 0.28); border-radius: 14px; background: rgba(255, 255, 255, 0.76); color: var(--vp-c-text-1); cursor: pointer; text-align: left; transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease; }
.principle-step span { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 999px; background: rgba(37, 99, 235, 0.12); color: var(--vp-c-brand-1); font-weight: 800; }
.principle-step.active, .principle-step:hover { transform: translateY(-1px); border-color: rgba(37, 99, 235, 0.58); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08); }
.principle-step.active span { background: var(--vp-c-brand-1); color: white; }
.principle-explorer__desc { margin-top: 16px; border-radius: 14px; }
.principle-explorer__actions { display: flex; gap: 10px; margin-top: 14px; }
@media (max-width: 760px) { .principle-explorer__layout { grid-template-columns: 1fr; } }
</style>
