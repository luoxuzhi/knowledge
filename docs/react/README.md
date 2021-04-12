### 1.遗忘点

1、不能在函数组件标签上使用`ref`属性，但可以在函数组件内部使用`ref`属性

2、[新手学习 react 迷惑的点](https://mp.weixin.qq.com/s/vDcFV3LiWBEbDBhf4XZ0uw)

3、`this.props.children` 指的是组件标签内的内容

4、`dangerouslySetInnerHTML`,`style`要是要双花括号

5、`this.setState`里面直接可以直接接收一个对象，也可以接收一个函数返回的对象，推荐用函数返回的对象,异步设置优化性能，如下

```js
handleInputEnter = e => {
  const inputValue = e.target.value
  if (e.keyCode === 13 && inputValue) {
    this.setState(preState => {
      const lists = [...preState.lists, inputValue]
      return { lists, inputValue: '' }
    })
  }
}
```

```js
handleInputChange = e => {
  // this.setState({ inputValue: e.target.value })
  // console.log(this)
  const inputValue = e.target.value
  this.setState(() => ({ inputValue }))
}
```

6、当`state`或`props`发生变化时，自身的`render`函数都会重新执行，当父组件的`render`函数被执行时，它的子组件`render`都将被重新执行

7、`JSX`通过`createElement`->`JS`对象(虚拟`DOM`)->真实的`DOM`

8、如果数据更新后要通过`ref`获取更新后的`DOM`,需要把获取 `DOM`的代码写在`setState`的第二个参数里面，因为`setState`是异步的，类似`Vue`在`nextTick`
里面获取数据更新后的`DOM`。`setState`的第二个参数是一个`function`

```js
this.setState(() => ({ name: 'xiaoming' }), () => {})
```

9、生命周期

<img :src="$withBase('/assets/react-lifecycle.png')">

`componentWillReceiveProps`的执行时机：

- 组件要从父组件接收参数
- 组件第一次存在于父组件中，不会执行
- 如果这个组件之前已经存在于父组件中，才会执行

`componentWillMount->render->componentDidMount` 执行顺序类似`Vue`的`beforeMount->render->mounted`

父子组件执行顺序同`Vue`，`fater will mount->child will mount->child did mount->fater did mount`

`componentWillUpdate->render->componentDidUpdate` 执行顺序类似`Vue`的`beforeUpdate->render->updated`

[每个阶段所的事情见链接](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

10、`react` 中性能优化

- 方法在 `constructor` 中绑定 `this`
- 多次 `setState` 合并成一次
- `shouldComponentUpdate` 做是否更新判断

11、`animation: forwards` 保留动画的最后一帧

12、`transition`/`transition-group`使用注意点

:::danger 注意： `transition`中`key`的使用问题
`transition`标签上面的`key`不能使用`index`，否则可能会出现数据和页面展示不同步的情况

[代码](https://github.com/luoxuzhi/brief-book/blob/master/src/TodoList.js)
:::

13、action / reducer / dispatch

`aciton` 的定义在`dispatch`中使用 `action-type`可以在`reducer`中使用

14、使用`redux-saga`

`import { put, takeEvery } from 'redux-saga/effects'`

`put` 接收的参数格式和 `store.dispatch` 的格式一致

`typeEvery` 第一个参数接收的的 `action-type` 中定义的字符串参数

15、`mapStateToProps`/`mapDispatchToProps`都是一个函数，返回一个对象

16、`redux-thunk`的 `action` 可以返回一个函数，用于发送异步请求,见[代码](https://github.com/luoxuzhi/brief-book/blob/master/src/review-react-redux/actions.js)

17、`immutable` 同时设置多个值

在 `actions` 中写法：

```js
const setHotSearch = hotSearch => {
  return {
    type: actionsType.HEADER_HOT_SEARCH,
    hotSearch: fromJS(hotSearch),
    totalPage: Math.ceil(hotSearch.length / 10),
  }
}
```

在`reducers`中用`merge`方法避免写链式`set`,代码如下:

```js
case actionsType.HEADER_HOT_SEARCH:
  return state.merge({
    hotSearch: action.hotSearch,
    totalPage: action.totalPage
  })
```

18、经过`immutable`包装的数组取出来遍历的时候需要用`toJS()`方法转回普通的 js 对象，代码示例:

```js
let searchItems = []
let newList = hotSearch.toJS()
if (newList.length) {
  for (let index = (page - 1) * 10; index < page * 10; index++) {
    if (newList[index]) {
      searchItems.push(
        <span className="search-keyword-item" key={newList[index]}>
          {newList[index]}
        </span>
      )
    }
  }
}
```

19、`transfrom`的`rotate`只对块级元素有效，要是`iconfont`生效必须设置`display:block`

20、子元素浮动，可在父元素上添加`overflow:hidden`使得父元素感受到子元素的高度

21、受控组件与非受控组件

<img :src="$withBase('/assets/react-control-or-no-control.png')">

22、react-router-dom

<img :src="$withBase('/assets/react-route-params.png')">

<img :src="$withBase('/assets/react-router-dom.png')">

23、hooks 的优势

- 函数组件无 this 问题
- 自定义 hook 方便复用状态逻辑
- 副作用关注点分离

24、memo 与 useMemo 的区别

<img :src="$withBase('/assets/memo.png')">

25、useCallback 针对的是给组件传递函数导致组件重新渲染问题优化


26 、类型校验的写法

```js

class TodoItem{}

TodoItem.propTypes = {
  content: PropTypes.string
}

TodoItem.defaultProps = {
  test: 'hhhh'
}

class TodoItem{
  static defaultProps = {
    test:'hhhh'
  }
  
  static propTypes = {
    test:PropTypes.string
  }
}

```

27. forwardRef用来访问子组件内部的DOM