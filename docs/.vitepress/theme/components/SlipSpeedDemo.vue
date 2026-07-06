<script setup lang="ts">
import { computed, ref } from 'vue'

const frequency = ref(50)
const polePairs = ref(2)
const rotorSpeed = ref(1440)

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

const stateInfo = computed(() => {
  const s = slip.value

  if (Math.abs(s) < 0.005) {
    return {
      type: 'warning' as const,
      title: '同步点',
      label: '接近同步转速',
      desc: '转子与旋转磁场几乎同步，转子导体难以切割磁感线，不能产生稳定感应电动势和稳定电磁转矩。'
    }
  }

  if (s > 0 && s < 1) {
    return {
      type: 'success' as const,
      title: '电动机状态',
      label: '0 < s < 1',
      desc: '转子转速低于同步转速，电磁转矩为驱动转矩，电网电能转化为机械能。'
    }
  }

  if (s < 0) {
    return {
      type: 'info' as const,
      title: '发电机状态',
      label: 's < 0',
      desc: '转子转速高于同步转速，电磁转矩为制动转矩，机械能可以转化为电能送回电网。'
    }
  }

  return {
    type: 'error' as const,
    title: '电磁制动状态',
    label: 's > 1',
    desc: '转子反向转动，定子侧和转子侧都吸收功率，能量主要转化为电机内部损耗。'
  }
})

const fieldStyle = computed(() => ({
  animationDuration: `${Math.max(1.2, 10 - Math.min(syncSpeed.value, 3600) / 420)}s`
}))

const rotorStyle = computed(() => ({
  animationDuration: `${Math.max(1.2, 10 - Math.min(Math.abs(rotorSpeed.value), 3600) / 420)}s`
}))

const rotorClass = computed(() => ({
  'is-reverse': rotorSpeed.value < 0,
  'is-paused': Math.abs(rotorSpeed.value) < 1
}))
</script>

<template>
  <n-card class="slip-demo teaching-card" embedded>
    <template #header>同步转速与转差率交互演示</template>

    <p class="slip-demo__intro">
      调节定子频率、极对数和转子转速，观察同步转速、转差率和运行状态的变化。
    </p>

    <div class="slip-demo__layout">
      <div class="slip-demo__controls">
        <label>定子频率 f1：{{ frequency }} Hz</label>
        <n-slider v-model:value="frequency" :min="10" :max="100" :step="1" />
        <n-input-number v-model:value="frequency" :min="10" :max="100" :step="1" />

        <label>极对数 p</label>
        <n-select v-model:value="polePairs" :options="polePairOptions" />

        <label>转子转速 n：{{ rotorSpeed }} r/min</label>
        <n-slider v-model:value="rotorSpeed" :min="-500" :max="4000" :step="10" />
        <n-input-number v-model:value="rotorSpeed" :min="-500" :max="4000" :step="10" />
      </div>

      <div class="slip-demo__visual">
        <div class="motor-visual" aria-label="异步电机转速示意图">
          <div class="ring ring--field" :style="fieldStyle">
            <span>旋转磁场 n1</span>
          </div>
          <div class="ring ring--rotor" :class="rotorClass" :style="rotorStyle">
            <span>转子 n</span>
          </div>
          <div class="motor-visual__shaft" />
        </div>

        <div class="slip-demo__metrics">
          <n-statistic label="同步转速 n1" :value="syncSpeedText" />
          <n-statistic label="转差率 s" :value="slipPercent" />
        </div>

        <n-alert :type="stateInfo.type" :title="stateInfo.title" bordered>
          <strong>{{ stateInfo.label }}</strong>：{{ stateInfo.desc }}
        </n-alert>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.slip-demo {
  margin: 22px 0;
}

.slip-demo__intro {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.slip-demo__layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(280px, 1.1fr);
  gap: 22px;
}

.slip-demo__controls {
  display: grid;
  gap: 10px;
  align-content: start;
}

.slip-demo__controls label {
  margin-top: 8px;
  font-weight: 700;
}

.slip-demo__visual {
  display: grid;
  gap: 16px;
}

.motor-visual {
  position: relative;
  min-height: 280px;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent 62%), rgba(248, 250, 252, 0.8);
  overflow: hidden;
}

.ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  animation-name: spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.ring::after {
  content: '';
  position: absolute;
  right: -7px;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 14px solid currentColor;
  transform: translateY(-50%);
}

.ring span {
  position: absolute;
  left: 50%;
  top: -34px;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.86rem;
  font-weight: 700;
}

.ring--field {
  width: 190px;
  height: 190px;
  border: 3px dashed #2563eb;
  color: #2563eb;
}

.ring--rotor {
  width: 118px;
  height: 118px;
  border: 3px solid #16a34a;
  color: #16a34a;
}

.ring--rotor.is-reverse {
  animation-direction: reverse;
}

.ring--rotor.is-paused {
  animation-play-state: paused;
}

.motor-visual__shaft {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--vp-c-text-2);
  transform: translate(-50%, -50%);
}

.slip-demo__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 760px) {
  .slip-demo__layout {
    grid-template-columns: 1fr;
  }

  .slip-demo__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
