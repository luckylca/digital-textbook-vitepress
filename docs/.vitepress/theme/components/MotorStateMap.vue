<script setup lang="ts">
import { computed, ref } from 'vue'

type RegionKey = 'generator' | 'sync' | 'motor' | 'locked' | 'brake'

interface RegionInfo {
  key: RegionKey
  label: string
  range: string
  desc: string
}

const regions: RegionInfo[] = [
  { key: 'generator', label: '发电机状态', range: 's < 0', desc: '转子转速高于同步转速，电磁转矩为制动转矩，机械能可以转化为电能。' },
  { key: 'sync', label: '同步点', range: 's = 0', desc: '转子与旋转磁场同步，切割磁感线能力很弱，不能产生稳定感应转矩。' },
  { key: 'motor', label: '电动机状态', range: '0 < s < 1', desc: '转子转速低于同步转速，电磁转矩为驱动转矩，是最常见的电动机运行状态。' },
  { key: 'locked', label: '堵转点', range: 's = 1，n = 0', desc: '转子转速为零，常用于理解起动瞬间，但不是长期正常运行点。' },
  { key: 'brake', label: '电磁制动状态', range: 's > 1', desc: '转子反向转动，电磁转矩与转速反向，机械能和电网电能主要转化为内部损耗。' }
]

const activeKey = ref<RegionKey>('motor')
const activeRegion = computed(() => regions.find((item) => item.key === activeKey.value) || regions[2])

function selectRegion(key: RegionKey) {
  activeKey.value = key
}
</script>

<template>
  <n-card class="state-map teaching-card" embedded>
    <template #header>运行状态图例：转差率 s 与运行状态</template>

    <div class="state-map__axis" aria-label="转差率状态轴">
      <button class="state-segment state-segment--generator" :class="{ active: activeKey === 'generator' }" type="button" @click="selectRegion('generator')">
        <strong>s &lt; 0</strong>
        <span>发电机状态</span>
      </button>
      <button class="state-point" :class="{ active: activeKey === 'sync' }" type="button" @click="selectRegion('sync')">
        s = 0<br />同步点
      </button>
      <button class="state-segment state-segment--motor" :class="{ active: activeKey === 'motor' }" type="button" @click="selectRegion('motor')">
        <strong>0 &lt; s &lt; 1</strong>
        <span>电动机状态</span>
      </button>
      <button class="state-point" :class="{ active: activeKey === 'locked' }" type="button" @click="selectRegion('locked')">
        s = 1<br />堵转点
      </button>
      <button class="state-segment state-segment--brake" :class="{ active: activeKey === 'brake' }" type="button" @click="selectRegion('brake')">
        <strong>s &gt; 1</strong>
        <span>电磁制动状态</span>
      </button>
    </div>

    <n-alert class="state-map__info" type="info" :title="`${activeRegion.label}：${activeRegion.range}`" bordered>
      {{ activeRegion.desc }}
    </n-alert>
  </n-card>
</template>

<style scoped>
.state-map {
  margin: 22px 0;
}

.state-map__axis {
  display: grid;
  grid-template-columns: 1fr 0.52fr 1.2fr 0.52fr 1fr;
  gap: 8px;
  align-items: stretch;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.08), rgba(22, 163, 74, 0.1), rgba(239, 68, 68, 0.08));
}

.state-segment,
.state-point {
  min-height: 92px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  border-radius: 16px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.state-segment {
  display: grid;
  place-items: center;
  gap: 4px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.72);
}

.state-point {
  background: rgba(255, 255, 255, 0.9);
  font-weight: 700;
}

.state-segment span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.state-segment:hover,
.state-point:hover,
.state-segment.active,
.state-point.active {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.65);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.state-segment.active,
.state-point.active {
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

  .state-segment,
  .state-point {
    min-height: 74px;
  }
}
</style>
