<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🗺️', title: '知识地图', desc: '支持可拖拽节点图和大括号结构图，节点、连线和分组均支持数据驱动。' },
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式、易错点和小结。' },
  { icon: '🧩', title: '结构图例', desc: '用可点击图例展示部件说明，组件可复用于其他电机结构。' },
  { icon: '🎬', title: '流程动画', desc: '流程步骤由数据传入，可快速扩展到新的章节流程。' },
  { icon: '📈', title: '转差率演示', desc: '支持默认参数配置，继续展示同步转速、转差率和运行状态。' },
  { icon: '✅', title: '即时练习', desc: '题目数据独立维护，支持后续扩展到 5.2、5.3 等章节。' }
]
</script>

<div class="textbook-hero">
  <div class="chapter-kicker">VitePress · Naive UI · 数据驱动教学组件</div>
  <h1>数字化教材样章 Demo</h1>
  <p>当前样章主题为“5.1 异步电机概述”。知识地图、流程动画、即时练习等模块已经抽象成可复用组件，后续可以通过新增章节数据文件快速扩展到 5.2、5.3 等章节。</p>
  <div class="hero-badges">
    <span class="hero-badge">知识地图</span>
    <span class="hero-badge">结构图例</span>
    <span class="hero-badge">流程动画</span>
    <span class="hero-badge">即时练习</span>
  </div>
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
第五阶段已增强知识地图动效，并把知识地图、流程动画、结构图例、状态图例和即时练习改造成 props + 数据文件驱动的可复用组件。
</ImportantCard>

## 组件预览

<KnowledgeCard title="可复用组件能力" type="concept">
教材页面会把具体内容放入 data 文件，组件只负责展示和交互。新增章节时，可以复用同一套 KnowledgeMap、WorkingPrincipleFlow 和 PracticePanel。
</KnowledgeCard>
