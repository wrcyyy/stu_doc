# 容器生命周期管理

- [run](#docker-run)
- [start/stop/restart](#docker-stop)
- [kill](#1-1)
- [rm](#1-1)
- [pause/unpause](#1-1)
- [create](#1-1)
- [exec](#1-1)

## <h2 id='docker-run'>docker run命令</h2>

docker run 用于启动一个新的容器并执行指定命令
> docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

参数说明：

- -a stdin：指定标准输入输出内容类型，STDIN/STDOUT/STDERR 三项
- -d：后台运行容器并返回容器ID
- -i：以交互模式运行容器，通常与-t同时使用
- -P：随机端口映射，容器内部端口随机映射到主机端口
- -p：指定端口映射，格式为：`{主机端口}:{容器端口}`
- -t：为容器重新分配一个伪输入终端，通常与-i一起使用
- --name="container-name"：为容器指定名称
- --dns 114.114.114.114：指定容器使用的DNS服务器，默认与主机相同
- -h "mars"：指定容器的hostname
- -e username="wrc"：设置环境变量
- --env-file=[]：从指定文件读取环境变量
- --cpuset="0-2"或者--cpuset="0,1,2"：使用指定的CPU运行容器
- -m：设置容器能够使用的最大内存
- --net="bridge"：指定容器的网络连接类型，支持bridge/host/none/container四种类型
- --link=[]：添加链接到另一个容器
- --expose=[]：开放一个端口或者一组端口
- --volume或-v：绑定一个卷

## <h2 id='docker-stop'>docker start/stop/restart命令</h2>

docker start：启动一个或多个停止状态的容器

docker stop：停止一个或多个运行中的容器

docker restart：容器一个或多个容器

启动已被停止的容器（可使用容器ID或者容器名）:
> docker start 4653730a7c33
> docker start alpine

# 容器操作

# 容器rootfs命令

# 镜像仓库

# 本地镜像管理

# info|version

# 获取镜像

> docker pull alpine

# 启动容器

> docker run -it alpine sh
>
> 参数说明：
> + -i：交互式操作
> + -t：终端
> + alpine：使用alpine镜像启动容器
> + sh：放在镜像名称后的是要执行的命令，这里我们希望有个交互式shell，因此使用sh

* 要退出容器，在shell中输入`exit`即可

> / # exit

# 启动停止的容器

> docker start b750bbbcfd88

# 后台运行

在大部分的场景下，我们希望 docker 的服务是在后台运行的，我们可以过`-d`指定容器的运行模式。
> docker run -itd alpine
>
> 加了`-d`参数默认不会进入容器，想要进入容器需要使用指令`docker exec`

# 停止|重启一个容器

* 停止一个容器

> docker stop b750bbbcfd88

* 重启一个容器

> docker restart b750bbbcfd88

# 进入容器

> docker exec -it b750bbbcfd88 sh

# 删除容器

> docker rm -f b750bbbcfd88

# 查看容器运行日志

> docker logs -f b750bbbcfd88

# 查看容器内的进程

> docker top b750bbbcfd88

# 查看容器的配置和状态信息

> docker inspect b750bbbcfd88

# 查询最后一次创建的容器

> docker ps -l

# 批量操作容器

* 停止所有容器

> docker stop $(docker ps -aq)

* 删除所有容器

> 1. docker container prune
> 2. docker rm $(docker ps -aq)
>
> 第一条只能删除停止状态的容器，第二条则是删除所有容器

# 容器过滤

* 根据标签过滤容器

> docker ps --filter "label=color"

* 根据名称过滤

> docker ps --filter "name=test-nginx"

* 根据镜像名称过滤

> docker ps --filter ancestor=nginx

* 根据镜像ID过滤

> docker ps --filter ancestor=d0e008c6cf02

# 文件拷贝

* 将容器中的文件拷贝到宿主机上

> docker cp 201630bd515e:/home/test.txt e:/test.txt

* 将宿主机上的文件拷贝到容器里

> docker cp e:/test.txt 201630bd515e:/home/test.txt