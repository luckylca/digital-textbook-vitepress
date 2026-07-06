import type {
  BraceGroup,
  FlowStep,
  KnowledgeLink,
  KnowledgeNode,
  MotorPart,
  PracticeQuestion,
  StateRegion
} from '../types/teaching'

export const section51KnowledgeNodes: KnowledgeNode[] = [
  { id: 'center', label: '5.1 异步电机概述', level: 'center', x: 414, y: 214, description: '本节从结构、工作原理、转差率、运行状态和额定值理解异步电机。' },
  { id: 'type-structure', label: '基本类型和结构', level: 'primary', x: 158, y: 74, parentId: 'center', description: '先认识异步电机是什么，再掌握单相/三相、笼型/绕线型、定子/转子/气隙。' },
  { id: 'principle', label: '基本工作原理', level: 'primary', x: 668, y: 74, parentId: 'center', description: '定子三相电流产生旋转磁场，转子感应出电流，并与磁场作用产生电磁转矩。' },
  { id: 'slip', label: '同步转速与转差率', level: 'primary', x: 124, y: 330, parentId: 'center', description: '同步转速由 f1 和 p 决定；转差率 s 反映转子转速与同步转速的差异。' },
  { id: 'state', label: '三种运行状态', level: 'primary', x: 704, y: 330, parentId: 'center', description: '根据转差率 s 判断电动机状态、发电机状态和电磁制动状态。' },
  { id: 'rated', label: '铭牌额定值', level: 'primary', x: 414, y: 424, parentId: 'center', description: '额定值包括 PN、UN、IN、fN、nN，额定功率公式使用线电压和线电流。' },
  { id: 'definition', label: '异步电机定义', level: 'secondary', x: 42, y: 26, parentId: 'type-structure', description: '异步电机是一种交流电机，也称感应电机，主要用作电动机。' },
  { id: 'phase', label: '单相 / 三相', level: 'secondary', x: 52, y: 168, parentId: 'type-structure', description: '按相数可分为单相异步机和三相异步机。' },
  { id: 'rotor-type', label: '笼型 / 绕线型', level: 'secondary', x: 260, y: 168, parentId: 'type-structure', description: '按转子结构可分为笼型异步机和绕线型异步机。' },
  { id: 'stator', label: '定子', level: 'secondary', x: 268, y: 24, parentId: 'type-structure', description: '定子铁芯提供主磁路，定子绕组接电后产生电流。' },
  { id: 'rotor', label: '转子', level: 'secondary', x: 360, y: 96, parentId: 'type-structure', description: '转子通过电磁感应获得电动势和电流，并产生转矩。' },
  { id: 'gap', label: '气隙', level: 'secondary', x: 360, y: 164, parentId: 'type-structure', description: '气隙位于定子和转子之间，是电机主磁路的一部分。' },
  { id: 'field', label: '旋转磁场', level: 'secondary', x: 570, y: 26, parentId: 'principle', description: '三相对称电流在气隙中建立基波旋转磁场。' },
  { id: 'induction', label: '感应电动势和电流', level: 'secondary', x: 782, y: 26, parentId: 'principle', description: '旋转磁场切割转子导体，使转子产生感应电动势和感应电流。' },
  { id: 'torque', label: '电磁转矩', level: 'secondary', x: 822, y: 168, parentId: 'principle', description: '转子感应电流与旋转磁场相互作用，在转子上产生电磁转矩。' },
  { id: 'n1-formula', label: 'n1 = 60f1 / p', level: 'secondary', x: 28, y: 260, parentId: 'slip', description: '同步转速由定子电流频率 f1 和极对数 p 决定。' },
  { id: 's-formula', label: 's = (n1 - n) / n1', level: 'secondary', x: 258, y: 260, parentId: 'slip', description: '转差率表示转子转速与同步转速的相对差异。' },
  { id: 'motor-state', label: '电动机状态', level: 'secondary', x: 560, y: 260, parentId: 'state', description: '0 < s < 1，电磁转矩为驱动转矩，电能转化为机械能。' },
  { id: 'generator-state', label: '发电机状态', level: 'secondary', x: 782, y: 260, parentId: 'state', description: 's < 0，转速高于同步转速，机械能可以转化为电能。' },
  { id: 'brake-state', label: '电磁制动状态', level: 'secondary', x: 822, y: 426, parentId: 'state', description: 's > 1，转子反向转动，电磁转矩为制动转矩。' },
  { id: 'pn-formula', label: 'PN = √3UNINηNcosφN', level: 'secondary', x: 300, y: 514, parentId: 'rated', description: '额定功率公式中的 UN 和 IN 按线电压、线电流计算。' }
]

export const section51KnowledgeLinks: KnowledgeLink[] = [
  { source: 'center', target: 'type-structure' },
  { source: 'center', target: 'principle' },
  { source: 'center', target: 'slip' },
  { source: 'center', target: 'state' },
  { source: 'center', target: 'rated' },
  { source: 'type-structure', target: 'definition' },
  { source: 'type-structure', target: 'phase' },
  { source: 'type-structure', target: 'rotor-type' },
  { source: 'type-structure', target: 'stator' },
  { source: 'type-structure', target: 'rotor' },
  { source: 'type-structure', target: 'gap' },
  { source: 'principle', target: 'field' },
  { source: 'principle', target: 'induction' },
  { source: 'principle', target: 'torque' },
  { source: 'slip', target: 'n1-formula' },
  { source: 'slip', target: 's-formula' },
  { source: 'state', target: 'motor-state' },
  { source: 'state', target: 'generator-state' },
  { source: 'state', target: 'brake-state' },
  { source: 'rated', target: 'pn-formula' }
]

export const section51BraceGroups: BraceGroup[] = [
  { id: 'type-structure', title: '基本类型和结构', items: ['定义：交流电机，也称感应电机', '类型：单相 / 三相，笼型 / 绕线型', '结构：定子、转子、气隙'], description: '先把对象和结构搭起来，再学习电磁过程。' },
  { id: 'principle', title: '基本工作原理', items: ['三相对称电流', '气隙旋转磁场', '感应电动势 / 电流', '电磁转矩'], description: '抓住电源、磁场、感应、转矩的因果链。' },
  { id: 'slip', title: '同步转速与转差率', items: ['n1 = 60f1 / p', 's = (n1 - n) / n1'], description: 'n1 由频率和极对数决定，s 用来衡量异步程度。' },
  { id: 'state', title: '三种运行状态', items: ['电动机状态', '发电机状态', '电磁制动状态'], description: '根据 s 的范围判断运行状态。' },
  { id: 'rated', title: '额定值', items: ['PN、UN、IN、fN、nN', 'PN = √3UNINηNcosφN'], description: '铭牌额定值用于描述额定工况下的电压、电流、功率、频率和转速。' }
]

export const section51PracticeQuestions: PracticeQuestion[] = [
  { id: 1, type: 'concept', question: '异步电机也常被称为什么电机？', options: ['A. 直流电机', 'B. 感应电机', 'C. 同步电机', 'D. 步进电机'], answer: 'B. 感应电机', explanation: '异步电机的转子电流不是由外部电源直接供给，而是由旋转磁场感应产生，所以也叫感应电机。' },
  { id: 2, type: 'formula', question: '同步转速公式 n1 = 60f1 / p 中，p 表示什么？', options: ['A. 极数', 'B. 极对数', 'C. 功率因数', 'D. 转差率'], answer: 'B. 极对数', explanation: 'p 是极对数，不是极数。4 极电机的极对数 p = 2。' },
  { id: 3, type: 'calculation', question: '一台异步电机接在 50Hz 电网上，极对数 p = 2，则同步转速 n1 是多少？', options: ['A. 750 r/min', 'B. 1000 r/min', 'C. 1500 r/min', 'D. 3000 r/min'], answer: 'C. 1500 r/min', explanation: 'n1 = 60f1 / p = 60 × 50 / 2 = 1500 r/min。', extra: { f1: 50, p: 2 } },
  { id: 4, type: 'state', question: '异步电机在电动机状态下，转差率 s 的范围是？', options: ['A. s < 0', 'B. 0 < s < 1', 'C. s = 0', 'D. s > 1'], answer: 'B. 0 < s < 1', explanation: '当 0 < n < n1 时，s = (n1 - n) / n1，因此 0 < s < 1，对应电动机状态。' },
  { id: 5, type: 'state', question: '当转子转速 n 大于同步转速 n1 时，异步电机处于什么状态？', options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 堵转状态'], answer: 'B. 发电机状态', explanation: '当 n > n1 时，s < 0，电磁转矩成为制动转矩，机械能可以转化为电能。' },
  { id: 6, type: 'state', question: '已知 n1 = 1500 r/min，n = 1440 r/min，该异步电机处于什么状态？', options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 同步运行状态'], answer: 'A. 电动机状态', explanation: 's = (1500 - 1440) / 1500 = 0.04。因为 0 < s < 1，所以是电动机状态。', extra: { n1: 1500, n: 1440 } },
  { id: 7, type: 'state', question: '已知 n1 = 1500 r/min，n = 1550 r/min，该异步电机处于什么状态？', options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 堵转状态'], answer: 'B. 发电机状态', explanation: 's = (1500 - 1550) / 1500 = -0.033。因为 s < 0，所以是发电机状态。', extra: { n1: 1500, n: 1550 } },
  { id: 8, type: 'state', question: '已知 n1 = 1500 r/min，n = -200 r/min，该异步电机处于什么状态？', options: ['A. 电动机状态', 'B. 发电机状态', 'C. 电磁制动状态', 'D. 空载状态'], answer: 'C. 电磁制动状态', explanation: 's = (1500 - (-200)) / 1500 = 1.133。因为 s > 1，所以是电磁制动状态。', extra: { n1: 1500, n: -200 } },
  { id: 9, type: 'formula', question: '额定功率公式 PN = √3 UN IN ηN cosφN 中，UN 和 IN 分别指什么？', options: ['A. 相电压和相电流', 'B. 线电压和线电流', 'C. 转子电压和转子电流', 'D. 励磁电压和励磁电流'], answer: 'B. 线电压和线电流', explanation: '三相异步电动机铭牌额定功率计算中，UN 和 IN 按线电压、线电流使用。' },
  { id: 10, type: 'judge', question: '关于异步电机气隙，下列说法正确的是？', options: ['A. 气隙越大，励磁电流越小', 'B. 气隙位于定子和转子之间', 'C. 气隙不属于主磁路', 'D. 中小型异步机气隙通常为几十厘米'], answer: 'B. 气隙位于定子和转子之间', explanation: '气隙位于定子和转子之间，是电机主磁路的一部分。中小型异步机气隙通常很小，一般为 0.2 ~ 1.5 mm。' }
]

export const section51FlowSteps: FlowStep[] = [
  { id: 'winding', title: '定子三相对称绕组', description: '定子中嵌放三相对称绕组，为形成旋转磁场准备空间和电路条件。' },
  { id: 'grid', title: '三相对称电网', description: '定子绕组接入三相对称电网，获得三相交流电源。' },
  { id: 'current', title: '三相对称电流', description: '三相绕组中流过三相对称电流。' },
  { id: 'field', title: '气隙旋转磁场', description: '三相对称电流在气隙中建立基波旋转磁场。' },
  { id: 'cut', title: '切割转子导体', description: '旋转磁场与转子导体存在相对运动，转子导体被磁场切割。' },
  { id: 'induction', title: '感应电动势和感应电流', description: '转子导体中产生感应电动势，并在闭合回路中形成感应电流。' },
  { id: 'torque', title: '电磁转矩', description: '转子感应电流与旋转磁场相互作用，在转子上产生电磁转矩。' },
  { id: 'rotate', title: '转子旋转', description: '电磁转矩推动转子旋转，实现电能向机械能的转换。' }
]

export const section51MotorParts: MotorPart[] = [
  { id: 'stator', name: '定子', description: '定子铁芯提供主磁路，定子绕组接入三相电源后产生电流和旋转磁场。' },
  { id: 'rotor', name: '转子', description: '转子铁芯和转子绕组随转轴旋转，转子绕组中产生感应电动势和感应电流。' },
  { id: 'gap', name: '气隙', description: '气隙位于定子和转子之间，是主磁路的一部分，也是定子和转子进行电磁耦合的空间。' },
  { id: 'shaft', name: '转轴', description: '转轴支撑转子，并承担输入或输出机械转矩的作用。' },
  { id: 'frame', name: '机座', description: '机座用于固定和支撑定子铁芯，使电机整体结构保持稳定。' }
]

export const section51StateRegions: StateRegion[] = [
  { id: 'generator', label: '发电机状态', rangeText: 's < 0', description: '转子转速高于同步转速，电磁转矩为制动转矩，机械能可以转化为电能。' },
  { id: 'sync', label: '同步点', rangeText: 's = 0', description: '转子与旋转磁场同步，切割磁感线能力很弱，不能产生稳定感应转矩。' },
  { id: 'motor', label: '电动机状态', rangeText: '0 < s < 1', description: '转子转速低于同步转速，电磁转矩为驱动转矩，是最常见的电动机运行状态。' },
  { id: 'locked', label: '堵转点', rangeText: 's = 1，n = 0', description: '转子转速为零，常用于理解起动瞬间，但不是长期正常运行点。' },
  { id: 'brake', label: '电磁制动状态', rangeText: 's > 1', description: '转子反向转动，电磁转矩与转速反向，机械能和电网电能主要转化为内部损耗。' }
]
