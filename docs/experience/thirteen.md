## 13. 手写篇

### 1. 数值转换,一元运算符 +

```js
const age = +'22' // 22
let text2 = '1' + 2 // "12"
let text3 = 1 + '2' // "12"
let text4 = 1 + 2 + '3' // "33"
let num = +text1 //  12 转换为 Number 类型
```

### 2. es5 实现 promise

### 3. 栈内存、堆内存理解

```js
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }

a.x // --> undefined
b.x // --> {n: 2}
```

1. 优先级。.的优先级高于=，所以先执行 a.x，堆内存中的{n: 1}就会变成{n: 1, x: undefined}，改变之后相应的 b.x 也变化了，因为指向的是同一个对象。
2. 赋值操作是从右到左，所以先执行 a = {n: 2}，a 的引用就被改变了，然后这个返回值又赋值给了 a.x，需要注意的是这时候 a.x 是第一步中的{n: 1, x: undefined}那个对象，其实就是 b.x，相当于 b.x = {n: 2}

### 4. 手写实现 new

```js
function create(Con) {
  // 创建一个空的对象
  var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments)
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments)
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj
}
```

### 5. 深拷贝实现

深拷贝可以拆分成 2 步，浅拷贝+递归，浅拷贝时判断属性值是否是对象，如果是对象就进行递归操作，两个一结合就实现了深拷贝。

```js
function cloneDeep1(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = cloneDeep1(source[key]) // 注意这里
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

一个简单的深拷贝就完成了，但是这个实现还存在很多问题。

1、没有对传入参数进行校验，传入 null 时应该返回 null 而不是 {}

2、对于对象的判断逻辑不严谨，因为 typeof null === 'object'

3、没有考虑数组的兼容

4、没有考虑循环引用，循环引用指的是 a.a = a (`循环引用延伸到 commonjs、esmodule 的循环引用`)

下面代码是一个改良版的，但仍存在一些问题，比如正则、symbol、date 类型的拷贝可能会出现问题，
所以日常开发中用 lodash 的深拷贝，知道深拷贝的过程中存在哪些问题就好了！

```js
function isObj(source) {
  return typeof source === 'object' && source !== null
}

function findSoure(arr, source) {
  // 因为保存source在push进arr的时候，保存的是指针地址，所以下面用===能找到
  return arr.find(item => item.source === source)
}

function deepClone(source, saveList = []) {
  if (!isObj(source)) return source

  let result = Array.isArray(source) ? [] : {}

  let isExitReult = findSoure(saveList, source)
  if (isExitReult) return isExitReult.result

  saveList.push({ source, result })

  for (const key in source) {
    // 只处理source的自身属性，不处理prototype的属性
    if (source.hasOwnProperty(key)) {
      const element = source[key]
      if (isObj(element)) {
        result[key] = deepClone(element, saveList)
      } else {
        result[key] = element
      }
    }
  }
  return result
}

let AA = {
  a: 3,
  b: {
    text: '8',
  },
  c: [1, 2, 3, 4],
}

AA.d = AA
let BB = deepClone(AA)
BB.c = [2, 3, 4, 5]
console.log(AA, BB)
```

<img :src="$withBase('/assets/deep-clone.png')">

### 6. js 中大数相加

JS 在存放整数的时候是有一个安全范围的，一旦数字超过这个范围便会损失精度。不能拿精度损失的数字进行运行，因为运算结果一样是会损失精度的。所以，我们要用字符串来表示数据！（不会丢失精度）

`JS 中整数的最大安全范围可以查到是：9007199254740991`

假如我们要进行 9007199254740991 + 1234567899999999999

```js
function addString(str1, str2) {
  // 此处加1是防止位置相同，第一位相加后需要向前进位
  let len = Math.max(str1.length, str2.length) + 1
  let newStr1 = str1.padStart(len, 0)
  let newStr2 = str2.padStart(len, 0)

  let newStr1Arr = newStr1
    .split('')
    .reverse()
    .map(i => Number(i))
  let newStr2Arr = newStr2
    .split('')
    .reverse()
    .map(i => Number(i))
  let resultArr = []
  let addFlag = 0
  let pushNum = null

  newStr1Arr.forEach((element, idx) => {
    let sumFirst = element + newStr2Arr[idx] + addFlag
    if (sumFirst >= 10) {
      pushNum = sumFirst % 10
      addFlag = 1
    } else {
      pushNum = sumFirst
      addFlag = 0
    }
    resultArr.push(pushNum)
  })
  let resultString = resultArr.reverse().join('')
  // 字符串首位为0截取去掉
  if (resultString[0] == 0) {
    return resultString.substring(1)
  } else {
    return resultString
  }
}
addString('9007199254740991', '1234567899999999999') // 11233575099254740990
```
