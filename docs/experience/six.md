## 6.flex 与 width 关系

1.同时设置 `flex-basis`(`flex第三个参数`) 和 `width`，如果 `flex-basis` 为 `auto` 则 `width` 有效，如果 `flex-basis` 为具体的数值或者百分数，则 `width` 设置的值无效，主轴空间根据`flex-basis` 设置的值进行分配

```css
.parent {
  display: flex;
  width: 600px;
}
.parent > div {
  height: 100px;
}
/* 空间不足，超出400，需要缩小 */
.item-1 {
  /* 0 */
  width: 140px;
  flex: 2 1 0%;
  background: blue;
}
.item-2 {
  /* 超出为800+200-600=400 占比为800/(800*1+200*1)=0.8 800-400*0.8=480 */
  width: 800px;
  flex: 2 1 auto;
  background: darkblue;
}
.item-3 {
  /* 600-480=120 */
  flex: 1 1 200px;
  background: lightblue;
}
```

2.弹性盒子中只写 `width` 不写 `flex`，效果等同（默认）`flex：0 1 auto`，即下面代码效果一样

```css
.item-1 {
  width: 140px;
  flex: 0 1 auto;
  background: blue;
}

.item-1 {
  width: 140px;
  background: blue;
}
```

3.主轴宽度有剩余，剩余宽度按比例分配加上分配之前宽度即为项目宽度

```css
.parent {
  display: flex;
  width: 600px;
}
.parent > div {
  height: 100px;
}
.item-1 {
  width: 140px;
  flex: 0 1 auto;
  background: blue;
}
.item-2 {
  /* 超出60等分，200+20*2=240 */
  width: 200px;
  flex: 2 1 auto;
  background: darkblue;
}
.item-3 {
  /* 220 */
  flex: 1 1 200px;
  background: lightblue;
}
```
