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
