## 2. 小程序云开发

1. 云调用完成消息推送步骤

- 在微信公众平台配置小程序消息推送模板，路径是功能->订阅消息

- 在小程序端通过`wx.requestSubscribeMessage(Object object)`获取对应模板消息的推送授权，以下为示例代码，[api 使用见官网](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)。这里需要注意的是，获取授权操作需要用户来触发，写在`onLaunch、onLoad、onShow`等生命周期中无效

```js
onCommentClick() {
  // id分别是评论完成、收到评论模板id
  wx.requestSubscribeMessage({
    tmplIds: [
      'yaYz298H0JEtVhvs3FfYMn_5j4rnYbDxAsDC2GJmhG8',
      '_nCNnSeFb5vh6SHbVWJLGoJJXQZV1rmcWYS5QXrNoK0',
    ],
  })
}
```

- 获取授权后通过`wx.cloud.callFunction`调用云函数

* 云函数配置，需要`confin.json`中声明好云函数需要调用的 api，如下，[更多见官网](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

```json
{
  "permissions": {
    "openapi": ["subscribeMessage.send"]
  }
}
```

2. 云函数读取数据库与小程序端读取数据库的区别

- 云函数每次查询限制 100 条，小程序每次查询限制为 20 条

3. 获取用户信息的几种方式

- 只能用于页面展示，只能获取自己的信息

```html
<open-data type="userAvatarUrl"></open-data>
<open-data type="userNickName"></open-data>
<open-data type="userCotuntry"></open-data>
<open-data type="userCity"></open-data>
```

- 用户在已经授权的情况下通过`wx.getUserInfo`方式获取，用户未授权的情况下获取不到，昵称头像等信息一定需要用户授权过才能获取到，即无法通过 openid 来获取这些信息

```js
wx.getUserInfo({
  success: res => console.log(res),
})
```

- 通过`button`按钮

```html
<button slot="modal-content" class="modal-content" open-type="getUserInfo" bindgetuserinfo="onGetUserInfo">
  获取微信授权
</button>
```

- 后端获取或云函数获取 openid

<img :src="$withBase('/assets/basic-login.png')">
<img :src="$withBase('/assets/cloud-login.png')">

4. 小程序端读取云数据库里的数据时可通过数据权限配置很方便的实现用户是否只能查看自己的数据，省去`openid`传递鉴权
   <img :src="$withBase('/assets/priority.png')">

5. setData 原理，js 和 navtive 层交互完成后，native 层通知到 webview 层，所以不能频繁 setData，小程序优化方向：减少 setData 的次数、不在页面渲染的数据不定义到 data 里面

<img :src="$withBase('/assets/set-data.png')">

6. 生成小程序码，通过扫码进入对应的页面的时候在`onLoad`钩子里通过`options.sense`获取到配置小程序生成的参数

7. 小程序性能与体验优化，从 wxml、wxss、js、网络等方面入手（通过 audit 分析或者详情页面配置自动运行体验评分）

- 合理设置可点击元素响应区域的大小

- 避免多大的 wxml 节点数目，一个页面少于 1000 个 wxml 节点，节点深度少于 30 层，子节点数不大于 60 个

* 所有请求响应正常，并且耗时不久，避免短时间内发起多请求，对网络请求做必要的缓存以避免多余的请求，所有资源请求使用 https

* 不要引入未被使用的 wxss 样式，滚动区域开启惯性滚动增强体验，ios 上： `-webkit-overflow-scrolling: touch;`，在 hybrid 页面上同样可以加上

- 避免使用:active 伪类来实现点击态

* 文字颜色与背景色搭配较好，适宜的颜色对比度更方便用户阅读

* 废弃接口不使用

- 避免将不能访问的页面打包在小程序包里

* 避免渲染页面耗时过长，避免执行脚本耗时过长

* 及时回收定时器

- 避免出现任何 JavaScript 异常，避免 setData 的数据过大，减少 setData 的次数、不在页面渲染的数据不定义到 data 里，
