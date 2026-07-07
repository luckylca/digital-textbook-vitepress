# 公式渲染测试

这个页面用于单独验证 KaTeX 是否正常加载。这里不包含教材组件，方便排查公式样式是否被局部组件污染。

## 行内公式

同步转速为 $n_1$，频率为 $f_1$，极对数为 $p$。

转差率为 $s$，额定功率为 $P_N$，功率因数为 $\cos \varphi_N$。

## 行间公式

$$
n_1 = \frac{60 f_1}{p}
$$

$$
s = \frac{n_1 - n}{n_1}
$$

$$
P_N = \sqrt{3} U_N I_N \eta_N \cos \varphi_N
$$

## 多行公式

$$
\begin{aligned}
P_N &= \sqrt{3} \times 380 \times 5 \times 0.82 \times 0.80 \\
&\approx 2159\ \mathrm{W} \\
&\approx 2.16\ \mathrm{kW}
\end{aligned}
$$
