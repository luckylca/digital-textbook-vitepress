<script setup lang="ts">
import { computed, ref } from 'vue'

type PracticeType = 'concept' | 'formula' | 'state' | 'calculation' | 'judge'

interface PracticeQuestion {
  id: number
  type: PracticeType
  question: string
  options: string[]
  answer: string
  explanation: string
  extra?: {
    n1?: number
    n?: number
    f1?: number
    p?: number
  }
}

const questions: PracticeQuestion[] = [
  {
    id: 1,
    type: 'concept',
    question: '异步电机也常被称为什么电机？',
    options: ['A. 直流电机', 'B. 感应电机', 'C. 同步电机', 'D. 步进电机'],
    answer: 'B. 感应电机',
    explanation: '异步电机的转子电流不是由外部电源直接供给，而是由旋转磁场感应产生，所以也叫感应电机。'
  },
  {
    id: 2,
    type: 'formula',
    question: '同步转速公式 n1 = 60f1 / p 中，p 表示什么？',
    options: ['A. 极数', 'B. 极对数', 'C. 功率因数', 'D. 转差率'],
    answer: 'B. 极对数',
    explanation: 'p 是极对数，不是极数。4 极电机的极对数 p = 2。'
  },
  {
    id: 3,
    type: 'calculation',
    question: '一台异步电机接在 50Hz 电网上，极对数 p = 2，则同步转速 n1 是多少？',
    options: ['A. 750 r/min', 'B. 1000 r/min', 'C. 1500 r/min', 'D. 3000 r/min'],
    answer: 'C. 1500 r/min',
    explanation: 'n1 = 60f1 / p = 60 × 50 / 2 = 1500 r/min。',
    extra: { f1: 50, p: 2 }
  },
  {
    id: 4,
    type: 'state',
    question: '异步电机在电动机状态下，转差率 s 的范围是？',
    options: ['A. s < 0', 'B. 0 < s < 1', 'C. s = 0', 'D. s > 1'],
    answer: 'B. 0 < s < 1',
    explanation: '当 0 < n < n1 时，s = (n1 - n) / n1，因此 0 < s < 1，对应电动机状态。'
  },
  {
    id: 5,
    type: 'state',
    question: '当转子转速 n 大于同步转速 n1 时，异步电机处于什么状态？',
    options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 堵转状态'],
    answer: 'B. 发电机状态',
    explanation: '当 n > n1 时，s < 0，电磁转矩成为制动转矩，机械能可以转化为电能。'
  },
  {
    id: 6,
    type: 'state',
    question: '已知 n1 = 1500 r/min，n = 1440 r/min，该异步电机处于什么状态？',
    options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 同步运行状态'],
    answer: 'A. 电动机状态',
    explanation: 's = (1500 - 1440) / 1500 = 0.04。因为 0 < s < 1，所以是电动机状态。',
    extra: { n1: 1500, n: 1440 }
  },
  {
    id: 7,
    type: 'state',
    question: '已知 n1 = 1500 r/min，n = 1550 r/min，该异步电机处于什么状态？',
    options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 堵转状态'],
    answer: 'B. 发电机状态',
    explanation: 's = (1500 - 1550) / 1500 = -0.033。因为 s < 0，所以是发电机状态。',
    extra: { n1: 1500, n: 1550 }
  },
  {
    id: 8,
    type: 'state',
    question: '已知 n1 = 1500 r/min，n = -200 r/min，该异步电机处于什么状态？',
    options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 空载状态'],
    answer: 'C. 电磁制动状态',
    explanation: 's = (1500 - (-200)) / 1500 = 1.133。因为 s > 1，所以是电磁制动状态。',
    extra: { n1: 1500, n: -200 }
  },
  {
    id: 9,
    type: 'formula',
    question: '额定功率公式 PN = √3 UN IN ηN cosφN 中，UN 和 IN 分别指什么？',
    options: ['A. 相电压和相电流', 'B. 线电压和线电流', 'C. 转子电压和转子电流', 'D. 励磁电压和励磁电流'],
    answer: 'B. 线电压和线电流',
    explanation: '三相异步电动机铭牌额定功率计算中，UN 和 IN 按线电压、线电流使用。'
  },
  {
    id: 10,
    type: 'judge',
    question: '关于异步电机气隙，下列说法正确的是？',
    options: ['A. 气隙越大，励磁电流越小', 'B. 气隙位于定子和转子之间', 'C. 气隙不属于主磁路', 'D. 中小型异步机气隙通常为几十厘米'],
    answer: 'B. 气隙位于定子和转子之间',
    explanation: '气隙位于定子和转子之间，是电机主磁路的一部分。中小型异步机气隙通常很小，一般为 0.2 ~ 1.5 mm。'
  }
]

const currentIndex = ref(0)
const selectedAnswers = ref<Record<number, string>>({})
const analysisVisible = ref<Record<number, boolean>>({})

const typeLabelMap: Record<PracticeType, string> = {
  concept: '基础概念',
  formula: '公式理解',
  state: '状态判断',
  calculation: '简单计算',
  judge: '易错辨析'
}

const current = computed(() => questions[currentIndex.value])
const currentSelected = computed(() => selectedAnswers.value[current.value.id] || '')
const currentAnswered = computed(() => Boolean(currentSelected.value))
const showAnalysis = computed(() => Boolean(analysisVisible.value[current.value.id]))
const completedCount = computed(() => Object.keys(selectedAnswers.value).length)
const correctCount = computed(() => questions.filter((item) => selectedAnswers.value[item.id] === item.answer).length)
const progress = computed(() => Math.round((completedCount.value / questions.length) * 100))

function choose(option: string) {
  selectedAnswers.value = {
    ...selectedAnswers.value,
    [current.value.id]: option
  }
  analysisVisible.value = {
    ...analysisVisible.value,
    [current.value.id]: true
  }
}

function toggleAnalysis() {
  analysisVisible.value = {
    ...analysisVisible.value,
    [current.value.id]: !analysisVisible.value[current.value.id]
  }
}

function goPrev() {
  if (currentIndex.value > 0) currentIndex.value -= 1
}

function goNext() {
  if (currentIndex.value < questions.length - 1) currentIndex.value += 1
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
        <span>即时练习</span>
        <n-tag round>{{ typeLabelMap[current.type] }}</n-tag>
      </div>
    </template>

    <div class="practice-panel__summary">
      <div>
        <strong>第 {{ currentIndex + 1 }} 题 / 共 {{ questions.length }} 题</strong>
        <p>已完成 {{ completedCount }} 题，答对 {{ correctCount }} 题。练习结果只用于自我检查。</p>
      </div>
      <n-progress type="circle" :percentage="progress" :width="74" />
    </div>

    <div v-if="current.extra" class="practice-panel__extra">
      <span v-if="current.extra.f1">f1 = {{ current.extra.f1 }} Hz</span>
      <span v-if="current.extra.p">p = {{ current.extra.p }}</span>
      <span v-if="current.extra.n1">n1 = {{ current.extra.n1 }} r/min</span>
      <span v-if="current.extra.n !== undefined">n = {{ current.extra.n }} r/min</span>
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
      <n-button type="primary" :disabled="currentIndex === questions.length - 1" @click="goNext">下一题</n-button>
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
