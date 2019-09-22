## 15. async 函数

1.async函数

async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await。函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象，返回promise对象之后就可以使用then函数了。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
```js
async function asyncReadFile () {
  const f1=await readFile('/etc/one')
  const f2=await readFile('/etc/two')
  console.log(f1)
}
```


2.与Generator相比的优点与使用形式。

async函数对 Generator 函数的改进体现在四点：内置执行器、更好的语义、更广的适用性、返回值是 Promise。

使用形式：**函数声明、函数表达式、class、箭头函数、对象**

3.语法

a.async函数返回一个 Promise 
对象。async函数内部return语句返回的值，会成为then方法回调函数的参数。
```js
async function asyncReadFile () {
  return await Promise.resolve('555')
}
asyncReadFile().then(res=>...)
```


b.async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。即只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

c.await命令

正常情况下，await后面是一个 Promise 对象。如果不是则会被转成立即resolve的 Promise 对象。
只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

d.错误处理

用try...catch，将可能出错的await function都放到try里面，这样即使某个动作出错了函数还是可以继续执行。可以将多个await语句放到try里面

e.注意的情况

* await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中,也可以采用连缀的写法在最后catch，如下，这种较为简洁。
```js
async function asyncReadFile () {
  await Promise.reject('err').catch(err=>console.log(err))
  return await Promise.resolve('555')
}
asyncReadFile().then(res=>console.log(res))
```

* 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```js
let [one,two] = await Promise.all([getOne(),getTwo()])
```

* await命令只能用在async函数之中，如果用在普通函数，就会报错。如同yield只能放在generator函数中，放在普通函数中会报错。
* 多个请求并发执行，可以使用Promise.all方法。


4.按顺序完成异步操作

map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。

```js
async function loginOrderAsyncBingfa (urls) {
  const textPromises = urls.map(async url => {
    const response =await fetch(url)
    return response.text()
  })
  for (let textPromise of textPromises) {
    console.log(await textPromise)
  }
}
```


5.异步遍历器

* 同步遍历器用的是next()方法，立刻返回{value，done}两个值。
* 异步遍历器（asyncIterator）的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。之后可以使用then方法指定 Promise 对象的状态变为resolve后的回调函数。
* 异步遍历器的next方法，返回的是一个 Promise 对象。因此，可以把它放在await命令后面。
* 异步遍历器的next方法是可以连续调用的，不必等到上一步产生的Promise对象resolve以后再调用。这种情况下，next方法会累积起来，自动按照每一步的顺序运行下去。所以可把所有的next方法放在Promise.all方法里面。
* for await...of
for...of循环用于遍历同步的 Iterator 接口。for await...of循环，则是用于遍历异步的 Iterator 接口。

