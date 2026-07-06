import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '数字化教材样章 Demo',
  description: '基于 VitePress 和 Naive UI 的数字化教材网页原型',
  base: '/digital-textbook-vitepress/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '📘',
    nav: [
      { text: '首页', link: '/' },
      { text: '5.1 样章', link: '/chapter-5/section-5-1' }
    ],
    sidebar: [
      {
        text: '第五章',
        items: [
          { text: '5.1 数字化教材样章', link: '/chapter-5/section-5-1' }
        ]
      }
    ],
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一节',
      next: '下一节'
    }
  }
})
