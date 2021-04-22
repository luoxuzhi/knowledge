## 1. 原生开发遗忘点

1. 捕获先于冒泡执行

2. `capture-catch`关键字将中断捕获阶段和取消冒泡阶段。

3. `:host` 选择器指组件和`slot`中的内容

4. 小程序中插槽内容的顺序由父组件写的顺序决定，vue 中的插槽内容由子组件内部决定

5. 小程序的动态类

```html
class=“test-{{test}}”
```

6. `template`中用到是`wxss`需在主要的入口`wxss`文件中通过`@import`引入，要`wxss`后缀，
   应用写好的`template`通过`imort`标签 `src`输入路径，不需要`wxml`后缀

7. `bind`事件绑定不会阻止冒泡事件向上冒泡，`catch`事件绑定可以阻止冒泡事件向上冒泡。

8. `pages`数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 `pages` 数组进行修改。

9. `url` 用的都是想对路径

```js
// 走onUnload钩子 不走onHide钩子
wx.redirectTo({
  url: '../posts/posts',
})
// 当前页面不走onUnload钩子 走onHide钩子，跳转到的页面走onLoad钩子
wx.navigateTo({
  url: '../posts/posts',
})
wx.navigateTo({
  url: `../posts/posts?type=${type}`,
})
```

`switchTab`：跳转到 `tabBar` 页面，并关闭其他所有非 `tabBar` 页面。`switch`首次跳转的页面先走`onLoad`，其它切换走`onShow` `onHide`钩子。

10. 事件不能绑定到`template`标签上，因为该标签编译后不存在，相当于占位符。

11. `target`:触发事件的源组件。`currentTarget`:事件绑定的当前组件。

12. `onLoad` 一个页面只会调用一次，可以在 `onLoad` 中获取打开当前页面所调用的 `query` 参数。如果在`onLoad`方法中，不是异步的去执行一个数据绑定，则不需要使用`this.setData`方法，只需要对`this.data`赋值即可实现数据绑定。

13. `removeStorage` 清除单个，`clearStorage`清除所有缓存。

14. 如果采用同步的话，数据量大用异步，数据量小用同步

15. 每次进入页面都会执行`onShow`方法

16. 调试技巧：在调试窗口`ctrl+p`快速找到文件并且在`sm`文件里面打断点

17. 模板中的路径用绝对路径比较好

18.`tabbar`出现的顺序跟`app.json`中的`list`顺序关联

19. 在开发者工具的`app.json`中`pages`数组直接定义页面可以快速的新建对应的文件。

20. `text`标签要设置文本溢出

在单行要添加`display:block`样式，多行要添加`display:-webkit-box`样式， 限定行数溢出隐藏的关键 css 代码

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
```

21. 触发事件 `this.triggerEvent`，监听事件`bind`，自定义组件可以绑定自定义事件和原生事件

```js
backgroundAudioManager.onEnded(() => {
  this.triggerEvent('musicEnd')
})
```

```html
<x-progress bind:musicEnd="onNext"></x-progress>
<x-lyric isLyricShow="{{isLyricShow}}" bind:tap="toggleLyricShow"></x-lyric>
```

22. 组件里面的跳转路径都从根路径开始写可以保证每个页面跳转都正确（建议不用相对路径）

23. `ctrl+alt+q` 快速新建页面的所有钩子

24) `ws:key`可以自动获取循环数组对象里面的`property`,如下,url 为 item 里面的一个属性

```html
<block wx:for="{{swiperUrls}}" wx:key="url">
  <swiper-item class="swiper-item">
    <image src="{{item.url}}" mode="widthFix" class="swiper-img" />
  </swiper-item>
</block>
```

25. 小程序云函数的参数 evnet 里默认包含 userInfo,包含内容如下：

```js
const {
  userInfo: { appId, openId },
} = event
```

26. 小程序中所有的自定义属性都是`data-`开头

27. 小程序中类似 Vue 利用 ref 选中组件用 `selectComponent`，`selectComponent`为小程序自带方法，可以获取 dom 元素，示例代码如下

```html
<x-progress bind:musicEnd="onNext" bind:timeUpdate="timeUpdate"></x-progress>
```

```js
// update 为另外一个组件中定义好的方法
timeUpdate(event) {
  this.selectComponent('.xlyric').update(event.detail.currentTime)
},
```

28. 小程序自带方法还有`createSelectorQuery`

```js
getMovableDistance() {
  const query = this.createSelectorQuery()
  query.select('.movable-area').boundingClientRect()
  query.select('.movable-view').boundingClientRect()

  query.exec(rect => {
    movableAreaWidth = rect[0].width
    movableViewWidth = rect[1].width
  })
}
```

29. 小程序中不同的组件间传值通过`app.js`中定义全局属性

30. 小程序定义在 components 文件夹中的组件自带样式隔离，类似 Vue 中的 scoped，使用外部样式的 3 种方式

- 可配置`externalClasses`选项传入外部定义的样式类名

```js
properties: {},
externalClasses: ['iconfont', 'icon-sousuo'],
```

- 配置 options

```jsproperties: {},
options: {
    styleIsolation: 'apply-shared',
  },
```

- 组件内定义同样的样式文件通过`@import`引入

31. dom 显示隐藏由`hidden/wx:if`控制，结果同 Vue 中的`v-show/v-if`

32. 使用多个`slot`需要配置 `multipleSlots`,如下,渲染 dom 的顺序由组件内定义的`slot`顺序决定

```js
options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
```

33. 小程序可以修改 `properties`中定义的值

34. 小程序原生组件绑定事件 bind 后面不需要冒号，否则绑定不上，如`textarea`

35. 小程序绑定事件 catch/bind 的区别，·`catch`不冒泡，`bind`冒泡

36. 获取页面栈用`getCurrentPages`，如下

```js
const curPages = getCurrentPages()
const prev = curPages[curPages.length - 2]
prev.onPullDownRefresh()
```

37. 小程序实现分享功能必须用`button`按钮

```html
<button open-type="share"></button>
```

38. 小程序背景图片不能使用本地图片，只能使用网络图片或者本地图片转成 base64

39. `createSelectorQuery`或者`DOM`元素，`selectComponent`获取自定义组件实例
