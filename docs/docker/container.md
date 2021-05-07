### 2.容器操作

```
1. 运行容器

docker run 镜像id|镜像名称
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像id|镜像名称
-d 后端运行容器
-p 为了映射当前linux端口和容器端口
--name 定制容器的名称

2. 查看正在运行的容器

docker ps [-qa]
-a 查看所有的容器，包括没有运行的
-q 只查看容器的标识

3. 查看容器的日志

docker logs -f 容器id
-f可以滚动查看日志的最后几行

4. 进入容器的内部

docker exec -it 容器id bash
docker exec -it 容器id sh

5.删除容器，删除之前，首先要停止容器

// 停止指定的容器
docker stop 容器id
// 停止全部的容器
docker stop $(docker ps -qa)
docker rm 容器id
docker rm $(docker ps -qa)

6.启动容器

docker start 容器id|镜像名称

7. 修改容器名称

docker commit 容器id newname

```
