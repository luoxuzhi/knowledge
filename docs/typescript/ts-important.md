## 要点记录[飞书链接](https://uys3mon1j3.feishu.cn/docs/doccnfPMrnjnvZNUYCubwZeFEhb)

1. [图片中链接](https://blog.csdn.net/qq_34998786/article/details/120300361)

<img :src="$withBase('/assets/ts-1.png')">
<img :src="$withBase('/assets/ts-2.png')">

2. super 的作用：

子类重写父类方法 并且需求获得父类同名方法的执行结果，example：

```ts
getName(){
return super.getName()+'test'
}
```

3. class

class 类型修饰词

private 允许在类内被使用

protected 允许在类内及继承的子类中使用

```ts
// 单例模式
class Demo {
  private static instance: Demo
  private constructor(public name: string) {
    this.name = name
  }

  static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new Demo(name)
    }
    return this.instance
  }
}
```

4. namespace 命名空间

命名空间内的东西要暴露出去，需求添加 export

```ts
namespace Home {
  class Test {}
  export class Page {}
}
```

命名空间之间的依赖关系

```ts
///<referec path='./components.ts'/>
```
