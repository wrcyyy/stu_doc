# 使用Dockerfile制作

[*Dockerfile*指南](https://www.runoob.com/docker/docker-dockerfile.html)

1. 编写*Dockerfile*文件
2. 在*Dockerfile*所在目录下执行`docker build -t <image_name>:<tag> .`

# 将容器打包为镜像

`docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`用于将容器打包为镜像 参数说明：

```text
-a  提交的镜像作者
-c  使用Dockerfile指令来创建镜像
-m  提交时的说明文字
-p  在commit时，将容器暂停
```

> 示例：docker commit 201630bd515e registry.com.cn/test_image:v0.0.1