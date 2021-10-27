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

- 获取元素 el 位置、本身样式,transform 合并用 concat

```js
const rect = el.getBoundingClientRect()
const style = getComputedStyle(el)

function syncTransform(wrapper, inner) {
  const wrapperTransform = getComputedStyle(wrapper).transform
  const innerTransform = getComputedStyle(inner).transform
  console.log('wrapperTransform :', wrapperTransform)
  wrapper.style.transform =
    // tansform合并用concat,最开始为'none'
    wrapperTransform === 'none' ? innerTransform : wrapperTransform.concat('', innerTransform)
}
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

由 v2 transition -> router-view 变成 router-view->transition->keep-alive

```html
<!-- vue3 -->
<router-view v-slot="{ Component }">
  <!-- appear为在当前路由时刷新时出现动画 -->
  <transition appear name="slide">
    <keep-alive>
      <component :is="Component" :singer="selectedSinger" />
    </keep-alive>
  </transition>
</router-view>

<!-- vue2 -->
<transition appear name="slide">
  <router-view :singer="selectedSinger"></router-view>
</transition>
```

9. `computed`中通过`this.xx`访问其他属性时，会做一次赖收集，所以如果`computed`中同一个属性多次访问的话做缓存有利于性能优化

10. 通过钩子返回的访问`DOM`元素的同一个`ref`在不同组件中使用得到的对应的`DOM`元素

11. `v-model`默认的`props`为`modelValue`

12. [render 函数帮助](<https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3CScroll%20ref%3D%5C%22scrollRef%5C%22%20v-bind%3D%5C%22%24props%5C%22%20%40scroll%3D%5C%22%24emit('scroll'%2Cevent)%5C%22%3E%5Cn%20%20%3Cslot%3E%3C%2Fslot%3E%5Cn%3C%2FScroll%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22filename%22%3A%22Foo.vue%22%2C%22prefixIdentifiers%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22inline%22%3Afalse%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22compatConfig%22%3A%7B%22MODE%22%3A3%7D%2C%22whitespace%22%3A%22condense%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup-const%22%2C%22setupRef%22%3A%22setup-ref%22%2C%22setupConst%22%3A%22setup-const%22%2C%22setupLet%22%3A%22setup-let%22%2C%22setupMaybeRef%22%3A%22setup-maybe-ref%22%2C%22setupProp%22%3A%22props%22%2C%22vMySetupDir%22%3A%22setup-const%22%7D%2C%22optimizeBindings%22%3Afalse%7D%7D>)

13. vuex vue-router

```js
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
  },
}
```

14. `watch` `props`属性变化用法区别

```js
export default {
  // vue2 vue3
  props:{
    modelValue:String
  }
  created(){
    this.$watch('modelValue', (newModelValue) => {...})
  }
  watch:{
    modelValue(newModelValue){...}
  }
}

// vue3
export default {
  props:{
    modelValue:String
  }
  setup(props){
    watch(()=>props.modelValue,(newModelValue)=>{...})
  }
}
```

15. watch/watchEffect 的区别

- watch 需要指定监听值，能够获取新老值，不会立即执行，除非配置`immediate:true`
- watchEffect 不需要指定监听值，不能获取老值，会立即执行并且自动进行依赖收集，立即执行类似 watch 配置`immediate:true`的效果，如果需要等页面更新完成之后再执行，可以添加配置`flush:'post'`

16. watch 用法

- watch 通过 ref、reactive、computed 包裹的值都可以直接 watch，即 watch 第一个参数无需使用函数返回方式
- 基本类型使用 ref 包裹进行 watch，配置项无需传入`deep:true`即可观察
- 引用类型可用 ref、reactive 包裹，如果观察的是对象整体，使用 ref 包裹时需传入`deep:true`,reactive 无需传

17 reactive 可以使用 ref 包裹的值，获得它的响应式

```js
const num = ref(1)
const requestParam = reactive({
  page_size: 50,
  page: num,
})
```
