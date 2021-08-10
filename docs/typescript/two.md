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

### 4. 接口与类型别名的区别

- 接口和类型别名都可以用来描述对象的形状或函数签名
- 与接口类型不一样，类型别名可以用于一些其他类型，比如原始类型、联合类型和元组
- extend,接口和类型别名都能够被扩展，但语法有所不同。接口和类型别名不是互斥的。接口可以扩展类型别名，但反过来不行
- implements，类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型
- declaration merging：与类型别名不同，同一接口可以定义多次，会被自动合并为单个接口

### 5. 泛型
泛型(Generics)是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来 创建可复用的组件要更好，因为泛型会保留参数类型。
- 泛型函数，定义时使用泛型定义，使用时以完全省略尖括号，使编译器自动选择这些类型，从而使代码更简洁。
- 泛型接口
- 泛型类
- 泛型工具类型：typeof / keyof / in / infer / extends / Partial<T> 的作用就是将某个类型里的属性全部变为可选项 `?` 。
