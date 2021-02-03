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
