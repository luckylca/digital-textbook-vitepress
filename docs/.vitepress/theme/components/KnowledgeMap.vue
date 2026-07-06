<script setup lang="ts">
import { computed, ref } from 'vue'

type MapMode = 'nodes' | 'brace'
type NodeLevel = 'center' | 'primary' | 'secondary'

interface KnowledgeNode {
  id: string
  label: string
  level: NodeLevel
  x: number
  y: number
  desc: string
}

interface LinkLine {
  from: string
  to: string
}

interface BranchGroup {
  title: string
  items: string[]
  desc: string
}

const mapMode = ref<MapMode>('nodes')
const selectedId = ref('center')
const draggingId = ref<string | null>(null)
const dragOffset = ref({ x: 0, y: 0 })

const defaultNodes: KnowledgeNode[] = [
  { id: 'center', label: '5.1 异步电机概述', level: 'center', x: 430, y: 210, desc: '本节从结构、工作原理、转差率、运行状态和额定值理解异步电机。' },
  { id: 'type-structure', label: '基本类型和结构', level: 'primary', x: 150, y: 92, desc: '先认识异步电机是什么，再掌握单相/三相、笼型/绕线型、定子/转子/气隙。' },
  { id: 'principle', label: '基本工作原理', level: 'primary', x: 710, y: 92, desc: '定子三相电流产生旋转磁场，转子感应出电流，并与磁场作用产生电磁转矩。' },
  { id: 'slip', label: '同步转速与转差率', level: 'primary', x: 132, y: 330, desc: '同步转速由 f1 和 p 决定；转差率 s 反映转子转速与同步转速的差异。' },
  { id: 'state', label: '三种运行状态', level: 'primary', x: 725, y: 330, desc: '根据转差率 s 判断电动机状态、发电机状态和电磁制动状态。' },
  { id: 'rated', label: '铭牌额定值', level: 'primary', x: 430, y: 405, desc: '额定值包括 PN、UN、IN、fN、nN，额定功率公式使用线电压和线电流。' },
  { id: 'definition', label: '异步电机定义', level: 'secondary', x: 48, y: 22, desc: '异步电机是一种交流电机，也称感应电机，主要用作电动机。' },
  { id: 'phase', label: '单相 / 三相', level: 'secondary', x: 70, y: 164, desc: '按相数可分为单相异步机和三相异步机。' },
  { id: 'rotor-type', label: '笼型 / 绕线型', level: 'secondary', x: 258, y: 164, desc: '按转子结构可分为笼型异步机和绕线型异步机。' },
  { id: 'stator', label: '定子', level: 'secondary', x: 248, y: 22, desc: '定子铁芯提供主磁路，定子绕组接电后产生电流。' },
  { id: 'rotor', label: '转子', level: 'secondary', x: 382, y: 82, desc: '转子通过电磁感应获得电动势和电流，并产生转矩。' },
  { id: 'gap', label: '气隙', level: 'secondary', x: 382, y: 152, desc: '气隙位于定子和转子之间，是电机主磁路的一部分。' },
  { id: 'field', label: '旋转磁场', level: 'secondary', x: 590, y: 20, desc: '三相对称电流在气隙中建立基波旋转磁场。' },
  { id: 'induction', label: '感应电动势和电流', level: 'secondary', x: 796, y: 20, desc: '旋转磁场切割转子导体，使转子产生感应电动势和感应电流。' },
  { id: 'torque', label: '电磁转矩', level: 'secondary', x: 862, y: 150, desc: '转子感应电流与旋转磁场相互作用，在转子上产生电磁转矩。' },
  { id: 'n1-formula', label: 'n1 = 60f1 / p', level: 'secondary', x: 22, y: 260, desc: '同步转速由定子电流频率 f1 和极对数 p 决定。' },
  { id: 's-formula', label: 's = (n1 - n) / n1', level: 'secondary', x: 248, y: 260, desc: '转差率表示转子转速与同步转速的相对差异。' },
  { id: 'motor-state', label: '电动机状态', level: 'secondary', x: 585, y: 260, desc: '0 < s < 1，电磁转矩为驱动转矩，电能转化为机械能。' },
  { id: 'generator-state', label: '发电机状态', level: 'secondary', x: 794, y: 260, desc: 's < 0，转速高于同步转速，机械能可以转化为电能。' },
  { id: 'brake-state', label: '电磁制动状态', level: 'secondary', x: 846, y: 405, desc: 's > 1，转子反向转动，电磁转矩为制动转矩。' },
  { id: 'pn-formula', label: 'PN = √3UNINηNcosφN', level: 'secondary', x: 310, y: 500, desc: '额定功率公式中的 UN 和 IN 按线电压、线电流计算。' }
]

const links: LinkLine[] = [
  { from: 'center', to: 'type-structure' },
  { from: 'center', to: 'principle' },
  { from: 'center', to: 'slip' },
  { from: 'center', to: 'state' },
  { from: 'center', to: 'rated' },
  { from: 'type-structure', to: 'definition' },
  { from: 'type-structure', to: 'phase' },
  { from: 'type-structure', to: 'rotor-type' },
  { from: 'type-structure', to: 'stator' },
  { from: 'type-structure', to: 'rotor' },
  { from: 'type-structure', to: 'gap' },
  { from: 'principle', to: 'field' },
  { from: 'principle', to: 'induction' },
  { from: 'principle', to: 'torque' },
  { from: 'slip', to: 'n1-formula' },
  { from: 'slip', to: 's-formula' },
  { from: 'state', to: 'motor-state' },
  { from: 'state', to: 'generator-state' },
  { from: 'state', to: 'brake-state' },
  { from: 'rated', to: 'pn-formula' }
]

const branchGroups: BranchGroup[] = [
  { title: '基本类型和结构', items: ['定义：交流电机，也称感应电机', '类型：单相 / 三相，笼型 / 绕线型', '结构：定子、转子、气隙'], desc: '先把对象和结构搭起来，再学习电磁过程。' },
  { title: '基本工作原理', items: ['三相对称电流', '气隙旋转磁场', '感应电动势 / 电流', '电磁转矩'], desc: '抓住电源、磁场、感应、转矩的因果链。' },
  { title: '同步转速与转差率', items: ['n1 = 60f1 / p', 's = (n1 - n) / n1'], desc: 'n1 由频率和极对数决定，s 用来衡量异步程度。' },
  { title: '三种运行状态', items: ['电动机状态', '发电机状态', '电磁制动状态'], desc: '根据 s 的范围判断运行状态。' },
  { title: '额定值', items: ['PN、UN、IN、fN、nN', 'PN = √3UNINηNcosφN'], desc: '铭牌额定值用于描述额定工况下的电压、电流、功率、频率和转速。' }
]

const nodes = ref<KnowledgeNode[]>(defaultNodes.map((node) => ({ ...node })))
const selectedNode = computed(() => nodes.value.find((node) => node.id === selectedId.value) || nodes.value[0])

function getNode(id: string) {
  return nodes.value.find((node) => node.id === id)
}

function nodeCenter(node: KnowledgeNode) {
  const width = node.level === 'center' ? 176 : node.level === 'primary' ? 152 : 132
  const height = node.level === 'center' ? 58 : 46
  return {
    x: node.x + width / 2,
    y: node.y + height / 2
  }
}

function resetLayout() {
  nodes.value = defaultNodes.map((node) => ({ ...node }))
  selectedId.value = 'center'
}

function selectNode(id: string) {
  selectedId.value = id
}

function selectBranch(group: BranchGroup) {
  const match = nodes.value.find((node) => node.label === group.title)
  selectedId.value = match?.id || 'center'
}

// Pointer Events 同时支持鼠标和触控。拖拽时只更新当前节点坐标，SVG 连线会自动根据坐标重新计算。
function startDrag(event: PointerEvent, node: KnowledgeNode) {
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  draggingId.value = node.id
  selectedId.value = node.id
  dragOffset.value = {
    x: event.offsetX,
    y: event.offsetY
  }
}

function onDrag(event: PointerEvent) {
  if (!draggingId.value) return

  const canvas = event.currentTarget as HTMLElement
  const rect = canvas.getBoundingClientRect()
  const node = getNode(draggingId.value)
  if (!node) return

  const width = node.level === 'center' ? 176 : node.level === 'primary' ? 152 : 132
  const height = node.level === 'center' ? 58 : 46
  const scaleX = 980 / rect.width
  const scaleY = 580 / rect.height
  const nextX = (event.clientX - rect.left) * scaleX - dragOffset.value.x
  const nextY = (event.clientY - rect.top) * scaleY - dragOffset.value.y

  node.x = Math.min(980 - width - 8, Math.max(8, nextX))
  node.y = Math.min(580 - height - 8, Math.max(8, nextY))
}

function stopDrag() {
  draggingId.value = null
}
</script>

<template>
  <n-card class="knowledge-map-card teaching-card" embedded>
    <div class="knowledge-map-header">
      <div>
        <div class="map-kicker">学习路径</div>
        <h2>本节知识地图</h2>
        <p>先从整体结构理解 5.1，再进入公式、运行状态和额定值。</p>
      </div>
      <div class="map-actions">
        <n-button-group>
          <n-button :type="mapMode === 'nodes' ? 'primary' : 'default'" @click="mapMode = 'nodes'">节点图</n-button>
          <n-button :type="mapMode === 'brace' ? 'primary' : 'default'" @click="mapMode = 'brace'">大括号图</n-button>
        </n-button-group>
        <n-button secondary @click="resetLayout">重置布局</n-button>
      </div>
    </div>

    <div v-if="mapMode === 'nodes'" class="knowledge-node-wrap">
      <div class="knowledge-node-canvas" @pointermove="onDrag" @pointerup="stopDrag" @pointerleave="stopDrag">
        <svg class="knowledge-lines" viewBox="0 0 980 580" preserveAspectRatio="none">
          <line
            v-for="link in links"
            :key="`${link.from}-${link.to}`"
            :x1="nodeCenter(getNode(link.from)!).x"
            :y1="nodeCenter(getNode(link.from)!).y"
            :x2="nodeCenter(getNode(link.to)!).x"
            :y2="nodeCenter(getNode(link.to)!).y"
          />
        </svg>

        <button
          v-for="node in nodes"
          :key="node.id"
          class="knowledge-node"
          :class="[`knowledge-node--${node.level}`, { active: selectedId === node.id }]"
          :style="{ left: `${node.x}px`, top: `${node.y}px` }"
          type="button"
          @click="selectNode(node.id)"
          @pointerdown="startDrag($event, node)"
        >
          {{ node.label }}
        </button>
      </div>
    </div>

    <div v-else class="brace-map">
      <div class="brace-root">
        <span>5.1</span>
        <strong>异步电机概述</strong>
      </div>
      <div class="brace-symbol">&#123;</div>
      <div class="brace-groups">
        <button
          v-for="group in branchGroups"
          :key="group.title"
          class="brace-group"
          type="button"
          @click="selectBranch(group)"
        >
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </button>
      </div>
    </div>

    <n-alert class="knowledge-map-info" type="info" :title="selectedNode.label" bordered>
      {{ selectedNode.desc }}
    </n-alert>
  </n-card>
</template>

<style scoped>
.knowledge-map-card {
  margin: 24px 0 34px;
}

.knowledge-map-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.map-kicker {
  margin-bottom: 6px;
  color: var(--vp-c-brand-1);
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.knowledge-map-header h2 {
  margin: 0;
  border: none;
  padding: 0;
  font-size: 1.45rem;
}

.knowledge-map-header p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.map-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.knowledge-node-wrap {
  overflow-x: auto;
  padding-bottom: 8px;
}

.knowledge-node-canvas {
  position: relative;
  min-width: 980px;
  height: 580px;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background:
    radial-gradient(circle at 50% 36%, rgba(59, 130, 246, 0.14), transparent 28%),
    linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08));
  touch-action: none;
}

.knowledge-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.knowledge-lines line {
  stroke: rgba(37, 99, 235, 0.28);
  stroke-width: 2;
  stroke-dasharray: 6 6;
}

.knowledge-node {
  position: absolute;
  display: grid;
  place-items: center;
  min-height: 46px;
  padding: 8px 14px;
  border: 1px solid rgba(148, 163, 184, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--vp-c-text-1);
  cursor: grab;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
  user-select: none;
}

.knowledge-node:hover,
.knowledge-node.active {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.62);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.knowledge-node--center {
  width: 176px;
  min-height: 58px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #0f766e);
  color: white;
  font-size: 1rem;
}

.knowledge-node--primary {
  width: 152px;
  background: rgba(37, 99, 235, 0.1);
}

.knowledge-node--secondary {
  width: 132px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
}

.brace-map {
  display: grid;
  grid-template-columns: minmax(150px, 0.75fr) 54px minmax(360px, 2fr);
  gap: 14px;
  align-items: stretch;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.26);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08));
}

.brace-root {
  display: grid;
  place-content: center;
  padding: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.86);
  text-align: center;
}

.brace-root span {
  color: var(--vp-c-brand-1);
  font-weight: 800;
}

.brace-root strong {
  margin-top: 8px;
  font-size: 1.16rem;
}

.brace-symbol {
  display: grid;
  place-items: center;
  color: rgba(37, 99, 235, 0.55);
  font-family: Georgia, serif;
  font-size: 12rem;
  line-height: 1;
}

.brace-groups {
  display: grid;
  gap: 12px;
}

.brace-group {
  padding: 16px 18px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--vp-c-text-1);
  cursor: pointer;
  text-align: left;
  transition: transform 0.16s ease, border-color 0.16s ease;
}

.brace-group:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.55);
}

.brace-group h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.brace-group ul {
  display: grid;
  gap: 5px;
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
}

.knowledge-map-info {
  margin-top: 16px;
  border-radius: 14px;
}

@media (max-width: 760px) {
  .knowledge-map-header {
    flex-direction: column;
  }

  .map-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .knowledge-node-canvas {
    min-width: 820px;
    height: 520px;
  }

  .brace-map {
    grid-template-columns: 1fr;
  }

  .brace-symbol {
    display: none;
  }
}
</style>
