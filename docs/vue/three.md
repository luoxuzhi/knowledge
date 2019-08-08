## 3.事件处理器

1.内联处理器

有时也需要在内联语句处理器中访问原生 DOM 事件，可以用特殊变量 `$event` 把它传入方法内

```html
<div id="example">
  <button @click="say('Hi')">click me say hi</button>
  <button @click="say('Hello')">click me say hello</button>
  <button @click="say('warn message',$event)">click me say trans event</button>
</div>
```
```js
new Vue({
  el:'#example',
  methods:{
    say(message,event){
      if(event){
        event.preventDefault()
      }
      console.log(message)
    }
  }
})
```

2.事件修饰符

在事件处理程序中调用`event.preventDefault()`、`event.stopPropagation()`是常见需求。methods只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。Vue.js 为v-on提供了事件修饰符。通过由点`.`表示的指令后缀来调用修饰符。

.stop   阻止单击事件冒泡

.prevent 阻止默认事件，如a连接和表单提交

.capture  添加事件侦听器时使用事件捕获模式

.self  只当事件在该元素本身（而不是子元素）触发时触发回调

.once 对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上

3.按键修饰符

.enter 、.tab、.delete、.esc、.space、.up、.down、.left、.right、.ctrl、.alt、.shift、.meta

vue 2.2.0 新增鼠标事件 .left .right .middle

修饰符可以组合、修饰符还可以和事件组合
```html
<button @keyup.enter="submit">submit</button>

<input type="text" @keyup.alt.67="clear"> // alt + C 组合

<div @click.ctrl="doSomething">clicl to do something</div> // Ctrl + click
```

4.`this.$forceUpdate()`会迫使Vue实例重新渲染。

