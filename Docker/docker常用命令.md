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