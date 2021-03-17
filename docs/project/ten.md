## 10. hybrid

#### 1. Android 与 IOS 双向通讯对比-相同点

- 都是通过 WebView 来完成网页的加载

* 都是通过想 window 注入对象的方式来提供可被 web 端调用的方法

* 都可以直接调用 web 端挂载到 window 对象下的方法

#### 2. Android 与 IOS 双向通讯对比-不同点

- 注入对象不同：Android 可提供注入对象名。IOS 固定为 webkit

* js 调用 Native 方式不同：面向 Android 可直接获取注入对象，调用方法。面向 IOS 为相对固定的写法

  `window.webkit.messageHandlers.functionName.postMessage(argument)`

```js
// web调用Android方法
function useAndroidFunction(string) {
  window.AndroidJSBridge.androidTestFunction1(string)
}

// web 调用IOS方法，写法固定
function useIOSFunction(args) {
  // window.webkit.messageHandlers.方法名.postMessage(参数)
  window.webkit.messageHandlers.iosTestFuction.postMessage(args)
}

// web提供给native调用的方法要挂载window下面
window.webProvideFunction = function(args) {
  // some logic
  return 'this is web provide function'
}
```

- 传递数据格式不同：面向 Android 只能接受基本数据类型数据。面向 IOS 可以接收任意类型数据。

* 返回值不同：面向 Android 可以直接接收返回值，面向 IOS 没有办法直接获取返回值，因此只能通过回调再调用 web 绑定在 window 下 提供的方法。

```js
// android 返回值
let result = window.AndroidJSBridge.androidTestFunction1(string)
```

#### 3. 判断是 Android 还是 IOS 端

```js
function isAndroid() {
  if (window.androidJSBridge) {
    return true
  } else if (window.webkit) {
    return false
  }
}
```

#### 4. 判断是否是 iphoneX

```js
const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}

window.isIphoneX = isIphoneX()
```

#### 5. IOS 的一些兼容问题

```
html,body{
  /_ IOS 下的滑动卡顿问题 _/
  -webkit-overflow-scrolling: touch;
  /_ IOS 下点击取消默认高亮效果 _/
  -webkit-tap-highlight-color:rgba(0,0,0,0)
}
```
