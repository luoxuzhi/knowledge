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
