### 需求

1. 文本超出省略号，且出现`tooltip`、没超出则不显示 tooltip
2. 多行文本超出显示省略号

### 需求 1 解决方案

`mouseover` 的时候获取文本的宽度和盒子的宽度

对比宽度，如果文本的宽度超出盒子的宽度，则出现 `tooltip`

![](../src/text_overflow_01.png)

![](../src/text_overflow_02.png)

### 需求 2 解决方案

单行文本：
![](../src/text_overflow_03.png)

多行文本：
![](../src/text_overflow_04.png)
