<script setup lang="ts">
const demoSteps = [
  '后续先从真实教材内容中提取问题背景。',
  '再整理核心概念、公式或方法。',
  '最后补充例题、练习和交互演示。'
]

const quizOptions = ['搭建工程骨架', '编写正式 PDF 正文', '删除章节结构', '跳过部署配置']
</script>

# 5.1 数字化教材样章

## 学习目标

<KnowledgeCard title="学习目标占位" type="summary">
本部分将在后续根据 5.1.pdf 的实际内容补充。
</KnowledgeCard>

## 问题引入

本部分将在后续根据 5.1.pdf 的实际内容补充。

<ImportantCard title="内容来源提醒" type="info">
当前页面不编写、不推测 5.1.pdf 的正文，只保留后续填充位置。
</ImportantCard>

## 核心知识点

<KnowledgeCard title="核心知识点占位" type="concept">
本部分将在后续根据 5.1.pdf 的实际内容补充。
</KnowledgeCard>

## 例题讲解

<ExampleBlock title="例题占位">
本部分将在后续根据 5.1.pdf 的实际内容补充。这里先验证例题组件可以在 Markdown 页面中直接使用。
</ExampleBlock>

## 互动演示

本部分将在后续根据 5.1.pdf 的实际内容补充。下面组件仅用于验证动画交互能力。

<AnimationDemo />

## 即时练习

本部分将在后续根据 5.1.pdf 的实际内容补充。下面练习仅用于验证选择题组件交互能力。

<ChoiceQuiz
  question="当前第一阶段的主要目标是什么？"
  :options="quizOptions"
  answer="搭建工程骨架"
  explanation="本阶段重点是项目结构、组件骨架和部署配置，不填入正式教材正文。"
/>

## 本节小结

<StepExplain title="后续填充流程" :steps="demoSteps" />

<MiniGame />
