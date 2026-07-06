# 数字化教材样章 Demo

这是一个基于 **VitePress + Vue 3 + TypeScript + Naive UI** 构建的数字化教材网页原型项目。

当前样章为 **5.1 异步电机概述**，已经包含章节正文、知识地图、结构图例、工作原理动画、同步转速与转差率演示、例题讲解和即时练习。第五阶段开始，核心教学组件已改造为 **props + 数据文件驱动** 的可复用组件，便于继续扩展 5.2、5.3 等章节。

## 技术栈

- VitePress：文档站与静态站点生成
- Vue 3：交互式教学组件
- TypeScript：类型约束与组件可维护性
- Naive UI：按钮、卡片、提示、进度条等 UI 组件
- Markdown：教材正文编写
- GitHub Pages：静态站点部署
- pnpm：包管理器

## 本地运行方式

请先安装 Node.js 18+ 和 pnpm。

```bash
pnpm install
pnpm docs:dev
```

启动后根据终端输出访问本地地址。由于项目配置了 Pages 子路径，本地访问路径通常带有：

```text
/digital-textbook-vitepress/
```

## 构建方式

```bash
pnpm docs:build
```

构建产物会输出到：

```text
docs/.vitepress/dist
```

VitePress 项目源码里通常不会手写 `index.html`。`index.html` 会在构建时由 VitePress 根据 Markdown 页面自动生成。

## 本地预览

```bash
pnpm docs:preview
```

## GitHub Pages 部署说明

本项目已添加 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

当代码 push 到 `main` 分支时，会自动执行：

```bash
pnpm docs:build
```

并将 `docs/.vitepress/dist` 发布到 GitHub Pages。

首次部署前，可能还需要进入仓库设置：

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

部署成功后，普通项目仓库的访问路径通常是：

```text
https://luckylca.github.io/digital-textbook-vitepress/
```

## 项目目录说明

```text
docs/
├─ index.md
├─ chapter-5/
│  └─ section-5-1.md
└─ .vitepress/
   ├─ config.ts
   └─ theme/
      ├─ index.ts
      ├─ style.css
      ├─ components/
      │  ├─ KnowledgeMap.vue
      │  ├─ PracticePanel.vue
      │  ├─ WorkingPrincipleFlow.vue
      │  ├─ MotorStructureDiagram.vue
      │  ├─ MotorStateMap.vue
      │  ├─ SlipSpeedDemo.vue
      │  ├─ KnowledgeCard.vue
      │  ├─ ImportantCard.vue
      │  └─ ExampleBlock.vue
      ├─ data/
      │  └─ section51.ts
      └─ types/
         └─ teaching.ts
```

## 如何复用教学组件

核心原则是：**组件负责展示和交互，具体教材内容放在数据文件里**。

目前已经支持数据驱动的组件包括：

- `KnowledgeMap`：知识地图，支持节点图和大括号图。
- `PracticePanel`：即时练习，支持传入题目数组。
- `WorkingPrincipleFlow`：流程动画，支持传入步骤数组。
- `MotorStructureDiagram`：结构图例，支持传入部件说明。
- `MotorStateMap`：运行状态图例，支持传入状态区间。
- `SlipSpeedDemo`：转差率演示，支持配置标题和默认参数。

5.1 的交互数据集中在：

```text
docs/.vitepress/theme/data/section51.ts
```

通用类型集中在：

```text
docs/.vitepress/theme/types/teaching.ts
```

## 如何新增一个章节数据文件

以 5.2 为例，可以新增：

```text
docs/.vitepress/theme/data/section52.ts
```

然后按需要导出：

```ts
export const section52KnowledgeNodes = []
export const section52KnowledgeLinks = []
export const section52BraceGroups = []
export const section52PracticeQuestions = []
export const section52FlowSteps = []
```

在新章节 Markdown 中导入：

```ts
import {
  section52KnowledgeNodes,
  section52KnowledgeLinks,
  section52BraceGroups,
  section52PracticeQuestions,
  section52FlowSteps
} from '../.vitepress/theme/data/section52'
```

然后传给组件：

```vue
<KnowledgeMap
  :nodes="section52KnowledgeNodes"
  :links="section52KnowledgeLinks"
  :brace-groups="section52BraceGroups"
/>

<WorkingPrincipleFlow :steps="section52FlowSteps" />

<PracticePanel :questions="section52PracticeQuestions" />
```

不传 props 时，这些组件仍然会使用 5.1 的默认数据，保证旧写法可用。

## 当前阶段说明

`5.1.pdf` 不在本仓库中，因此本项目不会编写或推测 PDF 之外的正文。当前 5.1 内容来自已整理好的教材内容包，并已改造成适合网页学习的数字化教材样章。

## 后续开发计划

1. 继续补充 5.2、5.3 的数据文件和页面。
2. 将更多教材通用结构抽象为可复用组件。
3. 增强移动端知识地图的浏览体验。
4. 增加更多例题和题型，但保持正式教材练习风格。
5. 优化页面视觉细节和无障碍访问体验。
