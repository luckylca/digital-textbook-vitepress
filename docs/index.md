<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🗺️', title: '知识地图', desc: '桌面端支持带阻尼牵引感的节点图和大括号结构图，手机端自动隐藏复杂地图。' },
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式、易错点和小结。' },
  { icon: '🧩', title: '结构图例', desc: '用可点击图例展示部件说明，组件可复用于其他电机结构。' },
  { icon: '🧲', title: '工作原理交互演示', desc: '点击关键环节，高亮定子、旋转磁场、转子导体和电磁转矩。' },
  { icon: '📈', title: '同步转速与转差率演示', desc: '参数变化会直接改变磁场、转子相对运动和感应强弱。' },
  { icon: '✅', title: '即时练习', desc: '题目数据独立维护，支持后续扩展到 5.2、5.3 等章节。' }
]
</script>

<div class="textbook-hero">
  <div class="chapter-kicker">VitePress · Naive UI · 数据驱动教学组件</div>
  <h1>数字化教材样章 Demo</h1>
  <p>当前样章主题为“5.1 异步电机概述”。知识地图、工作原理交互演示、转差率演示和即时练习等模块已经抽象成可复用组件。所有交互都服务于理解，不做无意义动画。</p>
  <div class="hero-badges">
    <span class="hero-badge">知识地图</span>
    <span class="hero-badge">结构图例</span>
    <span class="hero-badge">工作原理演示</span>
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
第六阶段已修复公式渲染，增强知识地图物理感，重做转差率演示，并把原先生硬的播放式流程改为工作原理交互演示。
</ImportantCard>

## 组件预览

<KnowledgeCard title="可复用组件能力" type="concept">
教材页面会把具体内容放入 data 文件，组件只负责展示和交互。新增章节时，可以复用 KnowledgeMap、WorkingPrincipleFlow 和 PracticePanel 等组件。
</KnowledgeCard>
