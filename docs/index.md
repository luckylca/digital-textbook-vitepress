<script setup lang="ts">
import { withBase } from 'vitepress'

const features = [
  { icon: '🧠', title: '知识点讲解', desc: '用卡片化结构承载概念、公式和结论。' },
  { icon: '📝', title: '例题讲解', desc: '为典型题预留题目、思路、步骤和答案区域。' },
  { icon: '✅', title: '即时练习', desc: '通过选择题组件提供即时反馈和解析。' },
  { icon: '🎬', title: '交互演示', desc: '预留动画演示组件，后续绑定具体知识点。' },
  { icon: '📌', title: '学习总结', desc: '为每节内容沉淀重点和易错提醒。' }
]
</script>

<div class="textbook-hero">
  <h1>数字化教材样章 Demo</h1>
  <p>这是一个使用 VitePress + Naive UI 构建的数字化教材网页原型，当前重点是先完成工程骨架、页面结构和可复用教学组件。</p>
  <div class="home-actions">
    <n-button type="primary" size="large" tag="a" :href="withBase('/chapter-5/section-5-1')">
      进入 5.1 样章
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

<ImportantCard title="当前阶段说明" type="info">
当前第一阶段仅完成工程骨架、首页、章节占位、组件骨架和部署配置。正式教材内容将在后续根据 5.1.pdf 的实际内容分批补充。
</ImportantCard>

## 组件预览

<KnowledgeCard title="知识点卡片示例" type="concept">
这里展示的是组件骨架效果，不代表 5.1.pdf 的正式教材内容。
</KnowledgeCard>

<AnimationDemo />

<MiniGame />
