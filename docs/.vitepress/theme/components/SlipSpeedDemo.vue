<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  defaultFrequency?: number
  defaultPolePairs?: number
  defaultRotorSpeed?: number
}>(), {
  title: '同步转速与转差率交互演示',
  subtitle: '拖动参数或点击状态示例，观察旋转磁场、转子相对运动、感应强弱和运行状态如何变化。',
  defaultFrequency: 50,
  defaultPolePairs: 2,
  defaultRotorSpeed: 1440
})

const frequency = ref(props.defaultFrequency)
const polePairs = ref(props.defaultPolePairs)
const rotorSpeed = ref(props.defaultRotorSpeed)
const fieldAngle = ref(0)
const rotorAngle = ref(0)
let frameId: number | null = null
let lastTime = 0

const polePairOptions = [
  { label: '1 对极', value: 1 },
  { label: '2 对极', value: 2 },
  { label: '3 对极', value: 3 },
  { label: '4 对极', value: 4 }
]

const examples = [
  { label: '电动机状态示例', f1: 50, p: 2, n: 1440 },
  { label: '接近同步示例', f1: 50, p: 2, n: 1495 },
  { label: '发电机状态示例', f1: 50, p: 2, n: 1550 },
  { label: '电磁制动示例', f1: 50, p: 2, n: -200 }
]

const syncSpeed = computed(() => (60 * frequency.value) / polePairs.value)
const slip = computed(() => (syncSpeed.value - rotorSpeed.value) / syncSpeed.value)
const slipPercent = computed(() => `${(slip.value * 100).toFixed(2)}%`)
const syncSpeedText = computed(() => `${syncSpeed.value.toFixed(0)} r/min`)
const relativeCutting = computed(() => Math.abs(syncSpeed.value - rotorSpeed.value) / Math.max(Math.abs(syncSpeed.value), 1))
const inductionPercent = computed(() => Math.round(Math.min(100, relativeCutting.value * 100)))
const isNearSync = computed(() => Math.abs(slip.value) < 0.01)

const inductionLevel = computed(() => {
  if (relativeCutting.value < 0.03) return '低'
  if (relativeCutting.value < 0.25) return '中'
  return '高'
})

const stateInfo = computed(() => {
  const s = slip.value
  if (isNearSync.value) {
    return { key: 'sync', type: 'warning' as const, title: '接近同步点', label: '相对切割很弱', desc: '转子与旋转磁场接近同步，切割磁感线能力减弱，感应电动势和电磁转矩都明显变弱。' }
  }
  if (s > 0 && s < 1) {
    return { key: 'motor', type: 'success' as const, title: '电动机状态', label: '0 < s < 1', desc: '旋转磁场快于转子，转子被磁场牵引，电磁转矩表现为驱动转矩。' }
  }
  if (s < 0) {
    return { key: 'generator', type: 'info' as const, title: '发电机状态', label: 's < 0', desc: '转子转速超过同步转速，电磁转矩变为制动转矩，机械能可以转化为电能。' }
  }
  return { key: 'brake', type: 'error' as const, title: '电磁制动状态', label: 's > 1', desc: '转子反向转动，转子与旋转磁场相对切割很强，电磁转矩表现为制动转矩。' }
})

const torqueText = computed(() => {
  if (stateInfo.value.key === 'sync') return '转矩趋势：接近同步，稳定感应转矩很弱'
  if (stateInfo.value.key === 'motor') return '转矩趋势：驱动转矩，推动转子跟随磁场转动'
  if (stateInfo.value.key === 'generator') return '转矩趋势：制动转矩，阻碍转子继续超同步转动'
  return '转矩趋势：制动转矩，能量主要转化为内部损耗'
})

function visualDegPerSecond(rpm: number) {
  if (Math.abs(rpm) < 1) return 0
  return Math.sign(rpm) * (35 + Math.min(Math.abs(rpm), 3600) / 3600 * 280)
}

function tick(time: number) {
  if (!lastTime) lastTime = time
  const dt = Math.min(0.05, (time - lastTime) / 1000)
  lastTime = time
  fieldAngle.value = (fieldAngle.value + visualDegPerSecond(syncSpeed.value) * dt) % 360
  rotorAngle.value = (rotorAngle.value + visualDegPerSecond(rotorSpeed.value) * dt) % 360
  frameId = requestAnimationFrame(tick)
}

function applyExample(example: { f1: number; p: number; n: number }) {
  frequency.value = example.f1
  polePairs.value = example.p
  rotorSpeed.value = example.n
}

onMounted(() => {
  frameId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frameId !== null) cancelAnimationFrame(frameId)
})
</script>

<template>
  <n-card class="slip-demo teaching-card" embedded>
    <template #header>{{ title }}</template>

    <p class="slip-demo__intro">{{ subtitle }}</p>

    <div class="example-buttons">
      <n-button v-for="item in examples" :key="item.label" size="small" secondary @click="applyExample(item)">
        {{ item.label }}
      </n-button>
    </div>

    <div class="slip-demo__layout">
      <div class="slip-demo__controls">
        <div class="control-row">
          <label>定子频率 f1：{{ frequency }} Hz</label>
          <n-input-number v-model:value="frequency" :min="10" :max="100" :step="1" />
        </div>
        <n-slider v-model:value="frequency" :min="10" :max="100" :step="1" />

        <div class="control-row">
          <label>极对数 p</label>
          <n-select v-model:value="polePairs" :options="polePairOptions" />
        </div>

        <div class="control-row">
          <label>转子转速 n：{{ rotorSpeed }} r/min</label>
          <n-input-number v-model:value="rotorSpeed" :min="-500" :max="4000" :step="10" />
        </div>
        <n-slider v-model:value="rotorSpeed" :min="-500" :max="4000" :step="10" />

        <div class="meter-card">
          <div class="meter-card__head">
            <strong>切割磁感线强弱：{{ inductionLevel }}</strong>
            <span>{{ inductionPercent }}%</span>
          </div>
          <n-progress type="line" :percentage="inductionPercent" :show-indicator="false" />
          <p>相对切割速度 = |n1 - n| / |n1|。越接近同步，相对切割越弱。</p>
        </div>
      </div>

      <div class="slip-demo__visual">
        <div class="motor-visual" :class="`is-${stateInfo.key}`" aria-label="旋转磁场与转子相对运动示意图">
          <svg viewBox="0 0 360 320" role="img">
            <defs>
              <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#2563eb" />
              </marker>
              <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#16a34a" />
              </marker>
            </defs>
            <circle cx="180" cy="160" r="112" class="stator-ring" />
            <circle cx="180" cy="160" r="84" class="air-gap" />
            <circle cx="180" cy="160" r="58" class="rotor-ring" />
            <g :transform="`rotate(${fieldAngle} 180 160)`">
              <path d="M 180 48 A 112 112 0 0 1 292 160" class="field-arrow" marker-end="url(#arrow-blue)" />
              <text x="188" y="42" class="field-label">旋转磁场 n1</text>
            </g>
            <g :transform="`rotate(${rotorAngle} 180 160)`">
              <path d="M 180 102 A 58 58 0 0 1 238 160" class="rotor-arrow" marker-end="url(#arrow-green)" />
              <line x1="180" y1="160" x2="230" y2="160" class="rotor-pointer" />
            </g>
            <text x="180" y="158" text-anchor="middle" class="gap-label">气隙</text>
            <text x="180" y="178" text-anchor="middle" class="rotor-label">转子</text>
          </svg>
          <div class="state-pill">{{ stateInfo.title }}</div>
        </div>

        <div class="slip-demo__metrics">
          <n-statistic label="同步转速 n1" :value="syncSpeedText" />
          <n-statistic label="转差率 s" :value="slipPercent" />
        </div>

        <n-alert :type="stateInfo.type" :title="stateInfo.title" bordered>
          <p><strong>{{ stateInfo.label }}</strong>：{{ stateInfo.desc }}</p>
          <p>{{ torqueText }}</p>
        </n-alert>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.slip-demo { margin: 22px 0; }
.slip-demo__intro { margin-top: 0; color: var(--vp-c-text-2); line-height: 1.8; }
.example-buttons { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
.slip-demo__layout { display: grid; grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr); gap: 24px; }
.slip-demo__controls { display: grid; gap: 12px; align-content: start; }
.control-row { display: grid; grid-template-columns: minmax(150px, 1fr) minmax(120px, 180px); gap: 12px; align-items: center; }
.control-row label { font-weight: 700; }
.meter-card { padding: 16px; border: 1px solid rgba(148, 163, 184, 0.26); border-radius: 18px; background: rgba(248, 250, 252, 0.76); }
.meter-card__head { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.meter-card p { margin: 10px 0 0; color: var(--vp-c-text-2); line-height: 1.7; }
.slip-demo__visual { display: grid; gap: 16px; }
.motor-visual { position: relative; min-height: 320px; border-radius: 24px; border: 1px solid rgba(148, 163, 184, 0.28); background: radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent 62%), rgba(248, 250, 252, 0.86); overflow: hidden; }
.motor-visual svg { display: block; width: 100%; height: 320px; }
.stator-ring { fill: rgba(37, 99, 235, 0.08); stroke: rgba(37, 99, 235, 0.32); stroke-width: 16; }
.air-gap { fill: none; stroke: rgba(245, 158, 11, 0.36); stroke-width: 22; stroke-dasharray: 8 8; }
.rotor-ring { fill: rgba(22, 163, 74, 0.12); stroke: rgba(22, 163, 74, 0.48); stroke-width: 14; }
.field-arrow { fill: none; stroke: #2563eb; stroke-width: 5; stroke-linecap: round; }
.rotor-arrow { fill: none; stroke: #16a34a; stroke-width: 5; stroke-linecap: round; }
.rotor-pointer { stroke: #16a34a; stroke-width: 4; stroke-linecap: round; }
.field-label, .gap-label, .rotor-label { fill: var(--vp-c-text-1); font-size: 13px; font-weight: 800; }
.state-pill { position: absolute; right: 16px; top: 16px; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.86); font-weight: 800; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08); }
.is-sync .state-pill { color: #b45309; }
.is-motor .state-pill { color: #15803d; }
.is-generator .state-pill { color: #2563eb; }
.is-brake .state-pill { color: #dc2626; }
.slip-demo__metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
@media (max-width: 760px) {
  .slip-demo__layout,
  .slip-demo__metrics {
    grid-template-columns: 1fr;
  }

  .example-buttons :deep(.n-button) {
    flex: 1 1 46%;
  }

  .control-row {
    grid-template-columns: 1fr;
  }

  .meter-card__head {
    align-items: flex-start;
    flex-direction: column;
  }

  .motor-visual {
    min-height: 260px;
  }

  .motor-visual svg {
    height: 260px;
  }

  .state-pill {
    right: 10px;
    top: 10px;
    font-size: 0.86rem;
  }
}
</style>
