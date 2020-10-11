## 17. 直播

1.直播协议：
HLS 协议、RTMP 协议、HTTP-FLV 协议

2.好用但有延时，对延时要求不高可使用
<img :src="$withBase('/assets/hls.png')">

动态列表直播（live playlist）、全量列表点播（vod playlist）

hls 解析过程
<img :src="$withBase('/assets/hls-1.png')">

3.rtmp 用于传统的视频，使用客户端采集源，使用相对复杂，减少延时可使用该方式

<img :src="$withBase('/assets/rtmp.png')">

4.http-flv 可减少延时，视频格式是 flv，不需要长连接，便于并发

<img :src="$withBase('/assets/http-flv.png')">

5.video 标签
<img :src="$withBase('/assets/video-prop.png')">

可流畅播放的事件：canplaythrough
自定义进度条用 timeupdate 事件

### loadstart durationchange loadedmetadata

### progress canplay play pause

### seeking seeked waiting ended

<img :src="$withBase('/assets/video-event.png')">

6.制作流

[可以用在线流](https://blog.csdn.net/xbfengyu/article/details/100094747)
