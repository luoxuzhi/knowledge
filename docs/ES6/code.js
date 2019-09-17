let obj = {}
let foo = Symbol('foo')
Object.defineProperty(obj, foo, {value:'footer'})

for (let i in oobject) {
  // statement
}