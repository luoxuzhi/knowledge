## 5. Vue H5 music

1. [项目链接](http://music.ncuxz.fun/#/recommend)

2. 各种距离区分

<img :src="$withBase('/assets/all-distance.png')">

offsetWidth: width+padding+border

offsetHeight: Height+padding+border

offsetLeft: 当前对象到其上级层左边的距离

offsetTop: 当前对象到其上级层顶部边的距离

scrollWidth: 获取对象的滚动宽度

scrollHeight: 获取对象的滚动高度

scrollLeft: 设置或获取位于对象左边界和对象中目前可见内容的最左端之间的距离(width+padding 为一体)

scrollTop: 设置或获取位于对象最顶端和对象中可见内容的最顶端之间的距离；(height+padding 为一体)

clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框

clientHeight: 获取对象可见内容的高度，不包括滚动条，不包括边框

clientLeft: 获取对象的 border 宽度

clientTop：获取对象的 border 高度

\$el.clientWidth： 元素占据屏幕的宽度

window.innerWidth： 设备的宽度

e.touches[0].pageX：pageX 是滑动点相对屏幕的距离

e.offsetX：

offsetX: 表示鼠标指针位置相对于触发事件的对象的 x 坐标

offsetY: 表示鼠标指针位置相对于触发事件的对象的 y 坐标

offset[X|Y]: 是相对于目标元素左上角和鼠标之间的距离

page[X|Y]: 是相对于整个页面左上角和鼠标之间的距离
