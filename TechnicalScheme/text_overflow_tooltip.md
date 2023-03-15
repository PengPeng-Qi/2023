### 需求

文本超出省略号，且出现`tooltip`、没超出则不显示 tooltip

### 方案

`mouseover` 的时候获取文本的宽度和盒子的宽度

对比宽度，如果文本的宽度超出盒子的宽度，则出现 `tooltip`

![](../src//text_overflow_tooltip_01.png)
![](../src//text_overflow_tooltip_02.png)
