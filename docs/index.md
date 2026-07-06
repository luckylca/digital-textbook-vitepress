<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式和结论。' },
  { icon: '📝', title: '例题讲解', desc: '为典型题展示题目、思路、步骤和答案。' },
  { icon: '✅', title: '即时练习', desc: '通过选择题组件提供即时反馈和解析。' },
  { icon: '🎬', title: '交互演示', desc: '用同步转速与转差率演示帮助理解运行状态。' },
  { icon: '🎮', title: '闯关练习', desc: '通过判断运行状态小游戏巩固转差率应用。' }
]
</script>

<div class="textbook-hero">
  <h1>数字化教材样章 Demo</h1>
  <p>这是一个使用 VitePress + Naive UI 构建的数字化教材网页原型。当前样章主题为“5.1 异步电机概述”，包含知识点讲解、例题、即时练习、交互演示和闯关小游戏。</p>
  <div class="home-actions">
    <n-button type="primary" size="large" tag="a" :href="withBase('/chapter-5/section-5-1')">
      进入 5.1 异步电机概述
    </n-button>
    <n-button size="large" tag="a" href="#功能展示">
      查看功能展示
    </n-button>
  </div>
</div>

## 功能展示

<div class="feature-grid">
  <n-card v-for="item in features" :key="item.title" class="feature-card" embedded>
    <div class="feature-icon">{{ item.icon }}</div>
    <h3>{{ item.title }}</h3>
    <p>{{ item.desc }}</p>
  </n-card>
</div>

<ImportantCard title="当前阶段说明" type="success">
第二阶段已将 5.1 异步电机概述整理为数字化教材页面，并加入同步转速与转差率交互演示、运行状态判断小游戏和即时练习。
</ImportantCard>

## 组件预览

<KnowledgeCard title="知识点卡片示例" type="concept">
教材页面会用卡片突出概念、公式、易错点和小结，帮助学生从普通文字阅读转向结构化学习。
</KnowledgeCard>

<AnimationDemo />

<MiniGame />
