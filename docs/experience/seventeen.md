## 17. 直播

1.直播协议：
HLS 协议、RTMP 协议、HTTP-FLV 协议

2.hls 好用但有延时，对延时要求不高可使用
<img :src="$withBase('/assets/hls.png')">

动态列表直播（live playlist）、全量列表点播（vod playlist）

hls 解析过程

第一个 ts 文件会查找 PAT 文件，PAT 文件会查找 PMT 文件，PAT、PMT（音频视频帧）和 ts 组合成 PES 文件

<img :src="$withBase('/assets/hls-1.png')">

3.rtmp 用于传统的视频，使用客户端采集源收集到服务器可以使用 tcp 协议传输，如果用 web 进行源采集则是基于 webRtc
，使用相对复杂，实时性好，减少延时可使用该方式，格式是 flv

<img :src="$withBase('/assets/rtmp.png')">

4.http-flv 是 rtmp 的升级版，它兼具 hls 和 rtmp 的优点， 可减少延时，视频格式是 flv，是 flv 长连接，不利于并发。
与 rtmp 的区别是 rtmp 和用户之间是用 tcp 通信，而 http-flv 和播放客户端是基于 http 协议的，但是它们的格式都是 flv。

<img :src="$withBase('/assets/http-flv.png')">

5.video 属性
<img :src="$withBase('/assets/video-prop.png')">

6.video 事件

可流畅播放的事件：canplaythrough
自定义进度条用 timeupdate 事件

#### loadstart durationchange loadedmetadata

#### progress canplay play pause

#### seeking seeked waiting ended

<img :src="$withBase('/assets/video-event.png')">

7.制作流

[可以用在线流](https://blog.csdn.net/xbfengyu/article/details/100094747)
