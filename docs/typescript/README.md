## 1.安装

1. 安装

```
npm install -g typescript
```

查看版本

```
tsc -v
```

2. 可选属性，属性名后面接？

```ts
interface Square {
  color?: string
  width?: number
}
```

3.属性只读，属性前面加 readonly

```ts
interface Point {
  readonly x: number
}

let a: Point = { x: 50 }

a.x = 99 // 报错
```

4. 函数类型接口：括号前面是参数，后面是返回值，参数名字可以不一致，但是数量必须一致

```ts
interface SearchFunction {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunction

mySearch = function(src, sub) {
  // 此处不在写类型是通过类型推导
  let result = src.search(sub)
  return result > -1
}
```

5.可索引的类型

```ts
interface StringArray {
  [index: number]: string
}
let newArray: StringArray = ['bloc', 'kjkjk']
let cd = newArray[0] // 'bloc'
```

6.类型

number string boolean 函数 any void array object

函数定义方式:

```ts
const fun: (value: any) => void = value => {}

const fun = (value: any): void => {}
```
