# 数字化教材样章 Demo

这是一个基于 **VitePress + Vue 3 + TypeScript + Naive UI** 构建的数字化教材网页原型项目。

当前阶段只完成工程骨架、首页、章节占位、教学组件骨架和 GitHub Pages 自动部署配置。正式教材内容会在后续根据 `5.1.pdf` 的真实内容分批补充。

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
luckylca.github.io/digital-textbook-vitepress/
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
      └─ components/
         ├─ KnowledgeCard.vue
         ├─ ImportantCard.vue
         ├─ ExampleBlock.vue
         ├─ ChoiceQuiz.vue
         ├─ StepExplain.vue
         ├─ AnimationDemo.vue
         └─ MiniGame.vue
```

## 后续开发计划

1. 根据 `5.1.pdf` 提取真实教材结构。
2. 将原始内容整理为适合网页阅读的 Markdown 页面。
3. 为核心知识点补充知识卡片、重点提醒和学习总结。
4. 为典型题目补充例题组件和分步骤讲解。
5. 为练习题补充即时反馈题目。
6. 根据具体知识点增强动画演示和小游戏组件。
7. 优化移动端阅读体验与页面视觉层次。

## 当前阶段说明

`5.1.pdf` 不在本仓库中，因此本阶段不会编写或推测 PDF 正文内容。章节页只保留结构占位，等待后续根据真实文件内容继续补充。
