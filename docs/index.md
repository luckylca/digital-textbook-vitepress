<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式、易错点和小结。' },
  { icon: '🧩', title: '结构图例', desc: '用可点击图例展示定子、转子、气隙、转轴和机座。' },
  { icon: '🎬', title: '工作原理动画', desc: '按步骤高亮“电源、磁场、感应、转矩、旋转”的因果链。' },
  { icon: '📈', title: '转差率演示', desc: '通过调节 f1、p 和 n 理解同步转速与运行状态。' },
  { icon: '✅', title: '即时练习', desc: '用上一题 / 下一题形式集中完成概念、公式和状态判断练习。' },
  { icon: '📝', title: '例题讲解', desc: '为典型题展示题目、思路、步骤、答案和易错提醒。' }
]
</script>

<div class="textbook-hero">
  <h1>数字化教材样章 Demo</h1>
  <p>这是一个使用 VitePress + Naive UI 构建的数字化教材网页原型。当前样章主题为“5.1 异步电机概述”，包含知识点讲解、结构图例、工作原理动画、同步转速与转差率演示、即时练习和例题讲解。</p>
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
第三阶段已将练习区统一为正式的即时练习，并补充异步电机结构图例、工作原理流程动画和运行状态图例。
</ImportantCard>

## 组件预览

<KnowledgeCard title="数字化教材呈现方式" type="concept">
教材页面会用卡片、图例、流程动画、参数演示和集中练习区组织内容，帮助学生从普通文字阅读转向结构化学习。
</KnowledgeCard>
