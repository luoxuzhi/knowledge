## 16.Class

1.Class的基本语法

a.es6通过定义class生成新的对象，定义“类”的方法的不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，**方法之间不需要逗号分隔**，否则会报错。

b.构造函数的prototype属性，在ES6的“类”上面继续存在。类的所有方法都定义在类的`prototype`属性上面。（*每个函数都有一个 prototype属性，这个属性是一个指针，指向一个对象，
而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法，这个对象称为原型对象*）
`访问class里面的methods通过this或者prototype`，视作用域来情况而定
```js
class point  {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  toString(){ return `(${this.x},${this.y})` }
  toValue(){}
}
point.prototype ={
  toString(),
  toValue()
}
```

c.可以通过Object.assign向类的prototype中添加多个方法。
```js
Object.assign(point.prototype,{
  toValue(){},
  toThirdMthod(){}
})
```

d.prototype对象的constructor属性，直接指向“类”的本身，即`point.prototype.constructor=point`。constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法，**constructor里面有的属性属于实例自身属性，其它方法则不属于实例自有方法**

```js
let p = new point()
console.log(p.hasOwnProperty('toString')) // false
console.log(p.__proto__.hasOwnProperty('toString')) // true
```

e.Class表达式，与函数一样，类也可以使用表达式的形式定义。采用Class表达式，可以写出立即执行的Class。
```js
let person = new class {
  constructor(name){ this.name= name }
  sayName(){ console.log(this.name) }
}('lxz')
person.sayName()// lxz
```

f.私有方法：利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

2.Class的继承 

a.子类必须在constructor方法中调用super()，否则新建实例时会报错。这是因为**子类没有自己的this对象，而是继承父类的this对象，它在这里用来新建父类的this对象**。
本点也解释了`React`新建组件为什么`super(props)`。[新手学习 react 迷惑的点](https://mp.weixin.qq.com/s/vDcFV3LiWBEbDBhf4XZ0uw)

```js
class point  {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  toString(){ return `(${this.x},${this.y})` }
  toValue(){}
}

class colorPoint extends point {
  constructor(x,y,color) {
    super(x,y) //子类没有自己的this对象，通过super新建父类的this对象并把x,y参数传递进去。
    this.color = color
  }
  toString(){ return this.color +' '+ super.toString() }
  toValue(){console.log('this method is overwrite by children')}
}

let colorInstance = new colorPoint(1,3,'red')
colorInstance.toString() // "red (1,3)"
```

b.类的prototype属性和__proto__属性

※子类的__proto__属性，表示构造函数的继承，总是指向父类（__proto__存在于实例或者类、构造函数的prototype属性中，即实例没有prototype属性，只有类或者构造函数有，实例只有__proto__属性）

※子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。(__proto__只是prototype对象的一个属性)

```js
console.log(colorPoint.__proto__ === point) // true
console.log(colorPoint.prototype.__proto__ === point.prototype)  // true
```
（两截图中的父构造函数、父类均指js原生构造函数）
<img :src="$withBase('/assets/extend-es5.png')">
<img :src="$withBase('/assets/extend-es6.png')">





c.super指向的是父类的prototype，即父类的方法，所以它子类继承的是父类的方法，但是不能继承父类实例的属性。如果属性定义在父类的原型对象上，super就可以取到。如
```js
class A{}
A.prototype.x = xxx;
```

d.__proto__属性

实例的__proto__属性指向它所属的类，如 `let p=new B();则p.__proto__=B{}`；

3.原生构造函数的继承

原生函数有：Boolean()/Number()/String()/Array()/Date()/Function()/RegExp()/Error()/Object()

4.Class的取值函数（getter）和存值函数（setter）

在Class内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

5.class的静态方法

如果class中某个方法前面加上static，则该方法不会被实例继承调用，只能通过类调用。
父类的静态方法，可以被子类继承。


6.另外的继承方式
```js
a. ClassA.call(this)
b. ClassB.prototype = new ClassA
```

7.**在 JavaScript 中，class 的方法默认不会绑定this** [新手学习 react 迷惑的点](https://mp.weixin.qq.com/s/vDcFV3LiWBEbDBhf4XZ0uw)
```js
class Foo  {
  sayThis(){console.log(this)}
  exec(cb){ cb() }
  render(){ this.exec(this.sayThis) }
}
let foo = new Foo('lxz')
foo.render() // undefined

// 方案1
class Foo  {
  sayThis(){console.log(this)}
  exec(cb){ cb() }
  render(){ this.exec(this.sayThis.bind(this)) }
}
let foo = new Foo('lxz')
foo.render()

// 方案2
class Foo  {
  sayThis = () => {console.log(this)}
  exec(cb){ cb() }
  render(){ this.exec(this.sayThis) }
}
let foo = new Foo('lxz')
foo.render()

// 方案3
class Foo  {
  constructor(){ this.sayThis = this.sayThis.bind(this) }
  sayThis(){console.log(this)}
  exec(cb){ cb() }
  render(){ this.exec(this.sayThis) }
}
let foo = new Foo('lxz')
foo.render()
// 推荐使用第二种方案
```