import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import naive from 'naive-ui'
import 'katex/dist/katex.min.css'
import './style.css'

import KnowledgeCard from './components/KnowledgeCard.vue'
import ImportantCard from './components/ImportantCard.vue'
import ExampleBlock from './components/ExampleBlock.vue'
import ChoiceQuiz from './components/ChoiceQuiz.vue'
import StepExplain from './components/StepExplain.vue'
import AnimationDemo from './components/AnimationDemo.vue'
import MiniGame from './components/MiniGame.vue'
import SlipSpeedDemo from './components/SlipSpeedDemo.vue'
import PracticePanel from './components/PracticePanel.vue'
import MotorStructureDiagram from './components/MotorStructureDiagram.vue'
import WorkingPrincipleFlow from './components/WorkingPrincipleFlow.vue'
import MotorStateMap from './components/MotorStateMap.vue'
import KnowledgeMap from './components/KnowledgeMap.vue'

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
    app.component('SlipSpeedDemo', SlipSpeedDemo)
    app.component('PracticePanel', PracticePanel)
    app.component('MotorStructureDiagram', MotorStructureDiagram)
    app.component('WorkingPrincipleFlow', WorkingPrincipleFlow)
    app.component('MotorStateMap', MotorStateMap)
    app.component('KnowledgeMap', KnowledgeMap)
  }
}

export default theme
