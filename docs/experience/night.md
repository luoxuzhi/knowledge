## 9. 知识盲区

1. koa 框架 await 实现原理

use 的时候把中间推到一个中间件数组，核心方法是 compose(this.middleware) 返回一个 promise，处理完毕后再执行 handleResponse，compose 的核心方法是返回一个函数，函数的核心是返回 dispatch 函数

2. node 异步任务怎么执行

node.js 的异步机制是基于事件的，所有的 I/O、网络通信、数据库查询都以非阻塞的方式执行，返回结果由事件循环来处理。node.js 在同一时刻只会处理一个事件，完成后立即进入事件循环检查后面事件。这样 CPU 和内存在同一时间集中处理一件事，同时尽量让耗时的 I/O 等操作并行执行。
[链接](https://blog.csdn.net/fengqiaojiangshui/article/details/55819930)

3. Vue 编译原理

parse-optimize-generate

源码编译篇思维导图

<img :src="$withBase('/assets/vue-source-code1.jpg')">

源码响应篇思维导图

<img :src="$withBase('/assets/vue-source-code2.png')">

4. http 缓存、强缓存、协商缓存

强制缓存时，服务端会在 Response Headers 中的 cache-control 对缓存时间、缓存方式等进行定义

协商缓存主要表现在 Response Headers 中的 etag 和 last-modified，在客户端重新向服务端发起请求时，会在 Request Headers 中换个 key 名：if-none-matched 和 if-modified-since

两种缓存的共同点：都从客户端缓存中读取资源；区别是强缓存不会向服务器发请求，协商缓存会发请求

5. cdn 快的原理

[lianjie](https://www.west.cn/docs/52026.html)

DN 网络由一个 DNS 服务器和几台缓存服务器组成：

- 当用户点击网站页面上的内容 URL，经过本地 DNS 系统解析，DNS 系统会最终将域名的解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。

* CDN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回给用户。

* 用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求。

* CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。

区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户 IP 地址，判断哪一台服务器距用户最近；根据用户所请求的 URL 中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。

基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址。全局负载均衡设备把服务器的 IP 地址返回给用户。

用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

6. 打包优化

用 Happypack 来加速代码构建，dll，uglify 优化

7. Vue 的 nextTick 实现

对于 `macro task`的实现，优先检测是否支持原生 `setImmediate`，这是一个高版本 `IE` 和 `Edge` 才支持的特性，不支持的话再去检测是否支持原生的 `MessageChannel`，如果也不支持的话就会降级为 `setTimeout 0`；而对于`micro task` 的实现，则检测浏览器是否原生支持 `Promise`，不支持的话直接指向 `macro task` 的实现。

8. 浏览器 setTimeout 怎么判断 5s，事件堆栈放在哪里
9. event loop
10. 浏览器跨域
11. 新技术的研究
