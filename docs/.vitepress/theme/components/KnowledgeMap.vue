<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { section51BraceGroups, section51KnowledgeLinks, section51KnowledgeNodes } from '../data/section51'
import type { BraceGroup, KnowledgeLink, KnowledgeMapMode, KnowledgeNode } from '../types/teaching'

interface SimNode extends KnowledgeNode {
  vx: number
  vy: number
  targetX?: number
  targetY?: number
}

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  nodes?: KnowledgeNode[]
  links?: KnowledgeLink[]
  braceGroups?: BraceGroup[]
  defaultMode?: KnowledgeMapMode
}>(), {
  title: '本节知识地图',
  subtitle: '拖拽节点，先建立整体框架，再进入公式和运行状态。'
})

const width = 980
const height = 600
const mapMode = ref<KnowledgeMapMode>(props.defaultMode ?? 'node')
const selectedId = ref('center')
const hoveredId = ref<string | null>(null)
const draggingId = ref<string | null>(null)
const dragOffset = ref({ x: 0, y: 0 })
const frameId = ref<number | null>(null)
const mounted = ref(false)
const isMobile = ref(false)
const modeTouched = ref(false)

const resolvedNodes = computed(() => props.nodes?.length ? props.nodes : section51KnowledgeNodes)
const resolvedLinks = computed(() => props.links?.length ? props.links : section51KnowledgeLinks)
const resolvedBraceGroups = computed(() => props.braceGroups?.length ? props.braceGroups : section51BraceGroups)
const nodes = ref<SimNode[]>(cloneNodes(resolvedNodes.value))

watch(resolvedNodes, (nextNodes) => {
  stopPhysics()
  nodes.value = cloneNodes(nextNodes)
  selectedId.value = nodes.value[0]?.id || 'center'
  startPhysics()
}, { deep: true })

watch(mapMode, (mode) => {
  if (mode === 'node') startPhysics()
  else stopPhysics()
})

function cloneNodes(source: KnowledgeNode[]): SimNode[] {
  return source.map((node) => ({ ...node, vx: 0, vy: 0, targetX: node.x, targetY: node.y }))
}

function updateIsMobile() {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth <= 768
  if (!props.defaultMode && !modeTouched.value) {
    mapMode.value = isMobile.value ? 'brace' : 'node'
  }
}

function setMode(mode: KnowledgeMapMode) {
  modeTouched.value = true
  mapMode.value = mode
}

function getNode(id: string) {
  return nodes.value.find((node) => node.id === id)
}

const selectedNode = computed(() => getNode(selectedId.value) || nodes.value[0])
const activeRootId = computed(() => selectedNode.value?.level === 'secondary' ? selectedNode.value.parentId : selectedId.value)

const activeNodeIds = computed(() => {
  const ids = new Set<string>()
  if (selectedId.value) ids.add(selectedId.value)
  if (hoveredId.value) ids.add(hoveredId.value)
  const rootId = activeRootId.value
  if (rootId) {
    ids.add(rootId)
    const rootNode = getNode(rootId)
    if (rootNode?.level === 'primary') ids.add('center')
    nodes.value.filter((node) => node.parentId === rootId).forEach((node) => ids.add(node.id))
  }
  return ids
})

function nodeSize(node: KnowledgeNode) {
  return {
    width: node.level === 'center' ? 184 : node.level === 'primary' ? 160 : 138,
    height: node.level === 'center' ? 62 : 48
  }
}

function nodeCenter(node: KnowledgeNode) {
  const size = nodeSize(node)
  return { x: node.x + size.width / 2, y: node.y + size.height / 2 }
}

function linePoint(id: string) {
  const node = getNode(id)
  return node ? nodeCenter(node) : { x: 0, y: 0 }
}

function curvePath(link: KnowledgeLink) {
  const from = linePoint(link.source)
  const to = linePoint(link.target)
  const dx = Math.abs(to.x - from.x)
  const curve = Math.max(48, dx * 0.42)
  const c1x = from.x + (to.x >= from.x ? curve : -curve)
  const c2x = to.x - (to.x >= from.x ? curve : -curve)
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`
}

function isLinkActive(link: KnowledgeLink) {
  return activeNodeIds.value.has(link.source) && activeNodeIds.value.has(link.target)
}

function clampNode(node: SimNode) {
  const size = nodeSize(node)
  node.x = Math.min(width - size.width - 8, Math.max(8, node.x))
  node.y = Math.min(height - size.height - 8, Math.max(8, node.y))
}

function targetLayout() {
  const targets: Record<string, { x: number; y: number }> = {}
  resolvedNodes.value.forEach((node) => {
    targets[node.id] = { x: node.x, y: node.y }
  })
  return targets
}

function resetLayout() {
  if (mapMode.value !== 'node') return
  stopPhysics()
  nodes.value = cloneNodes(resolvedNodes.value)
  selectedId.value = nodes.value[0]?.id || 'center'
}

function autoArrange() {
  if (mapMode.value !== 'node') return
  const targets = targetLayout()
  nodes.value.forEach((node) => {
    const target = targets[node.id]
    if (target) {
      node.targetX = target.x
      node.targetY = target.y
    }
  })
  startPhysics(true)
}

function selectNode(id: string) {
  selectedId.value = id
  const node = getNode(id)
  if (node) {
    node.vx += node.level === 'center' ? 0 : (node.x < width / 2 ? -0.5 : 0.5)
    node.vy += 0.25
  }
  startPhysics()
}

function selectBranch(group: BraceGroup) {
  selectedId.value = group.id || nodes.value.find((node) => node.label === group.title)?.id || 'center'
}

function nodeCanvasPoint(event: PointerEvent, canvas: HTMLElement) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) * (width / rect.width),
    y: (event.clientY - rect.top) * (height / rect.height)
  }
}

function startDrag(event: PointerEvent, node: SimNode) {
  const target = event.currentTarget as HTMLElement
  const canvas = target.parentElement as HTMLElement
  target.setPointerCapture(event.pointerId)
  const point = nodeCanvasPoint(event, canvas)
  draggingId.value = node.id
  selectedId.value = node.id
  node.targetX = undefined
  node.targetY = undefined
  node.vx = 0
  node.vy = 0
  dragOffset.value = { x: point.x - node.x, y: point.y - node.y }
  startPhysics(true)
}

function onDrag(event: PointerEvent) {
  if (!draggingId.value) return
  const canvas = event.currentTarget as HTMLElement
  const node = getNode(draggingId.value)
  if (!node) return
  const point = nodeCanvasPoint(event, canvas)
  node.x = point.x - dragOffset.value.x
  node.y = point.y - dragOffset.value.y
  node.vx = 0
  node.vy = 0
  clampNode(node)
}

function stopDrag() {
  draggingId.value = null
  startPhysics(true)
}

function linkRestLength(link: KnowledgeLink) {
  const source = getNode(link.source)
  const target = getNode(link.target)
  if (!source || !target) return 160
  if (source.level === 'center' || target.level === 'center') return 210
  if (source.level === 'primary' || target.level === 'primary') return 135
  return 120
}

function applyPhysics() {
  let maxSpeed = 0
  const force = new Map<string, { x: number; y: number }>()
  nodes.value.forEach((node) => force.set(node.id, { x: 0, y: 0 }))

  for (let i = 0; i < nodes.value.length; i += 1) {
    for (let j = i + 1; j < nodes.value.length; j += 1) {
      const a = nodes.value[i]
      const b = nodes.value[j]
      const ac = nodeCenter(a)
      const bc = nodeCenter(b)
      const dx = bc.x - ac.x
      const dy = bc.y - ac.y
      const distSq = Math.max(dx * dx + dy * dy, 80)
      const dist = Math.sqrt(distSq)
      const repel = Math.min(4.5, 8200 / distSq)
      const fx = (dx / dist) * repel
      const fy = (dy / dist) * repel
      force.get(a.id)!.x -= fx
      force.get(a.id)!.y -= fy
      force.get(b.id)!.x += fx
      force.get(b.id)!.y += fy
    }
  }

  resolvedLinks.value.forEach((link) => {
    const a = getNode(link.source)
    const b = getNode(link.target)
    if (!a || !b) return
    const ac = nodeCenter(a)
    const bc = nodeCenter(b)
    const dx = bc.x - ac.x
    const dy = bc.y - ac.y
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
    const stretch = dist - linkRestLength(link)
    const spring = stretch * 0.012
    const fx = (dx / dist) * spring
    const fy = (dy / dist) * spring
    force.get(a.id)!.x += fx
    force.get(a.id)!.y += fy
    force.get(b.id)!.x -= fx
    force.get(b.id)!.y -= fy
  })

  nodes.value.forEach((node) => {
    const f = force.get(node.id)!
    const size = nodeSize(node)
    const cx = node.x + size.width / 2
    const cy = node.y + size.height / 2
    const targetX = node.targetX ?? (node.level === 'center' ? 414 : undefined)
    const targetY = node.targetY ?? (node.level === 'center' ? 214 : undefined)

    if (targetX !== undefined && targetY !== undefined) {
      f.x += (targetX - node.x) * 0.028
      f.y += (targetY - node.y) * 0.028
    } else {
      f.x += (width / 2 - cx) * (node.level === 'center' ? 0.012 : 0.0015)
      f.y += (height / 2 - cy) * (node.level === 'center' ? 0.012 : 0.0015)
    }

    if (node.id === draggingId.value) return

    node.vx = (node.vx + f.x) * 0.86
    node.vy = (node.vy + f.y) * 0.86
    node.x += node.vx
    node.y += node.vy
    clampNode(node)

    const speed = Math.abs(node.vx) + Math.abs(node.vy)
    maxSpeed = Math.max(maxSpeed, speed)

    if (node.targetX !== undefined && node.targetY !== undefined) {
      const distance = Math.abs(node.targetX - node.x) + Math.abs(node.targetY - node.y)
      if (distance < 1.2 && speed < 0.08) {
        node.x = node.targetX
        node.y = node.targetY
        node.vx = 0
        node.vy = 0
        node.targetX = undefined
        node.targetY = undefined
      }
    }
  })

  return maxSpeed
}

function tick() {
  frameId.value = null
  if (!mounted.value || mapMode.value !== 'node') return
  const maxSpeed = applyPhysics()
  const hasTarget = nodes.value.some((node) => node.targetX !== undefined || node.targetY !== undefined)
  if (draggingId.value || hasTarget || maxSpeed > 0.05) {
    frameId.value = requestAnimationFrame(tick)
  }
}

function startPhysics(force = false) {
  if (!mounted.value || mapMode.value !== 'node') return
  if (frameId.value !== null && !force) return
  if (frameId.value !== null) cancelAnimationFrame(frameId.value)
  frameId.value = requestAnimationFrame(tick)
}

function stopPhysics() {
  if (frameId.value !== null) {
    cancelAnimationFrame(frameId.value)
    frameId.value = null
  }
}

onMounted(() => {
  mounted.value = true
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  startPhysics(true)
})

onBeforeUnmount(() => {
  mounted.value = false
  stopPhysics()
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsMobile)
  }
})
</script>

<template>
  <n-card class="knowledge-map-card teaching-card" embedded>
    <div class="knowledge-map-header">
      <div>
        <div class="map-kicker">学习路径</div>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
      <div class="map-actions">
        <n-button-group>
          <n-button :type="mapMode === 'node' ? 'primary' : 'default'" @click="setMode('node')">节点图</n-button>
          <n-button :type="mapMode === 'brace' ? 'primary' : 'default'" @click="setMode('brace')">大括号图</n-button>
        </n-button-group>
        <template v-if="mapMode === 'node'">
          <n-button secondary @click="autoArrange">自动整理</n-button>
          <n-button secondary @click="resetLayout">重置布局</n-button>
        </template>
      </div>
    </div>

    <Transition name="map-fade" mode="out-in">
      <div v-if="mapMode === 'node'" key="nodes" class="knowledge-node-wrap">
        <div class="knowledge-node-canvas" @pointermove="onDrag" @pointerup="stopDrag" @pointerleave="stopDrag" @dblclick="resetLayout">
          <svg class="knowledge-lines" viewBox="0 0 980 600" preserveAspectRatio="none">
            <path v-for="link in resolvedLinks" :key="`${link.source}-${link.target}`" :d="curvePath(link)" :class="{ active: isLinkActive(link) }" />
          </svg>

          <button
            v-for="(node, index) in nodes"
            :key="node.id"
            class="knowledge-node"
            :class="[`knowledge-node--${node.level}`, { active: selectedId === node.id, related: activeNodeIds.has(node.id), dragging: draggingId === node.id }]"
            :style="{ left: `${node.x}px`, top: `${node.y}px`, animationDelay: `${Math.min(index * 36, 520)}ms` }"
            :title="node.description"
            type="button"
            @click="selectNode(node.id)"
            @mouseenter="hoveredId = node.id"
            @mouseleave="hoveredId = null"
            @pointerdown="startDrag($event, node)"
          >
            {{ node.label }}
          </button>
        </div>
      </div>

      <div v-else key="brace" class="brace-map">
        <div class="brace-root">
          <span>5.1</span>
          <strong>异步电机概述</strong>
          <small>从整体到细节</small>
        </div>
        <div class="brace-rail"><span /></div>
        <div class="brace-groups">
          <button v-for="group in resolvedBraceGroups" :key="group.title" class="brace-group" :class="{ active: selectedId === group.id }" type="button" @click="selectBranch(group)">
            <h3>{{ group.title }}</h3>
            <p v-if="group.description">{{ group.description }}</p>
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </button>
        </div>
      </div>
    </Transition>

    <n-alert v-if="selectedNode" class="knowledge-map-info" type="info" :title="selectedNode.label" bordered>
      {{ selectedNode.description }}
    </n-alert>
  </n-card>
</template>

<style scoped>
.knowledge-map-card { margin: 24px 0 34px; }
.knowledge-map-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
.map-kicker { margin-bottom: 6px; color: var(--vp-c-brand-1); font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; }
.knowledge-map-header h2 { margin: 0; border: none; padding: 0; font-size: 1.45rem; }
.knowledge-map-header p { margin: 8px 0 0; color: var(--vp-c-text-2); line-height: 1.7; }
.map-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
.map-fade-enter-active, .map-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.map-fade-enter-from, .map-fade-leave-to { opacity: 0; transform: translateY(8px); }
.knowledge-node-wrap { overflow-x: auto; overflow-y: hidden; padding-bottom: 8px; -webkit-overflow-scrolling: touch; }
.knowledge-node-canvas { position: relative; min-width: 980px; height: 600px; border-radius: 26px; border: 1px solid rgba(148, 163, 184, 0.28); background: radial-gradient(circle at 50% 38%, rgba(59, 130, 246, 0.15), transparent 28%), radial-gradient(circle at 20% 18%, rgba(16, 185, 129, 0.12), transparent 20%), linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08)); touch-action: none; overflow: hidden; }
.knowledge-node-canvas::after { content: ''; position: absolute; inset: 18px; border-radius: 22px; border: 1px dashed rgba(37, 99, 235, 0.12); pointer-events: none; }
.knowledge-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.knowledge-lines path { fill: none; stroke: rgba(37, 99, 235, 0.24); stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 8 8; opacity: 0.88; transition: stroke 0.18s ease, stroke-width 0.18s ease, opacity 0.18s ease; }
.knowledge-lines path.active { stroke: rgba(37, 99, 235, 0.78); stroke-width: 3.5; stroke-dasharray: none; opacity: 1; }
.knowledge-node { position: absolute; display: grid; place-items: center; min-height: 48px; padding: 8px 14px; border: 1px solid rgba(148, 163, 184, 0.34); border-radius: 999px; background: rgba(255, 255, 255, 0.92); color: var(--vp-c-text-1); cursor: grab; font-weight: 750; line-height: 1.25; text-align: center; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08); transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease; user-select: none; animation: node-pop 0.44s ease forwards; }
.knowledge-node:hover, .knowledge-node.active, .knowledge-node.related { transform: translateY(-2px); border-color: rgba(37, 99, 235, 0.62); box-shadow: 0 16px 34px rgba(15, 23, 42, 0.13); }
.knowledge-node.dragging { transform: translateY(-4px) scale(1.035); cursor: grabbing; z-index: 8; }
.knowledge-node--center { width: 184px; min-height: 62px; border: none; background: linear-gradient(135deg, #2563eb, #0f766e); color: white; font-size: 1rem; box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.10), 0 18px 38px rgba(37, 99, 235, 0.22); animation: center-pulse 2.8s ease-in-out infinite; }
.knowledge-node--primary { width: 160px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(16, 185, 129, 0.10)); border-color: rgba(37, 99, 235, 0.30); }
.knowledge-node--secondary { width: 138px; background: rgba(255, 255, 255, 0.9); color: var(--vp-c-text-2); font-size: 0.86rem; }
.brace-map { display: grid; grid-template-columns: minmax(150px, 0.7fr) 58px minmax(360px, 2fr); gap: 16px; align-items: stretch; padding: 20px; border-radius: 26px; border: 1px solid rgba(148, 163, 184, 0.26); background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08)); }
.brace-root { display: grid; place-content: center; padding: 22px; border-radius: 22px; background: rgba(255, 255, 255, 0.88); text-align: center; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06); }
.brace-root span { color: var(--vp-c-brand-1); font-weight: 900; }
.brace-root strong { margin-top: 8px; font-size: 1.18rem; }
.brace-root small { margin-top: 6px; color: var(--vp-c-text-2); }
.brace-rail { position: relative; display: grid; place-items: center; }
.brace-rail::before, .brace-rail::after, .brace-rail span { content: ''; position: absolute; width: 28px; border-color: rgba(37, 99, 235, 0.58); border-style: solid; }
.brace-rail::before { top: 9%; bottom: 50%; right: 4px; border-width: 3px 0 0 3px; border-radius: 28px 0 0 0; }
.brace-rail::after { top: 50%; bottom: 9%; right: 4px; border-width: 0 0 3px 3px; border-radius: 0 0 0 28px; }
.brace-rail span { top: 50%; right: 0; border-width: 3px 0 0 0; }
.brace-groups { display: grid; gap: 12px; }
.brace-group { padding: 16px 18px; border: 1px solid rgba(148, 163, 184, 0.28); border-radius: 18px; background: rgba(255, 255, 255, 0.9); color: var(--vp-c-text-1); cursor: pointer; text-align: left; transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease; }
.brace-group:hover, .brace-group.active { transform: translateY(-2px); border-color: rgba(37, 99, 235, 0.55); box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08); }
.brace-group h3 { margin: 0 0 6px; font-size: 1rem; }
.brace-group p { margin: 0 0 8px; color: var(--vp-c-text-2); line-height: 1.6; }
.brace-group ul { display: grid; gap: 5px; margin: 0; padding-left: 1.1rem; color: var(--vp-c-text-2); }
.knowledge-map-info { margin-top: 16px; border-radius: 14px; }
@keyframes node-pop { from { opacity: 0; transform: translateY(8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes center-pulse { 0%, 100% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.10), 0 18px 38px rgba(37, 99, 235, 0.22); } 50% { box-shadow: 0 0 0 14px rgba(37, 99, 235, 0.04), 0 20px 42px rgba(37, 99, 235, 0.26); } }
@media (max-width: 768px) {
  .knowledge-map-card { margin: 18px 0 28px; }
  .knowledge-map-header { flex-direction: column; gap: 12px; }
  .knowledge-map-header h2 { font-size: 1.24rem; }
  .knowledge-map-header p { font-size: 0.94rem; }
  .map-actions { width: 100%; justify-content: flex-start; }
  .map-actions :deep(.n-button-group) { flex-wrap: wrap; }
  .knowledge-node-wrap { margin: 0 -4px; overflow-x: auto; }
  .knowledge-node-canvas { min-width: 820px; height: 520px; border-radius: 20px; }
  .brace-map { grid-template-columns: 1fr; gap: 12px; padding: 14px; border-radius: 20px; }
  .brace-root { padding: 16px; border-radius: 18px; place-content: start; text-align: left; }
  .brace-root strong { font-size: 1.05rem; }
  .brace-rail { display: none; }
  .brace-groups { gap: 10px; }
  .brace-group { padding: 13px 14px; border-radius: 15px; }
  .brace-group h3 { font-size: 0.96rem; }
  .brace-group p,
  .brace-group ul { font-size: 0.9rem; }
}
</style>
