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
  toString(){ return this.color+' '+ super.toString() }
  toValue(){console.log('this method is overwrite by children')}
}

let colorInstance = new colorPoint(1,3,'red')
// colorInstance.toString() // "red (1,3)"

console.log(colorPoint.__proto__)
console.log(colorPoint.prototype.__proto__)