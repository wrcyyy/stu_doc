# 目录

1. [容器生命周期管理](#1-1)
    - [run](#docker-run)
    - [start/stop/restart](#docker-stop)
    - [kill](#docker-kill)
    - [rm](#docker-rm)
    - [pause/unpause](#docker-pause)
    - [create](#docker-create)
    - [exec](#docker-exec)

# <a id='1-1'>容器生命周期管理</a>

## <a id='docker-run'>docker run命令</a>

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

## <a id='docker-stop'>docker start/stop/restart命令</a>

docker start：启动一个或多个停止状态的容器

docker stop：停止一个或多个运行中的容器

docker restart：容器一个或多个容器

启动已被停止的容器（可使用容器ID或者容器名）:
> docker start 4653730a7c33
>
> docker start alpine

## <a id='docker-kill'>docker kill命令</a>

docker kill：杀掉一个运行中的容器

参数说明：

- -s: 向容器发送一个信号，默认值为KILL

> 以下两条命令等效
>
> docker kill -s KILL mycontainer
>
> docker kill mycontainer

## <a id='docker-rm'>docker rm命令</a>

docker rm：删除一个或者多个容器

> docker rm [OPTIONS] CONTAINER [CONTAINER...]

参数说明：

- -f：通过SIGKILL信号强制删除一个运行中的容器
- -l：移除容器中的网络连接
- -v：删除与容器相关联的卷

```shell
# 强制删除容器db01和db02
docker rm -f db01 db02
# 移除容器 nginx01 对容器 db01 的连接，连接名 db
docker rm -l db 
# 删除容器db01并删除挂载的数据卷
docker rm -v db01
# 删除所有已经停止的容器
docker rm $(docker ps -aq)
```

## <a id='docker-pause'>docker pause|unpause命令</a>

docker pause：暂停容器中的所有进程

docker unpause：恢复容器中的所有进程

> docker pause CONTAINER [CONTAINER...]
>
> docker unpause CONTAINER [CONTAINER...]

暂停数据库容器db01提供服务：
> docker pause db01

恢复数据库容器db01提供服务：
> docker unpause db01

## <a id='docker-create'>docker create命令</a>

docker create：创建一个容器但是不启动

> docker create [OPTIONS] IMAGE [COMMAND] [ARG...]

使用alpine:latest镜像创建一个容器，并将容器命名为test_container
> docker create --name test_container alpine:latest

## <a id='docker-exec'>docker exec命令</a>

docker exec：在运行中的容器中执行命令

> docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

参数说明：

- -d：分离模式：在后台运行
- -i：即使没有附加也保持STDIN打开
- -t：分配一个伪装器

在容器 mynginx 中以交互模式执行容器内 /root/runoob.sh 脚本:

> docker exec -it mynginx /bin/sh /root/runoob.sh

在容器 mynginx 中开启一个交互模式的终端:

> docker exec -it  mynginx /bin/bash

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