## 11. Node

### 1. koa 框架 await 实现原理

use 的时候把中间推到一个中间件数组，核心方法是 compose(this.middleware) 返回一个 promise，处理完毕后再执行 handleResponse，compose 的核心方法是返回一个函数，函数的核心是返回 dispatch 函数

```js
compose() {
    return async ctx => {
    // createNext函数的作用就是将上一个中间件的next当做参数传给下一个中间件,并且
    // 将上下文ctx绑定当前中间件，当中间件执行完，调用next()的时候，其实就是去执行下一个中间件
        function createNext(middleware, oldNext) {
            return async () => {
                await middleware(ctx, oldNext);
            }
        }
        let len = this.middlewares.length;
        let next = async () => {
            return Promise.resolve();
        };
        // 链式反向递归模型的实现，i是从最大数开始循环的，将中间件从最后一个开始封
        // 装，每一次都是将自己的执行函数封装成next当做上一个中间件的next参数，这样
        // 当循环到第一个中间件的时候，只需要执行一次next()，就能链式的递归调用所有中间件
        for (let i = len - 1; i >= 0; i--) {
            let currentMiddleware = this.middlewares[i];
            next = createNext(currentMiddleware, next);
        }
        await next();
    };
}
```

### 2. node 异步任务怎么执行

node.js 的异步机制是基于事件的，所有的 I/O、网络通信、数据库查询都以非阻塞的方式执行，返回结果由事件循环来处理。node.js 在同一时刻只会处理一个事件，完成后立即进入事件循环检查后面事件。这样 CPU 和内存在同一时间集中处理一件事，同时尽量让耗时的 I/O 等操作并行执行。
[链接](https://blog.csdn.net/fengqiaojiangshui/article/details/55819930)

### 3. node 的 Buffer、Stream

a. Buffer 就是在内存中开辟一段空间，用来装数据的

b.数据都是二进制的，记住电信号（010101）

c. Stream 的三大原则：有源头、有终点、源头流向终点。

d.Stream 就像司机，它的作用就是将装着数据的 Buffer 开向终点
