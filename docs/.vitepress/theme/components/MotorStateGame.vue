<script setup lang="ts">
import { computed, ref } from 'vue'

type MotorState = '电动机状态' | '发电机状态' | '电磁制动状态'

interface Question {
  n1: number
  n: number
  answer: MotorState
}

const questions: Question[] = [
  { n1: 1500, n: 1440, answer: '电动机状态' },
  { n1: 1500, n: 1550, answer: '发电机状态' },
  { n1: 1500, n: -200, answer: '电磁制动状态' },
  { n1: 1000, n: 960, answer: '电动机状态' },
  { n1: 3000, n: 3200, answer: '发电机状态' }
]

const options: MotorState[] = ['电动机状态', '发电机状态', '电磁制动状态']

const currentIndex = ref(0)
const selected = ref<MotorState | ''>('')
const score = ref(0)
const answered = ref(false)

const current = computed(() => questions[currentIndex.value])
const finished = computed(() => currentIndex.value >= questions.length)
const progress = computed(() => Math.round((currentIndex.value / questions.length) * 100))
const currentSlip = computed(() => {
  if (finished.value) return 0
  return (current.value.n1 - current.value.n) / current.value.n1
})

const slipText = computed(() => `${currentSlip.value.toFixed(3)}，约 ${(currentSlip.value * 100).toFixed(1)}%`)
const isCorrect = computed(() => selected.value === current.value?.answer)

function choose(option: MotorState) {
  if (answered.value || finished.value) return

  selected.value = option
  answered.value = true

  if (option === current.value.answer) {
    score.value += 1
  }
}

function nextQuestion() {
  if (!answered.value) return

  currentIndex.value += 1
  selected.value = ''
  answered.value = false
}

function restart() {
  currentIndex.value = 0
  selected.value = ''
  score.value = 0
  answered.value = false
}

function optionType(option: MotorState) {
  if (!answered.value) return 'default'
  if (option === current.value.answer) return 'success'
  if (option === selected.value) return 'error'
  return 'default'
}
</script>

<template>
  <n-card class="motor-state-game teaching-card" embedded>
    <template #header>闯关小游戏：判断异步电机运行状态</template>

    <template v-if="!finished">
      <p class="game-intro">先算 s = (n1 - n) / n1，再根据 s 的范围判断状态。</p>

      <n-progress type="line" :percentage="progress" :show-indicator="false" />

      <div class="game-question">
        <span>第 {{ currentIndex + 1 }} / {{ questions.length }} 关</span>
        <strong>同步转速 n1 = {{ current.n1 }} r/min，转子转速 n = {{ current.n }} r/min</strong>
      </div>

      <div class="game-options">
        <n-button
          v-for="option in options"
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
        v-if="answered"
        class="game-feedback"
        :type="isCorrect ? 'success' : 'error'"
        :title="isCorrect ? '判断正确' : '判断错误'"
        bordered
      >
        <p>转差率 s = {{ slipText }}</p>
        <p>正确答案：{{ current.answer }}</p>
        <p>判断方法：0 &lt; s &lt; 1 为电动机状态，s &lt; 0 为发电机状态，s &gt; 1 为电磁制动状态。</p>
      </n-alert>

      <n-space class="game-actions">
        <n-button type="primary" :disabled="!answered" @click="nextQuestion">
          下一关
        </n-button>
        <n-button @click="restart">重新开始</n-button>
      </n-space>
    </template>

    <template v-else>
      <n-result
        status="success"
        title="闯关完成"
        :description="`你的得分：${score} / ${questions.length}。能根据转差率判断运行状态，说明你已经抓住本节核心。`"
      >
        <template #footer>
          <n-button type="primary" @click="restart">再来一轮</n-button>
        </template>
      </n-result>
    </template>
  </n-card>
</template>

<style scoped>
.motor-state-game {
  margin: 22px 0;
}

.game-intro {
  margin-top: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.game-question {
  display: grid;
  gap: 8px;
  margin: 18px 0;
  padding: 18px;
  border-radius: 16px;
  background: rgba(59, 130, 246, 0.08);
}

.game-question span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.game-question strong {
  font-size: 1.05rem;
}

.game-options {
  display: grid;
  gap: 10px;
}

.game-feedback {
  margin-top: 16px;
  border-radius: 14px;
}

.game-feedback p {
  margin: 4px 0;
}

.game-actions {
  margin-top: 16px;
}
</style>
