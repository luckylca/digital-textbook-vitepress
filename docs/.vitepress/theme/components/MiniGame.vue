<script setup lang="ts">
import { computed, ref } from 'vue'

const score = ref(0)
const target = 5

const finished = computed(() => score.value >= target)

function addScore() {
  if (!finished.value) score.value += 1
}

function reset() {
  score.value = 0
}
</script>

<template>
  <n-card class="teaching-card mini-game" embedded>
    <template #header>小游戏占位组件</template>

    <p>这是一个简单点击挑战，用于验证后续小游戏组件的交互结构。</p>

    <n-progress
      type="line"
      :percentage="Math.min(100, Math.round((score / target) * 100))"
      :indicator-placement="'inside'"
      processing
    />

    <p class="mini-game__score">当前分数：{{ score }} / {{ target }}</p>

    <n-space>
      <n-button type="primary" :disabled="finished" @click="addScore">
        加 1 分
      </n-button>
      <n-button @click="reset">重新开始</n-button>
    </n-space>

    <n-alert v-if="finished" class="mini-game__result" type="success" title="挑战完成" bordered>
      你已经完成本轮占位小游戏。
    </n-alert>
  </n-card>
</template>

<style scoped>
.mini-game {
  margin: 18px 0;
}

.mini-game__score {
  font-weight: 600;
}

.mini-game__result {
  margin-top: 16px;
  border-radius: 14px;
}
</style>
