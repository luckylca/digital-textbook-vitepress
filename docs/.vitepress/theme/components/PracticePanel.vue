<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { section51PracticeQuestions } from '../data/section51'
import type { PracticeQuestion, PracticeQuestionType } from '../types/teaching'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  questions?: PracticeQuestion[]
}>(), {
  title: '即时练习',
  subtitle: '每题作答后会立即显示反馈，练习结果只用于自我检查。'
})

const resolvedQuestions = computed(() => props.questions?.length ? props.questions : section51PracticeQuestions)
const currentIndex = ref(0)
const selectedAnswers = ref<Record<string, string>>({})
const analysisVisible = ref<Record<string, boolean>>({})

const typeLabelMap: Record<PracticeQuestionType, string> = {
  concept: '基础概念',
  formula: '公式理解',
  state: '状态判断',
  calculation: '简单计算',
  judge: '易错辨析'
}

watch(resolvedQuestions, () => restart(), { deep: true })

const current = computed(() => resolvedQuestions.value[currentIndex.value] || resolvedQuestions.value[0])
const currentId = computed(() => String(current.value?.id ?? ''))
const currentSelected = computed(() => selectedAnswers.value[currentId.value] || '')
const currentAnswered = computed(() => Boolean(currentSelected.value))
const showAnalysis = computed(() => Boolean(analysisVisible.value[currentId.value]))
const completedCount = computed(() => Object.keys(selectedAnswers.value).length)
const correctCount = computed(() => resolvedQuestions.value.filter((item) => selectedAnswers.value[String(item.id)] === item.answer).length)
const progress = computed(() => Math.round((completedCount.value / Math.max(resolvedQuestions.value.length, 1)) * 100))
const currentTypeLabel = computed(() => typeLabelMap[current.value?.type || 'concept'])

function extraValue(key: string) {
  const value = current.value?.extra?.[key]
  return value === undefined || value === null ? '' : String(value)
}

function choose(option: string) {
  selectedAnswers.value = {
    ...selectedAnswers.value,
    [currentId.value]: option
  }
  analysisVisible.value = {
    ...analysisVisible.value,
    [currentId.value]: true
  }
}

function toggleAnalysis() {
  analysisVisible.value = {
    ...analysisVisible.value,
    [currentId.value]: !analysisVisible.value[currentId.value]
  }
}

function goPrev() {
  if (currentIndex.value > 0) currentIndex.value -= 1
}

function goNext() {
  if (currentIndex.value < resolvedQuestions.value.length - 1) currentIndex.value += 1
}

function restart() {
  currentIndex.value = 0
  selectedAnswers.value = {}
  analysisVisible.value = {}
}

function optionType(option: string) {
  if (!currentAnswered.value) return 'default'
  if (option === current.value.answer) return 'success'
  if (option === currentSelected.value) return 'error'
  return 'default'
}
</script>

<template>
  <n-card class="practice-panel teaching-card" embedded>
    <template #header>
      <div class="practice-panel__header">
        <span>{{ title }}</span>
        <n-tag round>{{ currentTypeLabel }}</n-tag>
      </div>
    </template>

    <p class="practice-panel__subtitle">{{ subtitle }}</p>

    <div class="practice-panel__summary">
      <div>
        <strong>第 {{ currentIndex + 1 }} 题 / 共 {{ resolvedQuestions.length }} 题</strong>
        <p>已完成 {{ completedCount }} 题，答对 {{ correctCount }} 题。</p>
      </div>
      <n-progress type="circle" :percentage="progress" :width="74" />
    </div>

    <div v-if="current.extra" class="practice-panel__extra">
      <span v-if="extraValue('f1')">f1 = {{ extraValue('f1') }} Hz</span>
      <span v-if="extraValue('p')">p = {{ extraValue('p') }}</span>
      <span v-if="extraValue('n1')">n1 = {{ extraValue('n1') }} r/min</span>
      <span v-if="extraValue('n')">n = {{ extraValue('n') }} r/min</span>
    </div>

    <h3 class="practice-panel__question">{{ current.question }}</h3>

    <div class="practice-panel__options">
      <n-button
        v-for="option in current.options"
        :key="option"
        block
        secondary
        :type="optionType(option)"
        @click="choose(option)"
      >
        {{ option }}
      </n-button>
    </div>

    <n-alert
      v-if="currentAnswered"
      class="practice-panel__feedback"
      :type="currentSelected === current.answer ? 'success' : 'error'"
      :title="currentSelected === current.answer ? '回答正确' : '回答有误'"
      bordered
    >
      <p>你的选择：{{ currentSelected }}</p>
      <p>正确答案：{{ current.answer }}</p>
    </n-alert>

    <n-card v-if="showAnalysis" class="practice-panel__analysis" embedded>
      <template #header>解析</template>
      <p>{{ current.explanation }}</p>
    </n-card>

    <div class="practice-panel__actions">
      <n-button :disabled="currentIndex === 0" @click="goPrev">上一题</n-button>
      <n-button :disabled="!currentAnswered" @click="toggleAnalysis">查看解析</n-button>
      <n-button type="primary" :disabled="currentIndex === resolvedQuestions.length - 1" @click="goNext">下一题</n-button>
      <n-button tertiary @click="restart">重新练习</n-button>
    </div>
  </n-card>
</template>

<style scoped>
.practice-panel {
  margin: 24px 0;
}

.practice-panel__header,
.practice-panel__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.practice-panel__subtitle {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.practice-panel__summary {
  padding: 18px;
  border-radius: 18px;
  background: rgba(59, 130, 246, 0.08);
}

.practice-panel__summary p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.practice-panel__extra {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0 4px;
}

.practice-panel__extra span {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.14);
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}

.practice-panel__question {
  margin: 18px 0 14px;
  line-height: 1.55;
}

.practice-panel__options {
  display: grid;
  gap: 10px;
}

.practice-panel__feedback,
.practice-panel__analysis {
  margin-top: 16px;
  border-radius: 14px;
}

.practice-panel__feedback p,
.practice-panel__analysis p {
  margin: 4px 0;
  line-height: 1.8;
}

.practice-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

@media (max-width: 640px) {
  .practice-panel__summary {
    align-items: flex-start;
    flex-direction: column;
  }

  .practice-panel__actions :deep(.n-button) {
    flex: 1 1 42%;
  }
}
</style>
