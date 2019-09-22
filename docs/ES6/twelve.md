## 12. Reflect

1.静态方法：`Reflect`对象一共有13个静态方法。

`Reflect.apply(target,thisArg,args)`

`Reflect.construct(target,args)`：`Reflect.construct`方法等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法。

`Reflect.get(target,name,receiver)`

`Reflect.set(target,name,value,receiver)`：第一个参数不是对象，`Reflect.set`会报错。`Reflect.set`会触发`Proxy.defineProperty`拦截。

`Reflect.defineProperty(target,name,desc)`：用来为对象定义属性。

`Reflect.deleteProperty(target,name)`

`Reflect.has(target,name)`

`Reflect.ownKeys(target)`：用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

`Reflect.isExtensible(target)`

`Reflect.preventExtensions(target)`

`Reflect.getOwnPropertyDescriptor(target, name)`

`Reflect.getPrototypeOf(target)`：用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。区别是，如果参数不是对象，`Object.getPrototypeOf`会将这个参数转为对象，然后再运行，而`Reflect.getPrototypeOf`会报错。

`Reflect.setPrototypeOf(target, prototype)`：用于设置对象的`__proto__`属性，返回第一个参数对象，对应`Object.setPrototypeOf(obj, newProto)`。