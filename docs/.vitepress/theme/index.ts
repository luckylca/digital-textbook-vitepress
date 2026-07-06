import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import naive from 'naive-ui'
import './style.css'

import KnowledgeCard from './components/KnowledgeCard.vue'
import ImportantCard from './components/ImportantCard.vue'
import ExampleBlock from './components/ExampleBlock.vue'
import ChoiceQuiz from './components/ChoiceQuiz.vue'
import StepExplain from './components/StepExplain.vue'
import AnimationDemo from './components/AnimationDemo.vue'
import MiniGame from './components/MiniGame.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive)

    app.component('KnowledgeCard', KnowledgeCard)
    app.component('ImportantCard', ImportantCard)
    app.component('ExampleBlock', ExampleBlock)
    app.component('ChoiceQuiz', ChoiceQuiz)
    app.component('StepExplain', StepExplain)
    app.component('AnimationDemo', AnimationDemo)
    app.component('MiniGame', MiniGame)
  }
}

export default theme
