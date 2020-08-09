## 1. Vue 实例的属性

1. `watch`

- `vm.$watch`和`watch`钩子的效果是一致的，区别是`$watch`不会随着组件销毁自动注销，要手动注销，而后者会自动注销。

```js
const unwatch = this.$watch('xxx',(new,old)=>{xxxx})
unwatch() // 手动取消观察
watch：{
  '$route'(to,from){},
  'obj.a'(){}
}
```

- `watch` 对象或者数组

当我们监听的数据为对象或数组时，`newValue`和`oldValue` 是相等的，因为对象和数组都为*引用类型*，这两个的形参指向的也是同一个内存地址。

- `watch` 的 6 种写法

```js
watch:{
    num:['numChange','numChangeOne'],
    num(){},
    num:'thirdMethod',
    num:{
      deep:true,
      handler:()=>{
        console.log('this is option handler')
      }
    }
  }
  vm.$watch('num',_=>{})
  vm.$watch('num',{immediate:true,handler:()=>{}})
```

2. vue 实例的生命周期 `created`、`mounted`、 `updated` 、`destroyed`

以下 3 种写法实现的功能一样，当新建一个 vue 实例没有提供 el 选项时，通过\$mount 方法来手动把元素挂在到#app 上，其中 render 函数中的 App 参数为引入的.vue 文件。

```js
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

new Vue({
  router,
  render:h=>h(App)
}).$mount('#app)

new Vue({
  el:'#app'
  router,
  template:'<App />',
  component:{ App }
})
```

参考官网介绍：

<img :src="$withBase('/assets/mount.png')">

3. vue 的实例具有的属性：`el`、`data`、`computed`、`methods`、`watch`、`components`

   注意计算属性 `computed` 和 `methods` 写法的区别，`methods` 写法赋值的时候要在 html 中要写成函数调用形式计算属性只有在它的相关依赖发生改变时才会重新求值。只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。只要发生重新渲染，`method` 调用总会执行该函数。不希望有缓存，就用 `method`

   ```html
   <div id="example">
     <p>Origin message:{{message}}</p>
     <p>ComputedReverse message:{{computedMessage}}</p>
     <p>MethodReverse message:{{methodMessage()}}</p>
   </div>
   ```

   ```js
   new Vue({
     el: '#example',
     data: {
       message: 'Hello',
     },
     computed: {
       computedMessage() {
         return this.message
           .split('')
           .reverse()
           .join('')
       },
     },
     methods: {
       methodMessage() {
         return this.message
           .split('')
           .reverse()
           .join('')
       },
     },
   })
   ```

   4.`computed` 默认只有 `getter` ，不过在需要时你也可以提供一个 `setter` ，如果`setter`不改变`getter`中的依赖，则`computed`出来的值不会改变。

```html
<div id="demo">{{fullName}}</div>
```

```js
new Vue({
  el: '#demo',
  data: {
    firstName: 'luo',
    lastName: 'xuzhi',
  },
  computed: {
    fullName: {
      get() {
        return this.firstName + this.lastName
      },
      set(val) {
        let names = val.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      },
    },
  },
})
```

5. `v-pre`该指令跳过这个元素和它子元素的编译过程。

6. 通过设置`inheritAttrs`为`false`可以使得绑定在组件标签非`props` 非`class` 非`style`属性不添加到根元素上，这些属性都可以通过`$attrs`对象来访问。
