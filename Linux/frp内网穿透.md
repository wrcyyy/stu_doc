# 什么是FRP
frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp 协议，为 http 和 https 应用协议提供了额外的能力，且尝试性支持了点对点穿透。[项目地址](https://github.com/fatedier/frp)
# 使用示例
## SSH和WEB访问
1. 在公网服务器上搭建`frp-server`，通过修改`frps.ini`文件设置`frp`服务器端接收客户端流量的端口：
```
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 8080
```
2. 启动`frp-server`，这里我是通过`docker-comspoe`启动的：
```yml
version: '3'
services:
  frps:
    image: snowdreamtech/frps:latest
    restart: always
    network_mode: "host"
    volumes:
      - /home/frps/frps.ini:/etc/frp/frps.ini
```
或者通过`docker run --restart=always --network host -d -v /mnt/sda3/frpc/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc`命令启动
3. 在内网机器上搭建`frp-client`，通过修改`frpc.ini`文件设置端口，这里假设公网IP地址为X.X.X.X：
```
[common]
server_addr = X.X.X.X
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000

[web]
type = http
local_port = 80
custom_domains = www.yourdomain.com
```
4. 启动`frp-client`，这里通过`docker`启动： 

`docker run --restart=always --network host -d -v /mnt/sda3/frpc/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc:latest`
5. 通过ssh访问内网机器，假设用户名为root：
`ssh -oPort=6000 test@X.X.X.X`
6. 通过`http://www.yourdomain.com:8080`能够访问到内网机器上80端口对应的web服务

## 转发DNS查询请求
## 转发 Unix 域套接字
## 对外提供简单的文件访问服务
## 为本地 HTTP 服务启用 HTTPS
## 安全地暴露内网服务
## 点对点内网穿透
# 功能说明
## 配置文件
## Dashboard
通过浏览器查看 frp 的状态以及代理统计信息展示。需要在`frps.ini`中指定 dashboard 服务使用的端口，即可开启此功能：
```
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 8080
dashboard_port = 7500
# dashboard 用户名密码，默认都为 admin
dashboard_user = admin
dashboard_pwd = wang13462680535
```
## Admin UI
`Admin UI`能够帮助普通用户通过浏览器查看和管理客户端上的proxy状态和配置。 

需要在`frpc.ini`中指定admin服务使用的端口，就可以开启此功能了：
```
[common]
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin
```
打开浏览器通过`http://127.0.0.1:7400`访问`Admin UI`，用户名密码默认为`admin`。 

如果想要在外网环境访问`Admin UI`，将`7400`端口映射出去就可以了。通过修改`frpc.ini`完成此映射:
```
[range:test_tcp]
type = tcp
local_ip = 127.0.0.1
local_port = 7400
remote_port = 7400
```
## 监控
## 客户端身份验证
## 范围端口映射
在frpc的配置文件中可以指定映射多个端口，目前仅支持`tcp`和`udp`的类型。

这一功能通过`range:`段落标记来实现，客户端会解析这个标记中的配置，将其拆分成多个proxy，每一个proxy以数字为后缀命名。

例如要映射本地6000-6005，6007这6个端口，主要配置如下：
```
[range:test_tcp]
type = tcp
local_ip = 127.0.0.1
local_port = 6000-6006,6007
remote_port = 6000-6006,6007
```
实际连接成功后会创建8个proxy，命名为`test_tcp_0,test_tcp_1 ··· test_tcp_7`
## 客户端插件