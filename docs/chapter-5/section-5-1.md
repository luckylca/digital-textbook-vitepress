<script setup lang="ts">
import {
  section51BraceGroups,
  section51FlowSteps,
  section51KnowledgeLinks,
  section51KnowledgeNodes,
  section51MotorParts,
  section51PracticeQuestions,
  section51StateRegions
} from '../.vitepress/theme/data/section51'

const typeSteps = [
  '先看相数：单相异步机、三相异步机。',
  '再看转子结构：绕线型异步机、笼型异步机。',
  '学习结构时抓住定子、转子、气隙三个核心部分。'
]

const principleSteps = [
  '定子三相对称绕组接入三相对称电网。',
  '定子中流过三相对称电流。',
  '气隙中形成基波旋转磁场。',
  '旋转磁场切割转子导体。',
  '转子产生感应电动势和感应电流。',
  '感应电流与旋转磁场相互作用，产生电磁转矩。'
]
</script>

<div class="chapter-hero">
  <div class="chapter-number">5.1</div>
  <div>
    <div class="chapter-kicker">第五章 · 异步电机</div>
    <h1>5.1 异步电机概述</h1>
    <p>从结构、工作原理、同步转速与转差率、运行状态和铭牌额定值五条线索理解异步电机。</p>
    <div class="hero-badges">
      <span class="hero-badge">结构图例</span>
      <span class="hero-badge">工作原理动画</span>
      <span class="hero-badge">转差率演示</span>
      <span class="hero-badge">即时练习</span>
    </div>
  </div>
</div>

<div class="placeholder-note">
本节把异步电机的类型、结构、工作原理、转差率、运行状态和额定值串成一条学习主线：先知道它是什么，再知道它为什么会转，最后会用公式判断和计算。
</div>

<KnowledgeMap
  title="本节知识地图"
  subtitle="拖拽节点，先建立 5.1 的整体框架，再进入公式和运行状态。"
  :nodes="section51KnowledgeNodes"
  :links="section51KnowledgeLinks"
  :brace-groups="section51BraceGroups"
/>

## 学习目标

学完本节后，你应该能够：

<StepExplain
  title="本节学习路线"
  :steps="[
    '说清异步电机为什么也叫感应电机。',
    '区分异步电机的基本类型和主要结构。',
    '解释定子旋转磁场、转子感应电流和电磁转矩之间的关系。',
    '会计算同步转速 n1 和转差率 s。',
    '能根据转差率判断电动机、发电机和电磁制动三种状态。',
    '能理解铭牌额定值和额定功率公式的含义。'
  ]"
/>

## 问题引入：为什么叫“异步”？

很多初学者会把异步电机理解成“转得不稳定的电机”，这其实不准确。

<ImportantCard title="先抓住一句话" type="info">
“异步”指的是转子转速 n 不等于定子旋转磁场的同步转速 n1。
</ImportantCard>

如果转子真的和旋转磁场完全同步，转子导体就不能切割磁感线，也就不能产生感应电动势、感应电流和稳定电磁转矩。因此，异步电机正常作为电动机运行时，转子通常要比旋转磁场慢一点。

## 一、异步电机是什么？

<KnowledgeCard title="异步电机定义" type="concept">
异步电机是一种交流电机，也称感应电机，主要用作电动机。它的转子侧通常没有外加电源，转子电流来自定子旋转磁场的电磁感应。
</KnowledgeCard>

异步电机的功率范围很宽，可以从 kW 级到 10^3 kW 级。它常见的优点和不足如下：

| 方面 | 内容 |
| --- | --- |
| 优点 | 运行可靠、效率高、工作特性好 |
| 缺点 | 大范围平滑调速经济性差；需要从电网吸收无功 |

<ImportantCard title="理解“感应电机”这个名字" type="success">
定子侧接三相电源，转子侧没有直接外加电源；转子中的电动势和电流是被旋转磁场“感应”出来的，所以异步电机也叫感应电机。
</ImportantCard>

## 二、异步电机的基本类型

异步电机可以从两个角度分类：按相数分，按转子结构分。

<StepExplain title="分类思路" :steps="typeSteps" />

| 分类依据 | 类型 | 说明 |
| --- | --- | --- |
| 按相数 | 单相异步机、三相异步机 | 三相异步电动机是本章学习重点 |
| 按转子结构 | 绕线型异步机、笼型异步机 | 两者主要区别在转子绕组结构和起动、调速特性 |

<KnowledgeCard title="绕线型与笼型的直观区别" type="concept">
笼型异步机的转子绕组像一个“笼子”，结构简单、运行可靠；绕线型异步机的转子是三相对称绕组，便于改善起动和调速性能。
</KnowledgeCard>

## 三、异步电机的基本结构

三相异步电动机整体上会出现很多部件，例如定子、转子、端盖、轴承、机座、风扇、接线盒、冷却风扇、冷却气流、散热片和转轴。学习时不必一开始就背所有零件，先抓住三个核心：

<KnowledgeCard title="结构主线" type="summary">
定子负责建立旋转磁场，转子通过感应获得电流并产生转矩，气隙是定子和转子之间进行电磁耦合的关键空间。
</KnowledgeCard>

<MotorStructureDiagram :parts="section51MotorParts" />

### 1. 定子

定子主要包括定子铁芯、定子绕组和机座。

| 部分 | 作用 | 结构或位置 |
| --- | --- | --- |
| 定子铁芯 | 提供电机主磁路 | 用于嵌放定子绕组，由 0.5 mm 硅钢片叠装 |
| 定子绕组 | 提供电机电路 | 产生感应电动势、流过电流 |
| 机座 | 固定和支撑 | 固定和支撑定子铁芯 |

### 2. 转子

转子主要包括转子铁芯、转子绕组和转轴。

| 部分 | 作用 | 结构或位置 |
| --- | --- | --- |
| 转子铁芯 | 提供电机主磁路 | 用于嵌放转子绕组，由 0.5 mm 硅钢片叠装 |
| 转子绕组 | 提供电机电路 | 分为笼型绕组和绕线型绕组 |
| 转轴 | 支撑机械功率传递 | 支撑输入、输出机械转矩 |

#### 转子绕组类型对比

| 类型 | 结构 | 作用特点 |
| --- | --- | --- |
| 鼠笼型绕组 | 一槽放置一根导体 | 减小损耗、提高效率 |
| 绕线型绕组 | 三相对称绕组 | 便于改善起动、调速性能 |

### 3. 气隙

<KnowledgeCard title="气隙" type="concept">
气隙位于定子和转子之间，也是电机主磁路的一部分。中小型异步机气隙一般为 0.2 mm 到 1.5 mm。
</KnowledgeCard>

<ImportantCard title="易错点：气隙不是越大越好" type="warning">
减小气隙可以提高功率因数 cosφ，降低励磁电流。气隙过大时，励磁电流会增大，功率因数会变差。
</ImportantCard>

## 四、异步电机为什么会转？

异步电机的工作过程可以按“电源 → 磁场 → 感应 → 转矩”来理解。

<StepExplain title="基本工作原理" :steps="principleSteps" />

<WorkingPrincipleFlow :steps="section51FlowSteps" />

<KnowledgeCard title="核心因果链" type="summary">
定子三相电流产生气隙基波旋转磁场；旋转磁场切割转子导体，使转子产生感应电动势和感应电流；转子感应电流与旋转磁场相互作用，在转子上产生电磁转矩。
</KnowledgeCard>

<ImportantCard title="为什么必须有转速差？" type="warning">
如果转子转速 n 等于同步转速 n1，转子导体相对于旋转磁场不再切割磁感线，感应电动势和电磁转矩就难以稳定产生。因此，电动机状态下通常有 n 小于 n1。
</ImportantCard>

## 五、同步转速与转差率

### 1. 同步转速

同步转速就是定子旋转磁场的转速，公式为：

```text
n1 = 60 f1 / p
```

其中：

| 符号 | 含义 | 单位 |
| --- | --- | --- |
| n1 | 同步转速 | r/min |
| f1 | 定子电流频率 | Hz |
| p | 绕组极对数 | 无单位 |

<ImportantCard title="p 是极对数，不是极数" type="warning">
如果题目说电机是 4 极，那么极对数 p = 2。同步转速取决于定子电流频率 f1 和极对数 p。
</ImportantCard>

### 2. 转差与转差率

转差表示同步转速与转子实际转速之间的差值：

```text
Δn = n1 - n
```

只看转差不够直观，所以更常用转差率：

```text
s = (n1 - n) / n1
```

其中 n 是转子实际转速。转差率 s 可以用来判断异步电机处于哪一种运行状态。

## 六、三种运行状态

| 运行状态 | 条件 | 转矩性质 | 能量转换 |
| --- | --- | --- | --- |
| 电动机状态 | 0 &lt; n &lt; n1，0 &lt; s &lt; 1 | Tem 与 n 同向，为驱动转矩 | 电网电能 → 机械动能 |
| 发电机状态 | n &gt; n1，s &lt; 0 | Tem 与 n 反向，为制动转矩 | 机械动能 → 电网电能 |
| 电磁制动状态 | n &lt; 0，s &gt; 1 | Tem 与 n 反向，为制动转矩 | 机械动能 + 电网电能 → 内部损耗 |

<MotorStateMap :states="section51StateRegions" />

<ImportantCard title="判断运行状态的最稳方法" type="info">
不要只凭“转得快还是慢”判断。先算 s = (n1 - n) / n1，再看 s 的范围。
</ImportantCard>

## 七、铭牌额定值

异步电动机铭牌上常见的额定值包括：额定功率 PN、额定电压 UN、额定电流 IN、额定频率 fN 和额定转速 nN。

<KnowledgeCard title="额定功率公式" type="formula">
三相异步电动机额定输出功率可按下式理解：

```text
PN = √3 UN IN ηN cosφN
```

其中 PN 指额定工况下轴端输出机械功率；UN 是定子绕组线电压；IN 是定子绕组线电流；ηN 是额定运行效率；cosφN 是额定运行功率因数。
</KnowledgeCard>

<ImportantCard title="额定功率公式易错点" type="warning">
无论定子绕组是 Y 接还是 Δ 接，公式中的 UN 和 IN 都按线电压、线电流计算，不需要再换成相电压、相电流。转子绕组一般为 Y 型。我国电网额定频率是 50 Hz。
</ImportantCard>

额定转速 nN 是电机在额定电压、额定频率下输出额定功率时的转子转速，单位为 r/min。

## 例题讲解

<ExampleBlock title="例题 1：同步转速与转差率计算">

**题目**：一台三相异步电动机接在 50 Hz 电网上，绕组极对数 p = 2，额定运行时转子转速 n = 1440 r/min。求同步转速 n1 和转差率 s。

**第一步：计算同步转速**

```text
n1 = 60 f1 / p
n1 = 60 × 50 / 2 = 1500 r/min
```

**第二步：计算转差率**

```text
s = (n1 - n) / n1
s = (1500 - 1440) / 1500 = 0.04
```

**答案**：同步转速 n1 = 1500 r/min；转差率 s = 0.04，也就是 4%。

**易错提醒**：p 是极对数，不是极数。如果题目给的是 4 极电机，那么 p = 2。

</ExampleBlock>

<ExampleBlock title="例题 2：判断异步电机运行状态">

**题目**：某异步电机的同步转速 n1 = 1500 r/min。判断以下三种转速分别对应什么运行状态：

A. n = 1440 r/min  
B. n = 1550 r/min  
C. n = -200 r/min

**解题思路**：先根据 s = (n1 - n) / n1 计算转差率，再根据 s 的范围判断状态。

**A：**

```text
s = (1500 - 1440) / 1500 = 0.04
```

因为 0 &lt; s &lt; 1，所以 A 是电动机状态。

**B：**

```text
s = (1500 - 1550) / 1500 = -0.033
```

因为 s &lt; 0，所以 B 是发电机状态。

**C：**

```text
s = (1500 - (-200)) / 1500 = 1.133
```

因为 s &gt; 1，所以 C 是电磁制动状态。

**答案**：A：电动机状态；B：发电机状态；C：电磁制动状态。

**易错提醒**：不要只看转速大小，要结合同步转速 n1 和转差率 s 判断。

</ExampleBlock>

<ExampleBlock title="例题 3：额定功率计算">

**题目**：一台三相异步电动机额定线电压 UN = 380 V，额定线电流 IN = 5 A，额定效率 ηN = 0.82，额定功率因数 cosφN = 0.80。求额定输出功率 PN。

**公式**：

```text
PN = √3 UN IN ηN cosφN
```

**代入计算**：

```text
PN = √3 × 380 × 5 × 0.82 × 0.80
PN ≈ 2159 W ≈ 2.16 kW
```

**答案**：额定输出功率 PN 约为 2159 W，也就是 2.16 kW。

**易错提醒**：这里的 UN 和 IN 是线电压、线电流，不需要因为 Y 接或 Δ 接再换成相电压、相电流。

</ExampleBlock>

## 互动演示：同步转速与转差率

下面的演示可以直接拖动参数。观察重点不是动画是否完全符合物理仿真，而是理解三个关系：f1 越大，n1 越大；p 越大，n1 越小；n 和 n1 的关系决定运行状态。

<SlipSpeedDemo />

## 即时练习

本练习区把基础概念、公式理解、运行状态判断、简单计算和易错辨析合并在一起。每题作答后会立即显示反馈，适合学完一遍后自查。

<PracticePanel :questions="section51PracticeQuestions" />

## 本节小结

<KnowledgeCard title="本节核心结论" type="summary">
异步电机的核心是“定子旋转磁场感应出转子电流，再由转子电流与旋转磁场相互作用产生电磁转矩”。同步转速由 f1 和 p 决定，转差率 s 反映转子转速与同步转速的差异，并可用于判断电动机、发电机和电磁制动三种运行状态。
</KnowledgeCard>

<ImportantCard title="一句话记忆" type="success">
异步电机之所以能转，关键在“不同步”；判断运行状态，关键看转差率 s。
</ImportantCard>
