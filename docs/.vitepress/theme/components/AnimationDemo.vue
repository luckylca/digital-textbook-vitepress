<script setup lang="ts">
import { ref } from 'vue'

const moved = ref(false)
</script>

<template>
  <n-card class="teaching-card animation-demo" embedded>
    <template #header>互动演示占位组件</template>
    <p>这个组件用于验证动画交互能力，后续可以替换为具体知识点演示。</p>
    <div class="animation-stage">
      <div class="animation-dot" :class="{ 'is-moved': moved }" />
    </div>
    <n-button type="primary" @click="moved = !moved">
      {{ moved ? '复位演示' : '开始演示' }}
    </n-button>
  </n-card>
</template>

<style scoped>
.animation-demo {
  margin: 18px 0;
}
</style>
