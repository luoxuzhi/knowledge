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

.once 对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上

.native 在组件标签上绑定事件，添加`.native`修饰符可不需要内部触发

```html
<player @click.native="clickOnPlayer"></player>
```

3.按键修饰符

.enter 、.tab、.delete、.esc、.space、.up、.down、.left、.right、.ctrl、.alt、.shift、.meta

vue 2.2.0 新增鼠标事件 .left .right .middle

修饰符可以组合、修饰符还可以和事件组合
```html
<button @keyup.enter="submit">submit</button>

<input type="text" @keyup.alt.67="clear"> // alt + C 组合

<div @click.ctrl="doSomething">clicl to do something</div> // Ctrl + click
```

4.非父子组件传值
:::tip 高级技巧
入口文件处添加`Vue.prototype.bue = new Vue()`
:::
```vue
<script type="text/ecmascript-6">
  export default{
    props:['num'],
    data(){ return {innerNum:this.num}},
    mounted(){
      this.bus.$on('number-change',val=>{
        this.innerNum = val
      })
    },
    methods:{
      changeNum(){
        this.innerNum = Math.random().toFixed(3)*1000
        this.bus.$emit('number-change',this.innerNum)
      }
    }
  }
</script>
```

5.`$on`/`$once`/`$emit`

`this.$on`只能监听当前组件内`$emit`出来的事件

this.$once 只监听一次

e.currentTarget // 事件绑定的元素

e.target // 真正触发事件的元素
```vue
<template>
  <div id="example" @click="handleClick">
    <div class="real-click">real click on me</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    methods:{
      handleClick(event){
        console.log(event.target) // div.real-click
        console.log(event.currentTarget) // div#example
      }
    }
  }
</script>
```
