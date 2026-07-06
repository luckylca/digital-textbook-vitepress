<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🗺️', title: '知识地图', desc: '支持可拖拽节点图和大括号结构图，帮助学生先建立整体框架。' },
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式、易错点和小结。' },
  { icon: '🧩', title: '结构图例', desc: '用可点击图例展示定子、转子、气隙、转轴和机座。' },
  { icon: '🎬', title: '工作原理动画', desc: '按步骤高亮“电源、磁场、感应、转矩、旋转”的因果链。' },
  { icon: '📈', title: '转差率演示', desc: '通过调节 f1、p 和 n 理解同步转速与运行状态。' },
  { icon: '✅', title: '即时练习', desc: '用上一题 / 下一题形式集中完成概念、公式和状态判断练习。' }
]
</script>

<div class="textbook-hero">
  <div class="chapter-kicker">VitePress · Naive UI · 数字化教材原型</div>
  <h1>数字化教材样章 Demo</h1>
  <p>当前样章主题为“5.1 异步电机概述”。页面新增知识地图，支持节点图和大括号图两种学习结构，并保留结构图例、工作原理动画、同步转速与转差率演示、即时练习和例题讲解。</p>
  <div class="hero-badges">
    <span class="hero-badge">知识地图</span>
    <span class="hero-badge">结构图例</span>
    <span class="hero-badge">工作原理动画</span>
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
第四阶段已优化标题视觉，并在章节开头加入支持“节点图 / 大括号图”切换的知识地图。
</ImportantCard>

## 组件预览

<KnowledgeCard title="数字化教材呈现方式" type="concept">
教材页面会用章节 Hero、知识地图、图例、流程动画、参数演示和集中练习区组织内容，帮助学生从普通文字阅读转向结构化学习。
</KnowledgeCard>
