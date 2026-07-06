<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  question: string
  options: string[]
  answer: string
  explanation: string
}>()

const selected = ref<string>('')

const isCorrect = computed(() => selected.value === props.answer)

function choose(option: string) {
  selected.value = option
}

function buttonType(option: string) {
  if (!selected.value) return 'default'
  if (option === props.answer) return 'success'
  if (option === selected.value) return 'error'
  return 'default'
}
</script>

<template>
  <n-card class="teaching-card choice-quiz" embedded>
    <template #header>即时练习</template>

    <p class="choice-quiz__question">{{ question }}</p>

    <div class="quiz-option-list">
      <n-button
        v-for="option in options"
        :key="option"
        block
        secondary
        :type="buttonType(option)"
        @click="choose(option)"
      >
        {{ option }}
      </n-button>
    </div>

    <n-alert
      v-if="selected"
      class="choice-quiz__result"
      :type="isCorrect ? 'success' : 'error'"
      :title="isCorrect ? '选择正确' : '还需要再想一想'"
      bordered
    >
      <p>你的选择：{{ selected }}</p>
      <p>{{ explanation }}</p>
    </n-alert>
  </n-card>
</template>

<style scoped>
.choice-quiz {
  margin: 18px 0;
}

.choice-quiz__question {
  margin: 0;
  font-weight: 600;
}

.choice-quiz__result {
  margin-top: 16px;
  border-radius: 14px;
}

.choice-quiz__result p {
  margin: 4px 0;
}
</style>
