## 2. 重学 ts

### 1. 断言

- 类型断言的两种写法：尖括号、as

```ts
let someValue: any = 'this is a string'
let len: number = (<string>someValue).length
let len1: number = (someValue as string).length
```

- 非空断言

**x! 将从 x 值域中排除 null 和 undefined**

### 2. 类型保护（类型守卫）

**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内**。 换句话说，类型保护可 以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不 同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。
目前主要有以下几种的方式来实现类型保护

- in 关键字
- typeof 关键字 ：typeof v === "typename"/typeof v !== "typename" ， "typename" 必须是 number/string/boolean/symbol。 ts 并不会阻止与其它字符串比较，但是不会把那些表达式识别为类型保护。

- instanceof 关键字
- 自定义类型保护的类型谓词

```ts
function isString(x: any): x is string {
  return typeof x === 'string'
}
```

- switch

### 3. 交叉类型

在 ts 中交叉类型是将多个类型合并为一个类型。通过 & 运算符将现有的多种类型叠加到一起成为一种新的类型，它包含了所需的所有类型的特性。

- 同名基础类型属性的合并，对应的类型又不一致，类型会变成`never`
- 同名非基础类型属性的合并, 若存在相同的成员且成员类型为非基本数据类型，可以成功合并。

```ts
interface D {
  d: boolean
}
interface E {
  e: string
}
interface F {
  f: number
}
interface A {
  x: D
}
interface B {
  x: E
}
interface C {
  x: F
}
type ABC = A & B & C
let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666,
  },
}
console.log('abc:', abc)
```

PAGE 23
