export type KnowledgeNodeLevel = 'center' | 'primary' | 'secondary'
export type KnowledgeMapMode = 'node' | 'brace'

export interface KnowledgeNode {
  id: string
  label: string
  level: KnowledgeNodeLevel
  x: number
  y: number
  description?: string
  parentId?: string
}

export interface KnowledgeLink {
  source: string
  target: string
}

export interface BraceGroup {
  id?: string
  title: string
  items: string[]
  description?: string
}

export type PracticeQuestionType = 'concept' | 'formula' | 'state' | 'calculation' | 'judge'

export interface PracticeQuestion {
  id: number | string
  type?: PracticeQuestionType
  question: string
  options: string[]
  answer: string
  explanation: string
  extra?: Record<string, unknown>
}

export interface FlowStep {
  id: string
  title: string
  description: string
}

export interface MotorPart {
  id: string
  name: string
  description: string
}

export interface StateRegion {
  id: string
  label: string
  rangeText: string
  description: string
}
