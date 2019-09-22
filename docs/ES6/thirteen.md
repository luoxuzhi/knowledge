## 13.Promise对象


1.`Promise`对象有以下两个特点。

* 对象的状态不受外界影响。三种状态：`Pending`、`Resolved`和`Rejected`。

* 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`。

2.`Promise.prototype.then()`

* `Promise`实例具有`then`方法，它是定义在原型对象`Promise.prototype`上的。它的作用是为`Promise`实例状态改变时的添加回调函数。

* `then`方法返回的是新的`Promise`实例（**不是原来那个`Promise`实例**），因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

* `then`的两个函数都接受异步操作传回的值作为参数。

3.`Promise.prototype.catch()`

* `Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

getJSON方法返回一个 `Promise` 对象，该对象状态变为`Resolved`时会调用then方法指定的回调函数；如果异步操作抛出错误状态变成`Rejected`，就会调用`catch`指定的回调函数，处理这个错误。另外，*then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获*。
```js
getJSON().then(res=>...).catch(err=>...)
```

* `Promise` 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。（因为`Promise`的状态一旦改变，就不可再变）

`Promise` 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。即错误总是会被下一个`catch`语句捕获。

一般来说，不在`then`方法里面定义`Reject`状态的回调函数（即`then`的第二个参数），总使用`catch`方法。因为这种写法可以捕获前面`then`方法执行中的错误。

`catch`方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用`then`方法。

`catch`只能捕获写在它前面的方法的错误，写法它后面的无法捕获，如果前面的方法都没有出错会跳过`catch`方法，`catch`也可以采用连缀的写法。

4.`Promise.all()`

`Promise.all`方法用于将多个`Promise`实例，包装成一个新的`Promise`实例，**`all`里面接收的是一个数组，返回结果也是一个数组**

5.`Promise.race()`

`Promise.race`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例。多个实例之中有一个实例率先改变状态，新实例的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给新实例的回调函数。**`race`也是接收一个数组作为参数，返回一个参数**



6.`Promise.resolve()`

将现有对象转为`Promise`对象，`Promise.resolve`方法就起到这个作用。`resolve`参数可以是`Promise`对象、`thenable`对象、不是对象、为空。得到一个`Promise`对象，比较方便的方法就是直接调用`Promise`.resolve()。

**立即`resolve`的`Promise`对象，是在本轮“事件循环”的结束时，而不是在下一轮“事件循环”的开始时**。

7.`Promise.reject()`

`Promise.reject(reason)`方法也会返回一个新的 `Promise` 实例，该实例的状态为`rejected`。
以下两种写法一样的功能：
```js
let pr1 = Promise.reject(new Error('MISTAKE THERE'))
let pr2 = new Promise((resolve, reject) => {
  reject(new Error('error'))
})
```

8.`Promise.done()`

`Promise`对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为`Promise`内部的错误不会冒泡到全局）。使用`done`方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

`done`方法的使用，可以像`then`方法那样用，提供`Fulfilled`和`Rejected`状态的回调函数，也可以不提供任何参数。

`done`会捕捉到任何可能出现的错误，并向全局抛出。
```js
asyncFunc().then(f1).catch(f2).then(f1).done()
```

9.`Promise.try()`

```js
Promise.try().then().catch()
```

10.`Promise.race`、`Promise.all`代码示例
```js
function loadImag(src) {
  return new `Promise`((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
          resolve(img)
      }
      img.onerror = function(err) {
          reject(err)
      }
  })
}

function showImgs(imgs) {
    imgs.forEach((img) => {
        document.body.appendChild(img)
    })
}

function showSingleImage (img) {
  document.body.appendChild(img)
}

// 返回单个参数
Promise.race([
  loadImag('https://ss0.bdstatic.com/6ONWsjip0QIZ8tyhnq/it/u=1618097094,4154452434&fm=77&w_h=121_75&cs=423647557,799948659'),
  loadImag('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg'),
  loadImag('https://ss0.bdstatic.com/6ONWsjip0QIZ8tyhnq/it/u=648300297,3284313282&fm=77&w_h=121_75&cs=1136402502,639612303')
  ]).then((res)=>{
    console.log(res)
    showSingleImage(res)
  })

// 返回数组
Promise.all([
  loadImag('https://ss0.bdstatic.com/6ONWsjip0QIZ8tyhnq/it/u=1618097094,4154452434&fm=77&w_h=121_75&cs=423647557,799948659'),
  loadImag('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg'),
  loadImag('https://ss0.bdstatic.com/6ONWsjip0QIZ8tyhnq/it/u=648300297,3284313282&fm=77&w_h=121_75&cs=1136402502,639612303')
  ]).then((res)=>{
  console.log(res)
  showImgs(res)
  })
```