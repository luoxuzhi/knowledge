## 6. Vue H5 qunar

1. css 中使用文件夹路径别名，别名前面要加~

2. 如果给 2 倍图，在 reset 样式中设置 html 的 ont-size 为 50px 后，可以直接用设计图标注像素除以 100 得到 rem 的值。

3. 如果 no-wrap()不生效，父级添加样式：min-width:0

4. 动态路由，注意两种写法的区别，第一种不是子路由写法，第二种是子路由写法，要在父组件里添加 router-view

<img :src="$withBase('/assets/dynamic-route.png')">

5. 滑动防止整体页面一起动，在 touchstart 事件添加 prevent 修饰符，即@touchstart.prevent
