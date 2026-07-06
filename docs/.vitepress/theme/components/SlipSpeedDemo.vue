<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  defaultFrequency?: number
  defaultPolePairs?: number
  defaultRotorSpeed?: number
}>(), {
  title: '同步转速与转差率交互演示',
  subtitle: '调节定子频率、极对数和转子转速，观察同步转速、转差率和运行状态的变化。',
  defaultFrequency: 50,
  defaultPolePairs: 2,
  defaultRotorSpeed: 1440
})

const frequency = ref(props.defaultFrequency)
const polePairs = ref(props.defaultPolePairs)
const rotorSpeed = ref(props.defaultRotorSpeed)

const polePairOptions = [
  { label: '1 对极', value: 1 },
  { label: '2 对极', value: 2 },
  { label: '3 对极', value: 3 },
  { label: '4 对极', value: 4 }
]

const syncSpeed = computed(() => (60 * frequency.value) / polePairs.value)
const slip = computed(() => (syncSpeed.value - rotorSpeed.value) / syncSpeed.value)
const slipPercent = computed(() => `${(slip.value * 100).toFixed(2)}%`)
const syncSpeedText = computed(() => `${syncSpeed.value.toFixed(0)} r/min`)
const isNearSync = computed(() => Math.abs(slip.value) < 0.005)

const stateInfo = computed(() => {
  const s = slip.value

  if (isNearSync.value) {
    return { key: 'sync', type: 'warning' as const, title: '同步点', label: '接近同步转速', desc: '转子与旋转磁场接近同步，切割磁感线能力减弱，不能产生稳定感应转矩。' }
  }

  if (s > 0 && s < 1) {
    return { key: 'motor', type: 'success' as const, title: '电动机状态', label: '0 < s < 1', desc: '转子转速低于同步转速，电磁转矩为驱动转矩，电网电能转化为机械能。' }
  }

  if (s < 0) {
    return { key: 'generator', type: 'info' as const, title: '发电机状态', label: 's < 0', desc: '转子转速高于同步转速，电磁转矩为制动转矩，机械能可以转化为电能。' }
  }

  return { key: 'brake', type: 'error' as const, title: '电磁制动状态', label: 's > 1', desc: '转子反向转动，定子侧和转子侧都吸收功率，能量主要转化为电机内部损耗。' }
})

const markerLeft = computed(() => {
  const min = -0.5
  const max = 1.5
  const clamped = Math.min(max, Math.max(min, slip.value))
  return `${((clamped - min) / (max - min)) * 100}%`
})

const fieldStyle = computed(() => ({
  animationDuration: `${Math.max(1.1, 10 - Math.min(syncSpeed.value, 3600) / 420)}s`
}))

const rotorStyle = computed(() => ({
  animationDuration: `${Math.max(1.1, 10 - Math.min(Math.abs(rotorSpeed.value), 3600) / 420)}s`
}))

const rotorClass = computed(() => ({
  'is-reverse': rotorSpeed.value < 0,
  'is-paused': Math.abs(rotorSpeed.value) < 1
}))
</script>

<template>
  <n-card class="slip-demo teaching-card" embedded>
    <template #header>{{ title }}</template>

    <p class="slip-demo__intro">{{ subtitle }}</p>

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

        <div class="state-bar" :class="`state-bar--${stateInfo.key}`">
          <div class="state-bar__track">
            <span class="state-bar__segment">s &lt; 0<br />发电机</span>
            <span class="state-bar__segment">0 &lt; s &lt; 1<br />电动机</span>
            <span class="state-bar__segment">s &gt; 1<br />制动</span>
            <span class="state-bar__marker" :style="{ left: markerLeft }" />
          </div>
        </div>
      </div>

      <div class="slip-demo__visual">
        <div class="motor-visual" aria-label="异步电机转速示意图">
          <div class="ring ring--field" :style="fieldStyle"><span>旋转磁场 n1</span></div>
          <div class="ring ring--rotor" :class="rotorClass" :style="rotorStyle"><span>转子 n</span></div>
          <div class="motor-visual__shaft" />
        </div>

        <div class="slip-demo__metrics">
          <n-statistic label="同步转速 n1" :value="syncSpeedText" />
          <n-statistic label="转差率 s" :value="slipPercent" />
        </div>

        <n-alert v-if="isNearSync" type="warning" title="同步点提示" bordered>
          转子与旋转磁场接近同步，切割磁感线能力减弱，因此不能把同步点当作正常稳定电动机状态。
        </n-alert>

        <n-alert :type="stateInfo.type" :title="stateInfo.title" bordered>
          <strong>{{ stateInfo.label }}</strong>：{{ stateInfo.desc }}
        </n-alert>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.slip-demo { margin: 22px 0; }
.slip-demo__intro { margin-top: 0; color: var(--vp-c-text-2); line-height: 1.8; }
.slip-demo__layout { display: grid; grid-template-columns: minmax(260px, 0.9fr) minmax(300px, 1.1fr); gap: 24px; }
.slip-demo__controls { display: grid; gap: 12px; align-content: start; }
.control-row { display: grid; grid-template-columns: minmax(150px, 1fr) minmax(120px, 180px); gap: 12px; align-items: center; }
.control-row label { font-weight: 700; }
.state-bar { padding: 14px; margin-top: 6px; border-radius: 16px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(248, 250, 252, 0.72); }
.state-bar__track { position: relative; display: grid; grid-template-columns: 1fr 1.35fr 1fr; min-height: 62px; overflow: hidden; border-radius: 14px; background: linear-gradient(90deg, rgba(37, 99, 235, 0.16) 0 33%, rgba(22, 163, 74, 0.18) 33% 66%, rgba(239, 68, 68, 0.16) 66% 100%); }
.state-bar__segment { display: grid; place-items: center; color: var(--vp-c-text-1); font-size: 0.86rem; font-weight: 700; text-align: center; }
.state-bar__marker { position: absolute; top: 5px; width: 4px; height: calc(100% - 10px); border-radius: 999px; background: var(--vp-c-text-1); box-shadow: 0 0 0 5px rgba(15, 23, 42, 0.1); transform: translateX(-50%); transition: left 0.25s ease; }
.slip-demo__visual { display: grid; gap: 16px; }
.motor-visual { position: relative; min-height: 300px; border-radius: 24px; border: 1px solid rgba(148, 163, 184, 0.28); background: radial-gradient(circle, rgba(59, 130, 246, 0.14), transparent 62%), rgba(248, 250, 252, 0.86); overflow: hidden; }
.ring { position: absolute; left: 50%; top: 50%; border-radius: 999px; transform: translate(-50%, -50%); animation-name: spin; animation-timing-function: linear; animation-iteration-count: infinite; }
.ring::after { content: ''; position: absolute; right: -9px; top: 50%; width: 0; height: 0; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 20px solid currentColor; transform: translateY(-50%); }
.ring span { position: absolute; left: 50%; top: -38px; padding: 3px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.86); transform: translateX(-50%); white-space: nowrap; font-size: 0.86rem; font-weight: 700; }
.ring--field { width: 198px; height: 198px; border: 4px dashed #2563eb; color: #2563eb; }
.ring--rotor { width: 122px; height: 122px; border: 4px solid #16a34a; color: #16a34a; }
.ring--rotor.is-reverse { animation-direction: reverse; }
.ring--rotor.is-paused { animation-play-state: paused; }
.motor-visual__shaft { position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; border-radius: 999px; background: var(--vp-c-text-2); transform: translate(-50%, -50%); }
.slip-demo__metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
@keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
@media (max-width: 760px) { .slip-demo__layout, .slip-demo__metrics { grid-template-columns: 1fr; } .control-row { grid-template-columns: 1fr; } .state-bar__track { grid-template-columns: 1fr; min-height: 120px; } }
</style>
