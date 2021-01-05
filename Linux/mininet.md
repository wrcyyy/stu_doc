# 简介
Mininet是由斯坦福大学基于Linux Container架构开发的一个进程虚拟化网络仿真工具

可以创建一个含有主机、交换机、控制器和链路的虚拟网络，其交换机支持OpenFlow，具有高度灵活的自定义软件定义网络。

资料：
- [官方文档](http://mininet.org/)
- [SDN介绍+mininet](https://www.bilibili.com/video/BV1VJ41117vJ)
- [项目地址](https://github.com/mininet/mininet)
# 安装
可以在Ubuntu上使用`apt install mininet -y`进行安装，但不是最新版本

可以按照下述操作步骤从源码安装最新版本：
```
git clone git://github.com/mininet/mininet.git
cd mininet
git tag # 查看tag
git checkout 2.3.0d6 # 选择tag，我这里看到最新的是2.3.0d6
. util/install.sh -a # 执行安装程序
```
# 可以做什么
1. 为OpenFlow应用程序提供一个简单，便宜的网络测试平台
2. 启用复杂的拓扑测试，无需连接物理网络
3. 具备拓扑感知和OpenFlow感知的CLI，用于调试或运行网络范围的测试
4. 支持任意自定义拓扑，主机数可达4096，并包括一组基本的参数化拓扑
5. 提供用户网络创建和实验的可拓展Python API。
# 优点

- 与仿真器比较：启动速度快；拓展性大；带宽提供多；方便安装，易使用。
- 与模拟器比较：可运行真实的代码；容易连接真实的网络。
- 与硬件测试床比较：便宜；快速重新配置及重新启动。

# 主要特性

Mininet作为一个轻量级软定义网络研发和测试平台，其主要特性包括：

- 支持OpenFlow、Open vSwitch等软定义网络部件
- 方便多人协同开发
- 支持系统级的还原测试
- 支持复杂拓扑、自定义拓扑
- 提供python API
- 很好的硬件移植性（Linux兼容），结果有更好的说服力
- 高扩展性，支持超过4096台主机的网络结构。

# 命令拓扑
    ```
    graph LR
    A[Mininet] --> B(网络构建及启动参数)
    A --> C(内部交互命令)
    A --> D(外部运行参数)
    
    B --> E("--topo")
    B --> F("--custom")
    B --> G("--switch")
    B --> H("--controller")
    B --> I("--mac")
    B --> J("···")
    
    C --> K("dump")
    C --> L("net")
    C --> M("nodes")
    C --> N("links")
    C --> O("dpctl")
    C --> P("iperf")
    C --> Q("···")
    
    D --> R("-c：清除配置信息")
    D --> S("-h：帮助")
    
    ```
## 网络构建及启动参数
### --topo参数
1. 单一拓扑

整个网络拓扑中交换机有且只有一个，其下可以挂一个或多个主机：

`sudo mn --topo=single,3`代表该网络拓扑有一个交换机和三个主机
    ```
    graph TD
    
    A(s1) --> B(h1)
    A --> C(h2)
    A --> D(h3)
    
    ```
2. 线形拓扑
交换机连接呈线形排列，且每个交换机所连接的主机数量只有1个

`sudo mn --topo=linear,4`

```
graph LR

A(s1) --> B(s2)
B --> C(s3)
C --> D(s4)
A --> E(h1)
B --> F(h2)
C --> G(h3)
D --> H(h4)
```

3. 树形拓扑

交换机连接呈树形排列，且每个交换机所连接主机一般有多个。depth代表深度，fanout代表扇出。

`sudo mn --topo=tree,depth=2,fanout=2`

```
graph TD

A(s1) --> B(s2)
A --> C(s3)
B --> E(h1)
B --> F(h2)
C --> G(h3)
C --> H(h4)
```
4. 环形拓扑
`sudo mn --topo=torus,3,3`


5. 
4. 自定义拓扑

python编写文件`file.py`，执行此脚本即可创建脚本中定义的网络拓扑。

`sudo mn --custom file.py --topo mytopo`

### --switch参数

定义Mininet要使用的交换机（默认使用OVSK，即OpenVswitch交换机）

可选参数值有：
1. ovsk
2. lxbr
3. user
4. ivs
5. ovsbr

其中lxbr和ovsk性能更高一些

### --controller参数

定义要使用的控制器，如果没有则使用Mininet中默认的控制器。一般我们使用的控制器都是另外搭建的，如ONOS、ODL等

`sudo mn --controller=remote,ip=10.0.0.1,port=8181`

### --mac参数

让MAC地址易读，即设置交换机的MAC地址。主机MAC地址及IP地址从小到大排序，且设置简单唯一，不仅让机器容易获取，也容易让开发人员很容易识别其ID。

`sudo mn --topo=tree,depth=2,fanout=2,--mac`

## 常用内部交互命令
- help：显示可选参数
- dump：节点信息
- intfs： 网络接口信息
- nodes： 节点信息
- net： 显示链接信息
- links：链路健壮性信息
- pingpair：只验证前两个host的连通性
- pingall：验证所有主机间的通信
- iperf：两个节点间进行iperf tcp带宽测试`iperf h1 h2`
- iperfudp: 两个节点间进行iperf udp带宽测试`iperfudp bw h1 h2`
- link: 禁用或启开启节点间的链路`link s1 s2 up`|`link s1 s2 down`
- dpctl：所有交换机上增删改查流表`dpctl dump-flows`
- xterm：节点开启xterm进入可视化操作界面`xterm h1`
- py：执行python表达式`py net.addSwitch('s3')`