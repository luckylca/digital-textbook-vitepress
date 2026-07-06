<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface FlowStep {
  title: string
  desc: string
}

const steps: FlowStep[] = [
  { title: '定子三相对称绕组', desc: '定子中嵌放三相对称绕组，为形成旋转磁场准备空间和电路条件。' },
  { title: '三相对称电网', desc: '定子绕组接入三相对称电网，获得三相交流电源。' },
  { title: '三相对称电流', desc: '三相绕组中流过三相对称电流。' },
  { title: '气隙旋转磁场', desc: '三相对称电流在气隙中建立基波旋转磁场。' },
  { title: '切割转子导体', desc: '旋转磁场与转子导体存在相对运动，转子导体被磁场切割。' },
  { title: '感应电动势和感应电流', desc: '转子导体中产生感应电动势，并在闭合回路中形成感应电流。' },
  { title: '电磁转矩', desc: '转子感应电流与旋转磁场相互作用，在转子上产生电磁转矩。' },
  { title: '转子旋转', desc: '电磁转矩推动转子旋转，实现电能向机械能的转换。' }
]

const currentIndex = ref(0)
const playing = ref(false)
let timer: number | undefined

const currentStep = computed(() => steps[currentIndex.value])
const progress = computed(() => Math.round(((currentIndex.value + 1) / steps.length) * 100))

function stopTimer() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function play() {
  if (playing.value) return
  playing.value = true
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % steps.length
  }, 1400)
}

function pause() {
  playing.value = false
  stopTimer()
}

function reset() {
  pause()
  currentIndex.value = 0
}

function selectStep(index: number) {
  currentIndex.value = index
}

onMounted(() => {
  play()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <n-card class="principle-flow teaching-card" embedded>
    <template #header>工作原理流程动画</template>

    <p class="principle-flow__intro">这不是复杂物理仿真，而是把“电源、磁场、感应、转矩、旋转”的因果链条按顺序亮起来。</p>

    <div class="principle-flow__actions">
      <n-button type="primary" secondary @click="play">播放</n-button>
      <n-button secondary @click="pause">暂停</n-button>
      <n-button secondary @click="reset">重置</n-button>
      <n-progress type="line" :percentage="progress" :show-indicator="false" />
    </div>

    <div class="principle-flow__steps">
      <button
        v-for="(step, index) in steps"
        :key="step.title"
        class="flow-step"
        :class="{ active: index === currentIndex, passed: index < currentIndex }"
        type="button"
        @click="selectStep(index)"
      >
        <span class="flow-step__index">{{ index + 1 }}</span>
        <span>{{ step.title }}</span>
      </button>
    </div>

    <n-alert class="principle-flow__desc" type="info" :title="currentStep.title" bordered>
      {{ currentStep.desc }}
    </n-alert>
  </n-card>
</template>

<style scoped>
.principle-flow {
  margin: 22px 0;
}

.principle-flow__intro {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.principle-flow__actions {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 18px;
}

.principle-flow__steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.flow-step {
  position: relative;
  min-height: 92px;
  padding: 14px 12px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.72);
  color: var(--vp-c-text-1);
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.flow-step::after {
  content: '→';
  position: absolute;
  right: -14px;
  top: 50%;
  color: rgba(37, 99, 235, 0.55);
  transform: translateY(-50%);
}

.flow-step:nth-child(4n)::after,
.flow-step:last-child::after {
  display: none;
}

.flow-step:hover,
.flow-step.active {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.55);
  background: rgba(37, 99, 235, 0.1);
}

.flow-step.passed {
  background: rgba(22, 163, 74, 0.1);
}

.flow-step__index {
  display: inline-grid;
  width: 26px;
  height: 26px;
  margin-right: 8px;
  border-radius: 999px;
  place-items: center;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 0.82rem;
  font-weight: 700;
}

.principle-flow__desc {
  margin-top: 16px;
  border-radius: 14px;
}

@media (max-width: 760px) {
  .principle-flow__actions {
    grid-template-columns: repeat(3, 1fr);
  }

  .principle-flow__actions :deep(.n-progress) {
    grid-column: 1 / -1;
  }

  .principle-flow__steps {
    grid-template-columns: 1fr;
  }

  .flow-step::after {
    display: none;
  }
}
</style>
