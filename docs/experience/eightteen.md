## 18. 经典编程题

1.

注意第一个例子，具名的立即执行函数不能被重新赋值，所以 b=20 无效

```js
var b = 10
;(function b() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了。发现了具名函数 function b(){}，拿此b做赋值；
  // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20
  console.log(b) // [Function b]
  console.log(window.b) // 10，不是20
})()
-------------------------------------------------------------------------------------
var b = 10
;(function() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，此时的b是全局的b，拿此b做赋值；
  // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20
  console.log(b) // 20
  console.log(window.b) // 20
})()
-------------------------------------------------------------------------------------
var b = 10
;(function b() {
  var b = 20
  console.log(b) // 20
  console.log(window.b) // 10，不是20
})()
```

2.打印出一个 String 串中所有字母的所有可能的排列，假定字母不重复,例如

`“han” → "han" "hna" "nah" "nha" "ahn" “anh"`

```js
// 关键：不停的调换相邻元素的位置
function swap(arr, i, j) {
  if (i != j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

function perm(str) {
  let res = []
  let arr = str.split('')
  function fn(n) {
    //为第n个位置选择元素
    for (var i = n; i < arr.length; i++) {
      swap(arr, i, n)
      //判断数组中剩余的待全排列的元素是否大于1个
      if (n + 1 < arr.length - 1) {
        //从第n+1个下标进行全排列
        fn(n + 1)
      } else {
        res.push(arr.join(''))
      }
      swap(arr, i, n)
    }
  }
  fn(0)
  return res
}

console.log(perm('abc')) //  ["abc", "acb", "bac", "bca", "cba", "cab"]
```
