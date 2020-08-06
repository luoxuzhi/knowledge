## 11. Node 相关

### 1. koa 框架 await 实现原理

use 的时候把中间推到一个中间件数组，核心方法是 compose(this.middleware) 返回一个 promise，处理完毕后再执行 handleResponse，compose 的核心方法是返回一个函数，函数的核心是返回 dispatch 函数

### 2. node 异步任务怎么执行

node.js 的异步机制是基于事件的，所有的 I/O、网络通信、数据库查询都以非阻塞的方式执行，返回结果由事件循环来处理。node.js 在同一时刻只会处理一个事件，完成后立即进入事件循环检查后面事件。这样 CPU 和内存在同一时间集中处理一件事，同时尽量让耗时的 I/O 等操作并行执行。
[链接](https://blog.csdn.net/fengqiaojiangshui/article/details/55819930)
