## 性能优化

1. 指标和优化
   查看页面帧数：performance->cmd+shift+p 搜 frame 最后一个

加载：

network 的瀑布图、基于 HAR 存储和重建性能信息、

lighthouse 的 speed index、TTFB、页面加载时间、首次渲染

响应：

交互动作的反馈时间、FPS（frame per second）、异步请求完成时间(1s)

RAIL 测量模型：

response 处理事件应在 50ms 以内完成

Animation: fps 60，每 10s 产生一帧

Idle：尽可能增加空闲时间
Load:

性能测量工具： chrome devtools/ lighthouse/webpagetest

lighthouse:npm install -g lighthouse / lighthoust https://www.bilibili.com

2. 性能优化常用计算方式

   DNS 解析耗时: domainLookupEnd - domainLookupStart

   TCP 连接耗时: connectEnd - connectStart

   SSL 安全连接耗时: connectEnd - secureConnectionStart

   网络请求耗时 (TTFB): responseStart - requestStart

   数据传输耗时: responseEnd - responseStart

   DOM 解析耗时: domInteractive - responseEnd

   资源加载耗时: loadEventStart - domContentLoadedEventEnd

   First Byte 时间: responseStart - domainLookupStart

   白屏时间: responseEnd - fetchStart

   首次可交互时间: domInteractive - fetchStart

   DOM Ready 时间: domContentLoadEventEnd - fetchStart

   页面完全加载时间: loadEventStart - fetchStart

   http 头部大小： transferSize - encodedBodySize

   重定向次数：performance.navigation.redirectCount

   重定向耗时: redirectEnd - redirectStart

```js
// 计算一些关键的性能指标
window.addEventListener('load', event => {
  // Time to Interactive
  let timing = performance.getEntriesByType('navigation')[0]
  console.log(timing.domInteractive)
  console.log(timing.fetchStart)
  let diff = timing.domInteractive - timing.fetchStart
  console.log('TTI: ' + diff)
})
```

```js
// 观察长任务
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log(entry)
  }
})

observer.observe({ entryTypes: ['longtask'] })
```

```js
// 见面可见性的状态监听
let vEvent = 'visibilitychange'
if (document.webkitHidden != undefined) {
  // webkit prefix detected
  vEvent = 'webkitvisibilitychange'
}

function visibilityChanged() {
  if (document.hidden || document.webkitHidden) {
    console.log('Web page is hidden.')
  } else {
    console.log('Web page is visible.')
  }
}

document.addEventListener(vEvent, visibilityChanged, false)
```

```js
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
var type = connection.effectiveType

function updateConnectionStatus() {
  console.log('Connection type changed from ' + type + ' to ' + connection.effectiveType)
  type = connection.effectiveType
}

connection.addEventListener('change', updateConnectionStatus)
```

3. 页面隐藏展示切换

```js
let vEvent = 'visibilitychange'
if (document.webkitHidden !== undefined) {
  vEvent = 'webkitvisibilitychange'
}
function visibilityChanged() {
  if (document.hidden || document.webkitHidden) {
    console.log('hidden')
  } else {
    console.log('visible')
  }
}
document.addEventListener(vEvent, visibilityChanged, false)
```

4. 网络切换

```js
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
const type = connection.effectiveType
function updateConnectionStatus() {
  console.log(`connection type from ${type} to ${connection.effectiveType}`)
}
connection.addEventListener('change', updateConnectionStatus)
```

<img :src="$withBase('/assets/performance-1.png')">
<img :src="$withBase('/assets/performance-2.png')">
<img :src="$withBase('/assets/performance-3.png')">
<img :src="$withBase('/assets/performance-4.png')">
<img :src="$withBase('/assets/performance-5.png')">
