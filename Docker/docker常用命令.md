# 批量操作容器
* 停止所有容器
> docker stop $(docker ps -aq)
* 删除所有容器
> 1. docker container prune
> 2. docker rm $(docker ps -aq)
> 
> 第一条只能删除停止状态的容器，第二条则是删除所有容器

# 过滤
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