# Ubuntu配置

1. 安装Ubuntu的时候选择正常安装，这样能够解决一些不必要的麻烦
2. 打开`设置-->分享-->屏幕分享`
3. 开启屏幕分享并设置一个连接密码
4. 安装软件`dconf-editor`

```shell
sudo apt-get install dconf-editor
```

5. 修改配置

```shell
dconf write /org/gnome/desktop/remote-access/require-encryption false
```

6. 修改VNC-server配置（没配好像也没影响）

```shell
/usr/lib/vino/vino-server --sm-disable start
```

# windows连接

1. 下载并安装[VNC客户端](https://www.realvnc.com/en/connect/download/viewer/)
2. 点击`File-->New connection`，填写信息创建连接

# 问题

1. 今天给另外一台有两个账号的机子设置后，VNC连接时提示`password check failed!`，暂时还没找到解决办法