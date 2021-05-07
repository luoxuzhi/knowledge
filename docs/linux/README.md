## 1.linux

1. 阿里云`ubuntu`安装`git`，`apt-get install git`

2. 本地机器和服务器无需登录验证关键：将本地`id_rsa.pub`文件的内容添加到云服务器`~/.ssh/authorized_keys`中

3. ssh 连接阿里云服务器
   `ssh root@39.108.164.98`

4. linux

复制 cp a.js b.js

移动 mv a.js src/a.js 讲 a.js 移动到 src

新建并进入编辑界面 vim/vi 按 i 开始编辑,按 esc 退出编辑,按 :w 保存文件,输入：q 退出

查看 cat a.js

查看前面的 head -200f a.ja

查看后面的 tail -200f a.js

5.文件由本地复制到服务器

`scp -rp /path/filename username@remoteIP:/path`

6. <img :src="$withBase('/assets/Linux.jpg')">
