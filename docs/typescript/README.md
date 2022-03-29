## 1.安装

1. 安装

```
npm install -g typescript
```

查看版本

```
tsc -v
```

2. 可选属性，属性名后面接？

```ts
interface Square {
  color?: string
  width?: number
}
```

3.属性只读，属性前面加 readonly

```ts
interface Point {
  readonly x: number
}

let a: Point = { x: 50 }

a.x = 99 // 报错
```

4. 函数类型接口：括号前面是参数，后面是返回值，参数名字可以不一致，但是数量必须一致

```ts
interface SearchFunction {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunction

mySearch = function(src, sub) {
  // 此处不在写类型是通过类型推导
  let result = src.search(sub)
  return result > -1
}
```

5.可索引的类型

```ts
interface StringArray {
  [index: number]: string
}
let newArray: StringArray = ['bloc', 'kjkjk']
let cd = newArray[0] // 'bloc'
```

6.类型

number string boolean 函数 any void array object

函数定义方式:

```ts
const fun: (value: any) => void = value => {}

const fun = (value: any): void => {}
```
7.元祖

元祖就是固定长度固定类型的数组

8.泛型和class

```ts
interface IPoint {
    X:number;
    Y:number;
    getDistances?:(P:IPoint)=>number;
    drawerPoint?:()=>void
}

class Point implements IPoint {
    // x:number;
    // y:number;
    constructor(private _x:number,private _y:number){
        this._x=_x;
        this._y=_y;
    }

    getDistances = (p:IPoint)=>{
        return Math.pow(p.X-this._x,2)+Math.pow(p.Y-this._y,2)
    }
    
    get X(){
        return this._x
    }

    get Y(){
        return this._y
    }

    set X(val:number){
        this._x=val
    }

    drawerPoint=()=>{}
    
}

const p44=new Point(5,6)
console.log(p44.getDistances({X:1,Y:2});

let makeTulple = <T,Y=number>(x:T,y:Y)=>[x,y]

const r1=makeTulple<string>('1',2)
```
