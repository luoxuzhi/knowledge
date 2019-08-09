## 6.Vue进阶

1.异步更新队列

为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 `Vue.nextTick(callback)` 

2.`router-link`本身不能添加类，所以要加一层`div`

3.使用Vuex

使用Vuex的module时，module里面的action命名各个模块之间要区分开来，引入的时候可以使用：

```js
export const saveSearchHistory=function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}  // store/actions.js

export function deleteSearhHistory({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteFromSearch(query))
}

import * as actions from './actions' // store/index.js
```


commit方法只能接收两个参数，如果需要传多个，需要把第二个参数封装成一个对象，参数用解构写法:

`({commit,state,getters,dispatch},{})`
```js
export const randomPlay = function ({commit},{list}) {
  commit(types.SET_SEQUENCE_LIST,list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST,randomList)
}
```
getter的第一个参数为state，第二个参数为getters

`actions` 会`自动`返回一个promise，mutation则不会（即使在mutation中return new Promise也不会）
控制台报 unknow mutation/action type 一般都是mutation/action 暴露出去有问题，需检查。

Vuex 的 `plugins` 是一个`function`数组
```js
import createrLogger from 'vuex/dist/logger'
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
    plugins: debug ? [createLogger()]:[]
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
  plugins: debug ? [createLogger()]:[]
})
```

Vuex中包括`mutation`、`action`、`getter`都是默认放在全局命名空间中，所以在action中默认可以调用其它全部action，module中的`getters`和外部的`getters`一样的调用方式。

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