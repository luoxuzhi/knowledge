## 6.Vuex使用

1.使用Vuex

使用Vuex的module时，module里面的action命名各个模块之间要区分开来，引入的时候可以使用：

```js
// store/actions.js
export const saveSearchHistory=function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}  
export function deleteSearhHistory({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteFromSearch(query))
}
// store/index.js
import * as actions from './actions' 
```


2.commit方法只能接收两个参数，如果需要传多个，则把第二个参数封装成一个对象，参数用解构写法:

`({commit,state,getters,dispatch},{})`
```js
export const randomPlay = function ({commit},{list}) {
  commit(types.SET_SEQUENCE_LIST,list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST,randomList)
}
```
3.`getter`的第一个参数为`state`，第二个参数为`getters`

4.`actions` 会`自动`返回一个`promise`，`mutation`则不会（即使在mutation中return new Promise也不会）
控制台报 unknow mutation/action type 一般都是mutation/action 暴露出去有问题，需检查。

5.Vuex 的 `plugins` 是一个`function`数组，它的参数是一个`store`，通过它我们可以获取到每个`mutation`，类似于axios中的拦截器。
```js
import createrLogger from 'vuex/dist/logger'
const diyPlugin = store => {
  store.subscribe((mutation,state) => {
    console.log('mutation.type:',mutation.type)
    console.log('mutation.payload:',mutation.payload)
  })
}
const debug = process.env.NODE_ENV !== 'production'

// server side render
export default () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{moudlueA,moduleB},
    strict:true, // 限制state数据只能通过mutation修改
    plugins: debug ? [createLogger(),diyPlugin]:[]
  })
}
// browser side render
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{moudlueA,moduleB},
  strict:true, // 限制state数据只能通过mutation修改
  plugins: debug ? [createLogger(),diyPlugin]:[]
})
```

6.默认情况下，Vuex中包括`mutation`、`action`、`getter`都是放在全局命名空间中，如果`moudles`中设置了`namespaced：true`，`mutation`、`action`、`getter`前面会自动添加命名空间。

在action中默认可以调用其它全部action，module中的`getters`和外部的`getters`一样的调用方式。

```vue
<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    computed:{
      ...mapGetters:['aone','bone']
    }
  }
</script>
```

```js
export const setBone = function({commit},num) {
  commit('SET_BONE',num)
}
export const setBtwo = function({commit, dispatch},num) {
  dispatch('setBone',num).then(res => {
    console.log('in actionb use actiona')
  })
}
```
<img :src="$withBase('/assets/browser.png')">

7.带命名空间`namespaced:true`模块内部的`actions`、`getters`:

```js
// action，参数是结构赋值
export const actionA = ({commit,state,dispatch,rootGetters,rootState}) => {}
// getter，参数不是结构赋值
export cont getNum = (state,getters,rootState,rootGetters) => {}
```

8.Vuex的热更新

```js
if(module.hot){
  module.hot.accept([
    './state/state',
    './mutations/mutations',
    './actions/actions',
    './getters/getters'
  ],() => {
    const newState = require('./state/state').default
    const newMutations = require('./mutations/mutations').default
    const newActions = require('./actions/actions').default
    const newGetters = require('./getters/getters').default

    store.hotUpdate({
      state:newState,
      mutations:newMutations,
      actions:newActions,
      getters:newGetters
    })
  })
}
```

9.input 的`v-model`绑定到Vuex的`state`有两种方法：

① 修改`v-model`的实现方式，`v-bind:value`对应`state`中的值，`input/change`事件提交`mutation`改变`state`中的值

② 使用`v-model`绑定值的计算属性的`getter`、`setter`，对应代码：
```vue
<template>
  <input type="text" v-model="vuexValue">
</template>
<script type="text/exmascript-6">
  export default {
    computed:{
      vuexValue:{
        get(){
          return this.$store.state.num
        },
        set(value){
          this.$store.commit('SET_NUM',value)
        }
      }
    }
  }
</script>
```

10. Vuex的其它 api

```js
store.subscribe((mutation,state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
store.subscribeAction((action,state) => {
  console.log(action.type)
  console.log(action.payload)
})
store.watch((state)=> state.count + 1,(newVal) => {
  console.log(newVal)
})
```
