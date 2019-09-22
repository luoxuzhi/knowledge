## 11. Proxy应用

1.Proxy应用

要使得`Proxy`起作用，必须针对`Proxy`实例（上例是proxy对象）进行操作，而不是针对目标对象（例中是空对象）进行操作。如果`handler`没有设置任何拦截，那就等同于直接通向原对象。
```js
let proxy = new Proxy({}, {
  get:function (target,property) {
    return 35
  }
})
console.log(proxy.time) // 35
```

一个技巧是将 `Proxy`对象，设置到`object.proxy`属性，从而可以在`object`对象上调用。
```js
var obj = {proxy: new Proxy(target, handler)}
```

`Proxy` 实例也可以作为其他对象的原型对象。

2.Proxy的实例方法

* `get()`：`get`用于拦截某个属性的读取操作。`get`方法可以继承
```js
let person = {name:'zhangsan'}
let proxyone = new Proxy(person, {
  get:(target,property) => {
    if (property in target) {
      return target[property]
    }else{
      throw new Error(`Property ${property} does not exit`)
    }
  }
})
console.log(proxyone.name) // zhangsna
console.log(proxyone.age) // Property age does not exit
```

:::tip 
判断某个属性是否在对象中，用 `property in target`
:::

一个属性不可配置（`configurable`）和不可写（`writable`），则该属性不能被代理，通过 `Proxy`对象访问该属性会报错。
```js
const tgt = Object.defineProperties({}, {
  foo:{
    value:123,
    writable:false,
    configurable:false
  }
})
const handlerone = {
  get:(target,property)=>{return 'abc'}
}
const unwritable = new Proxy(tgt,handlerone)
console.log(unwritable.foo) // roperty 'foo' is a read-only and non-configurable data property...
```


* `set()`:`set`方法用来拦截某个属性的赋值操作。

假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
```js
let validator = {
  set:(obj,property,value) => {
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('age is not an integer')
      }
      if (value>200) {
        throw new RangeError('the age seems invalid')
      }
    }
  }
}
let person = new Proxy({},validator)
person.age = 300 // RangeError
```

对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。



* `apply()`：`apply`方法拦截函数的`调用`、`call`和a`pply`操作。
```js
// 拦截函数调用
let targetApp = () => {return 'i am the origin target'}
let handlerApp = {
  apply:()=>{ return 'i am the proxy'}
}
let p = new Proxy(targetApp, handlerApp)
console.log(p()) // i am the proxy
```



* `has()`：
`has`方法用来拦截`HasProperty`操作，判断对象是否具有某属性时，这个方法会生效。**典型的操作就是in运算符，如果原对象不可配置或者禁止扩展，这时has拦截会报错**。
```js
let handlerHas = {
  has:(target,key)=>{
    if (key[0]==='_') return false
    return key in target
  }
}
let targetHas = {_prop:'_prop',prop:'prop'}
console.log('_prop' in targetHas) //false
```

`has`方法拦截的是`HasProperty`操作，而不是`HasOwnProperty`操作，即`has`方法不判断属性是对象自身的属性，还是继承的属性。另外，`for...in`循环也用到了`in`运算符，但是`has`拦截对`for...in`循环不生效。

* `construct()`：

`construct`方法用于拦截`new`命令，`construct`方法可以接受两个参数。

`target`: 目标对象

`args`：构建函数的参数对象

`construct`方法返回的必须是一个对象，否则会报错。
```js
let pco = new Proxy(function(){}, {
  construct:(target,arglist) => {
    // return 1 // 'construct' on proxy:trap returned non-object
    return {1:'haha'}
  }
})
// 拦截new
console.log(new pco()) // {1:'haha'}
```


* `deleteProperty()`：
`deleteProperty`方法用于拦截`delete`操作，目标对象自身的不可配置（`configurable`）的属性，不能被d`eleteProperty`方法删除，否则报错。


* `defineProperty()：`defineProperty方法拦截了Object.defineProperty操作。
* `getPrototypeOf()：`getPrototypeOf方法主要用来拦截获取对象原型。
* `isExtensible()：`isExtensible方法拦截Object.isExtensible操作。
* `ownKeys()：`ownKeys方法用来拦截对象自身属性的读取操作。
* `preventExtensions()：`preventExtensions方法拦截Object.preventExtensions()。
* `setPrototypeOf()：`setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。
* `getOwnPropertyDescriptor(target, propKey)`：拦截Object.getOwnPropertyDescriptor()，返回属性的描述对象。

3.`Proxy.revocable()`：Proxy.revocable方法返回一个可取消的 Proxy 实例。


:::danger

Proxy.revocable的使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
:::

4.`this` 问题

在 `Proxy` 代理的情况下，目标对象内部的`this`关键字会指向 `Proxy` 代理。有些原生对象的内部属性，只有通过正确的`this`才能拿到，需要`this`**绑定原始对象**才可以解决这个问题。


```js
const targetDate = new Date('2015-01-01')
const handlerDate = {
  get:(target,prop)=>{
    if (prop === 'getDate') {
      return target.getDate.bind(targetDate)
    }
    return Reflect.get(target, prop)
  }
}
const proxyDate = new Proxy(targetDate,handlerDate)
console.log(proxyDate.getDate()) // 1
```