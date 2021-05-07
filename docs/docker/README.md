### 1.镜像操作

```
1.拉取镜像

// http://hub.daocloud.io/ 镜像地址
docker pull

2.查看本地所有镜像

docker images

3.删除本地所有镜像

docker rmi

4.将本地镜像导入和导出

// 导出本地镜像
docker save -o 文件名 镜像id

// 导入本地镜像
docker load -i 镜像文件

5.修改镜像名称

docker tag 镜像id 新的名称

6. 生成镜像

docker build -t 镜像名称:版本 Dockerfile路径

```
