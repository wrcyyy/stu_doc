## Ubuntu下安装Docker
1. `apt-get update`
2. `apt-get upgrade -y`
3. `apt-get install docker.io -y`

## 安装docker-compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
> 安装时受防火墙的影响，可以使用代理进行下载
> 
> sudo curl -x "http://10.5.17.45:8118" -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

## 将普通用户加入到权限组中
```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
# 当提示权限时使用以下命令
sudo chmod 666 /var/run/docker.sock
```

## 配置docker daemon远程调用
> 仅在测试环境进行，不建议在正式环境开启此功能，将端口暴露在公网很容易遭到攻击 

修改`/usr/lib/systemd/system/docker.service`
```editorconfig
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://127.0.0.1:2375
```
修改完成后重新加载配置并重启服务：
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker.service
# 检查状态
sudo netstat -lntp | grep dockerd
```

## 修改docker仓库地址
受限于国内网络环境我们需要修改镜像仓库地址来提升镜像的下载速度。
1. 修改`/etc/docker/daemon.json`文件内容
2. 重新加载：`sudo systemctl daemon-reload`
3. 重启：`sudo systemctl restart docker`
```
# /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://m2mzl50e.mirror.aliyuncs.com"
  ]
}
```

## 设置开机启动
> 启用开机启动
```shell
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

> 禁用开机启动
```shell
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```