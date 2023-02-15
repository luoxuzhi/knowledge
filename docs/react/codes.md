## codes

1. useDebounce

```js
export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}
```

2. 传统 css 缺陷

- 缺乏模块组织

- 缺乏作用域

- 隐式依赖，让样式难以追踪

- 没有变量

- css 选择器与 html 耦合

css-in-js 方案：

- emotion

- style-component

3. grid 和 flex 布局

- 要考虑，是一维布局 还是 二维布局

一般来说，一维布局用 flex，二维布局用 grid

- 是从内容出发还是从布局出发？

从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间，此时用 flex

从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充,此时用 grid

4. Svg 的两种用法

```js
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import logo from './logo.svg'
```

5. useState

- useState 传入函数则为惰性更新，如果要保存函数可以传入函数并且返回函数，见[链接](https://github.com/sindu12jun/imooc-jira/blob/master/src/utils/use-async.ts)

```js
const [retry, setRetry] = useState(() => () => {})
```

- setState 返回的设置函数是异步操作，函数不能马上获取到最新的值

```js
const [count, setCount] = useState(0)
const handleClick = () => {
  // setCount 是异步操作，真正的执行顺序是console->count+1，所以打印的不是最新值
  setCount(count + 1)
  console.log('count:', count)
}
```

- setState 另外一种函数式写法

```js
const [person, setPerson] = useState({ name: 'xiaoluo', age: 18 })
const handleAgeAdd = () => setPerson(prevState => ({ ...prevState, age: prevState.age + 1 }))
```

6. useEffect

每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。 React 会在执行当前 effect 之前对上一个 effect 进行清除，React 也会在组件卸载的时候执行清除操作。

- useEffect 可以添加进依赖里的值:基本类型，组件状态，非组件状态的对象，绝不能放到依赖里，否则会触发无限更新

- 如果 useEffect 的依赖项不添加容易掉进闭包的坑（获取不到最新的值）

```js
export function test() {
  let num = 0

  const effect = () => {
    num += 1
    const message = `num value in message is ${num}`
    console.log('inner num:', num) // 1 2 3 4 5 6 7 8
    return function unmount() {
      console.log(message)
    }
  }
  console.log(num) // 0
  return effect
}

// 执行test，返回effect函数,add(effect)每次执行，都会生成新的message
const add = test() // 0
// 执行effect函数，返回引用message1的unmount函数
const unmount1 = add()
// 执行effect函数，返回引用message2的unmount函数
const unmount2 = add()
// 执行effect函数，返回引用message3的unmount函数
const unmount3 = add()
// 执行effect函数，返回引用message4的unmount函数
const unmount4 = add()
add()
add()
add()
add()
unmount1() // 1
unmount2() // 2
unmount3() // 3
unmount4() // 4
test() // 0
```

7. useMemo

使用 useMemo 可以处理无限更新问题，返回一个 memoized 值。

8. useCallback

返回一个 memoized 回调函数。

```js
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
```

9. 错误边界

只有 class 组件才可以成为错误边界组件。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

10. useRef

使用 useRef 可以做初始值的持久化，使用 useState 传入函数也可以做初始值持久化，区别：

- useRef 做初始化的值不会当成组件的状态，更新 xxxRef.current 不会触发组件的更新，不会自动刷新页面，访问新值需要通过 xxxRef.current

- useState 需要通过传入函数返回值做惰性初始化，初始化的值会被当做组件值被 watch，值发生变化会自动刷新页面

11. 路由

路由下面点击链接默认会自动拼接到当前路由的后面，变成子路由

12. 重置路由

```js
export const resetRoute = () => (window.location.href = window.location.origin)
```

13. 自定义遍历器 iterator (数组、对象、Map 类型都部署了遍历器，存在于 Symbol.interator 属性上)

```js
const obj = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++] + '!',
            done: false,
          }
        } else {
          return { value: undefined, done: true }
        }
      },
    }
  },
}

for (let o of obj) {
  console.log(o)
}
```

14. 获取 antd 组件的 props 定义

```ts
import { Select } from 'antd'
type SelectProps = React.ComponentProps<typeof Select>
```

15. 多层数据传递优化方案

context、组合组件控制反转、redux

16. react-redux 与 redux-thunk 的关系

react-redux 的 action 本身不能处理异步操作，异步数据需要外面处理完成再调用 dispatch 更新 state，通过 redux-thunk 中间件拦截 action，使得 action 可以是一个函数，在函数中写异步代码执行完成后再进行 dispatch

17. 类型守卫

```js
const isError = (value: any): value is Error => value?.message;
```

18.

<img :src="$withBase('/assets/react-review.png')">
