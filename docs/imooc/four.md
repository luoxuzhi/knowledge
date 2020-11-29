## 4. Vue H5 仿 element

1. [项目链接](http://sell.ncuxz.fun/#/seller)

2. 在 Vue 中，type 如果是`Array、Object`，则`default`应该是一个函数

3. 使用`inline-block`的时候，父容器设置`font-size=0`避免空隙，
   然后在设置了`inline-block`的`class`里设置字体大小

4. 加大点击范围 使用`display：block`然后增加一个`padding`

5. 使用`better-scroll`一定要在`nextTick`接口里面

6. 正则表达式

```js
// 1.将时间戳转换成日期
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  // 循环要用for in
  for (let k in o) {
    // 注意new RegExp通过反引号赋值的时候，反引号里面的内容要用小括号
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' +str).substring(str.length)

// 2.解析url
export function urlParse () {
  let url=window.location.search
  let obj={}
  // 如url=?id=1234&a=b
  let reg=/[?&][^?&]+=[^?&]+/g
  let arr=url.match(reg)
  // ['?id=1234','&a=b']
  if (arr) {
    arr.forEach((item)=>{
      let tempArr=item.substring(1).split('=')
      let key=decodeURIComponent(tempArr[0])
      let val=decodeURIComponent(tempArr[1])
      obj[key]=val
    })
  }
  return obj
}
```

7. 处理图片占位技巧

```css
.parent
  width 100%
  height 0
  padding-top 100%
  img
    position absolute
    top 0
    left 0
    width 100%
    height 10s0%
```

8. 本地缓存设置读取

```js
export function saveToLocal(id, key, value) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage.__seller__ = JSON.stringify(seller)
}
export function loadFromLocal(id, key, def) {
  let seller = localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
```

9. 文字换行`overflow-wrap、word-break、white-space`

10. float 布局

```html
<div class="left">left</div>
<div class="right">right</div>
<div class="middle">middle</div>
```

```css
.left
  float left
  width 300px
  height 300px
  background #0A4CFE
.right
  float right
  width 300px
  height 300px
  background #0A4CFE
.middle
  height 300px
  margin-left 300px
  margin-right 300px
  background #AB9AFA
```

11.

```
background-size:cover可以使背景图宽高比例不变并且适应容器。
background-size:contain可以使背景图完全显示出来，不会适应容器
```
