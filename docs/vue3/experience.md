## 2. 实战

### 1. 访问真实 dom 节点

- 组件如果是`options`写法仍通过`this.$refs`访问
- 组件如果是`setup`写法，则需要通过`ref`包装然后访问`value`值

```js
setup() {
    const rootRef = ref(null)
    // rootRef需在onMounted中才能访问到，此处为null
    console.log('rootRef.value', rootRef.value)
    return {
      rootRef
    }
  },
```

### 2. better-scroll 使用要点

`better-scroll`初始化包括的节点只能有一个，因为`better-scroll`只对第一个子节点有效果

### 3.自定义指令

`v-loading.title/v-loading:title`区别：前者 title 通过`binding.modifiers`访问,后者通过`binding.arg`访问。

```vue
<div class="recommend" v-loading:[loadingText]="loading"></div>
data() { return { loadingText: '正在载入...', } },
```

```js
// binding的打印结果
{
  arg: "正在载入..."
  dir: {mounted: ƒ, updated: ƒ}
  instance: Proxy {recommendItemClick: ƒ, …} // 使用该指令的组件
  modifiers: {}
  oldValue: undefined
  value: true
}
```

4.原生 dom

- 获取`style`,`getComputedStyle`浏览器原生支持，`const style = getComputedStyle(el)`

- 判断包含类，`el.classList.contains(className)`，更多见 element 组件库

5. 组件可以添加`emits:['xxx']`选项来展示对外派发的事件

6.通过`ref`包装的变量，在`watch` 中可以自动展开，`computed` 中不能自动展开

```js
const scrollY = ref(0)
watch(scrollY,newY => {....})
const fixedTitle = computed(()=>{
  if(scrollY.value < 0 ) return ''
})
```

7. `setup`返回对象中的`key`会和组件`props`属性里面的值处于同级

如图，`click/probeType`为`props`,`rootRef/scroll`为`setup`对象中返回的值

<img :src="$withBase('/assets/v3-setup.png')">

8.`transition`动画用法发生变化

```html
<!-- vue3 -->
<router-view v-slot="{ Component }">
  <!-- appear为在当前路由时刷新时出现动画 -->
  <transition appear name="slide">
    <component :is="Component" :singer="selectedSinger" />
  </transition>
</router-view>

<!-- vue2 -->
<transition appear name="slide">
  <router-view></router-view>
</transition>
```

9. `computed`中通过`this.xx`访问其他属性时，会做一次赖收集，所以如果`computed`中同一个属性多次访问的话做缓存有利于性能优化
