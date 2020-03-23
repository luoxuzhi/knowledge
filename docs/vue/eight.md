## 8.容易遗忘点汇总

1.`provide/inject`

`provide`进去的值不是响应式的，要获得响应式效果要通过`Object.defineProperty`，`provide`的值可以是一个`Object`或者返回`Object`的`function`

```js
// 根组件provide
new Vue({
  el: '#app',
  data: { inputName: 'xiaoming' },
  provide() {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.inputName, // 'xiaoming'
      enumberable: true
    })
    return { name: this.inputName, data }
  }
})

// 子组件inject
Vue.component('model-comp', {
  inject: ['name', 'data'],
  mounted() {
    console.log(this.data)
  }
})
```

2. 在含有`router-view`的组件中可以写以下方法来做出相应动作

```js
watch:{
  '$route'(to,from){
    console.log('to:',to)
    console.log('from:',from)
  }
}
```

3.`router-link`本身不能添加类，所以要加一层`div`

4.命名视图

命名视图对应的路由`routes`中要用`components`

```js
children: [
  {
    path: ':username',
    components: {
      default: Dynamic,
      'dynamic-one': DynamicOne
    }
  }
]
```

5.`this.$route.params` 是路由有冒号开头的部分，如下返回的是`{id:xxxx}`

```js
{
  path:'/recommend',
  component:Recommend,
  children:[
    {
      path:':id',
      component:Disc
    }
  ]
}
```

6.`this.$route.query` 是路由中`?`后面的部分

7. `router`的`history`的模式

`router`在`history`的模式下可以设置`base`属性，添加后会在每个路由前面添加这个`base`路径。`base`路径的前后都要有斜杠 `/`

```js
base:'/base/',
mode:'history'
```

8.`webpack的NamedModulePlugin（dev）`和`HashedModuleIdsPlugin（prod）`

这两个 plugin 让 webpack 不再使用数字给我们的模块进行命名，这样每个模块都会有一个独有的名字，也就不会出现增删模块导致模块 id 变化引起最终的 hash 变化了。

9. 通过`new`创建的实例

- `propsData`只用于`new`创建的实例中，通过`new`创建的实例`props`和`data`的写法如下,具体例子见[这里](https://github.com/luoxuzhi/vuedemo/blob/master/src/components/notification/notify.js)

```js
const instance = new NotificationConstructor({
  propsData: {
    ...rest
  },
  data: {
    autoClose: autoClose === undefined ? true : autoClose
  }
}).$mount()
```

- 通过`new`建立的组件`data`是`object`，其它情况下定义的组件`data`都是一个`function`，`return object`。

- 通过`new`定义新组件的时候可以指定`parent`，跟其它选项一样并列

10. computed 的`setter`

如果`setter`不改变`getter`中的依赖，则 computed 出来的值不会改变。

computed 里面 setter 方法的*调用时机*：例如有 computed 属性`num`，在其他地方通过`this.num = 'xx'` 给`num`赋值的时候才会调用`set`方法

11.作用域插槽

- (`v2.5.0+`) 只有在父组件引用子组件的标签上写了`slot-scope`，子组件里面的`$scopedSlots`属性对象才有值，且只要该标签写了`slot-scope`，它将不会出现在`$slots`对象中，只出现在`$scopedSlots`对象中。即一个插槽**不会同时**出现在`$slots/$scopedSlots`中。

- `v-slot(v2.6+)`

`render`函数中静态插槽和作用域插槽都推荐通过`$scopedSlots`使用，调用方法如下:
`this.$scopedSlots.default()/this.$scopedSlots.header()`

如需对外传递数据，则在括号里添加对象`this.$scopedSlots.header({msg:99})`，外部可通过`v-slot:header="{msg}"`访问

组件只有一个默认插槽时，可直接在组件引用标签上使用`v-slot`获取组件对外提供的值，如果有多个插槽，默认插槽及具名插槽对外提供的值都必须通过`template`语法来获得，否则会报错`To avoid scope ambiguity, the default slot should also use <template> syntax when there are other named slots.`

```vue
// 错误用法，会报上面提到的错误
<test v-slot="{ x, y }">x,y---{{x}},{{y}}
  <template v-slot:one>custom slot one content</template>
</test>

// 多个插槽的时候，正确用法
<test>
  <template v-slot="{x,y}">x,y---{{x}},{{y}}</template>
  <template v-slot:one>custom slot one content</template>
</test>

// 单个默认插槽可写在组件标签上或者使用template语法
<test v-slot="{ x, y }">
  x,y---{{x}},{{y}}
</test>
```

12. `transition`

- `transition`里面**只能包含一个根元素**，所以不能用 v-show(还停留在 dom 结构里)，只能只 v-if、v-else 进行多个组件的切换。

<img :src="$withBase('/assets/transition.png')">

- 自定义过渡类名对`transition`和`transition-group`都生效

- `transition`或`transition-group`或其它封装的过渡组件里面包裹的元素都只能是**原生元素标签**，否则不生效，如下则不生效。

```html
<fade-animation>
  <gallary :list="gallaryImgs" ref="gallary"></gallary>
</fade-animation>
```

- **初始渲染**的过渡可以通过设置`appear`相关`class`实现

13. 修改开发环境使用的 vue 版本

<img :src="$withBase('/assets/version.png')">

14. `props`自定义验证`validator`

```js
props:{
  propsOne:{
    validator(val){
      return typeof val === 'boolean'
    }
  }
}
```

15.`Vue.extend`

`Vue.extend`或者在`options`里面写`extends`可以继承组件，使用场景:某个组件功能比较完善了需要拓展新的功能，但又不想改动它，新组件直接`extends`，具体例子见[这里](https://github.com/luoxuzhi/vuedemo/blob/master/src/components/notification/notify.js)

16.`Vue.use(plugin)`的暴露方式
<img :src="$withBase('/assets/plugin.png')">

具体例子见[这里](https://github.com/luoxuzhi/vuedemo/blob/master/src/components/notification/index.js)

```js
import Notification from './notification'
import notify from './notify'

// Notification.install = (Vue) => {
//   Vue.component(Notification.name,Notification)
//   Vue.prototype.$notify = notify
// }
// export default Notification
export default Vue => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
```

17. 生产环境的`productionSourceMap`应该设置成`false`，防止别人调试

18. `key`

用`key`管理可复用的元素，`v-if`会使组件重走生命周期，`v-show`则不会让组件重走生命周期，通过`component`进行动态组件切换会重新走生命周期。

19. `Function`形式的`props`

`props`如果传的是`Function`，`Function` 会`return` 值的话，可以在父组件直接改变子组件的`data`，如果不返回值，子组件内部的操作可以改变父组件的`data`等。**`React`同理**

20.异步更新队列

为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 `Vue.nextTick(callback)`

21. `this.$forceUpdate()`会迫使 Vue 实例重新渲染。

22. `this.$set(obj,obj.name,val)` 同 `Vue.set(obj,key,val)`

23.使用`keep-alive`标签的情况：`component /router-view`，改变里面的数据用`actived`、`deactived`这两个钩子

24.`views`文件夹下面的文件推荐使用`kebab-case`命名，因为路由也是连字符

25.`vue-router`通过`addRoutes`添加的路由刷新后报`404`解决方案：

不在默认路由里添加 `path:'/404'` 的路由，对于无权限页面，可以做以下配置，`addRoutes`菜单权限[参考这里](http://www.zhufengpeixun.cn/train/vue-info/auth.html)

```js
{
  path:'*',
  component:{
    render:h=>h('h1',{},'Not Found')
  }
}
```

26. 以下官网的提示 `render` 指的是入口函数的 `render`，对于`.vue` 文件，同时包含`template` 和 `render`，会渲染 `template` 而不是`render`。

<img :src="$withBase('/assets/vue-render.png')">
