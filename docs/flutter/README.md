## 1. 基本概念

1. 路由跳转的两种方式

```dart
onTap: () => {
  Navigator.of(context).push(MaterialPageRoute(
      builder: (context) =>
          PostDetail(post: posts[index])))
},
```

```dart
onPressed: () => {Navigator.pushNamed(context, '/about')},

```
