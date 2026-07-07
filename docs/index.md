<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🗺️', title: '知识地图', desc: '桌面端支持带阻尼牵引感的节点图和大括号结构图，手机端自动隐藏复杂地图。' },
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式、易错点和本节小结。' },
  { icon: '🧩', title: '结构图例', desc: '用可点击图例展示定子、转子、气隙、转轴和机座。' },
  { icon: '🧲', title: '工作原理交互演示', desc: '点击关键环节，高亮定子、旋转磁场、转子导体和电磁转矩。' },
  { icon: '📈', title: '同步转速与转差率演示', desc: '参数变化会直接改变磁场、转子相对运动和感应强弱。' },
  { icon: '📝', title: '例题讲解', desc: '包含同步转速、转差率、运行状态和额定功率的完整计算过程。' },
  { icon: '✅', title: '即时练习', desc: '用上一题 / 下一题形式集中完成概念、公式和状态判断练习。' },
  { icon: '🚀', title: 'GitHub Pages 部署', desc: '通过 GitHub Actions 构建并发布 VitePress 静态站点。' }
]
</script>

<div class="textbook-hero">
  <div class="chapter-kicker">VitePress · Naive UI · 数据驱动教学组件</div>
  <h1>数字化教材样章 Demo</h1>
  <p>当前样章主题为“5.1 异步电机概述”。页面包含知识地图、结构图例、工作原理交互演示、同步转速与转差率演示、例题讲解和即时练习。所有交互都服务于理解，不做无意义动画。</p>
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

<ImportantCard title="展示说明" type="success">
本 Demo 已将知识地图、结构图例、工作原理交互演示、同步转速与转差率演示、例题讲解和即时练习整合为一个完整的数字化教材样章。
</ImportantCard>

## 组件预览

<KnowledgeCard title="可复用组件能力" type="concept">
教材页面会把具体内容放入 data 文件，组件只负责展示和交互。新增章节时，可以复用 KnowledgeMap、WorkingPrincipleFlow 和 PracticePanel 等组件。
</KnowledgeCard>
