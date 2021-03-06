# top

top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器。

top显示系统当前的进程和其他状况,是一个动态显示过程,即可以通过用户按键来不断刷新当前状态.如果在前台执行该命令,它将独占前台,直到用户终止该程序为止.
比较准确的说,top命令提供了实时的对系统处理器的状态监视.它将显示系统中CPU最“敏感”的任务列表.该命令可以按CPU使用.内存使用和执行时间对任务进行排序；而且该命令的很多特性都可以通过交互式命令或者在个人定制文件中进行设定.

## 参数含义

```
top - 01:06:48 up  1:22,  1 user,  load average: 0.06, 0.60, 0.48
Tasks:  29 total,   1 running,  28 sleeping,   0 stopped,   0 zombie
Cpu(s):  0.3% us,  1.0% sy,  0.0% ni, 98.7% id,  0.0% wa,  0.0% hi,  0.0% si
Mem:    191272k total,   173656k used,    17616k free,    22052k buffers
Swap:   192772k total,        0k used,   192772k free,   123988k cached

PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
1379 root      16   0  7976 2456 1980 S  0.7  1.3   0:11.03 sshd
14704 root      16   0  2128  980  796 R  0.7  0.5   0:02.72 top
1 root      16   0  1992  632  544 S  0.0  0.3   0:00.90 init
2 root      34  19     0    0    0 S  0.0  0.0   0:00.00 ksoftirqd/0
3 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 watchdog/0
```

统计信息区前五行是系统整体的统计信息。第一行是任务队列信息，同 uptime 命令的执行结果。其内容如下：

```
01:06:48    当前时间
up 1:22    系统运行时间，格式为时:分
1 user    当前登录用户数
load average: 0.06, 0.60, 0.48    系统负载，即任务队列的平均长度。三个数值分别为 1分钟、5分钟、15分钟前到现在的平均值。
```

第二、三行为进程和CPU的信息。当有多个CPU时，这些内容可能会超过两行。内容如下：

```
total 进程总数
running 正在运行的进程数
sleeping 睡眠的进程数
stopped 停止的进程数
zombie 僵尸进程数
Cpu(s): 
0.3% us 用户空间占用CPU百分比
1.0% sy 内核空间占用CPU百分比
0.0% ni 用户进程空间内改变过优先级的进程占用CPU百分比
98.7% id 空闲CPU百分比
0.0% wa 等待输入输出的CPU时间百分比
0.0%hi：硬件CPU中断占用百分比
0.0%si：软中断占用百分比
0.0%st：虚拟机占用百分比
```

最后两行为内存信息。内容如下：

```
Mem:
191272k total    物理内存总量
173656k used    使用的物理内存总量
17616k free    空闲内存总量
22052k buffers    用作内核缓存的内存量
Swap: 
192772k total    交换区总量
0k used    使用的交换区总量
192772k free    空闲交换区总量
123988k cached    缓冲的交换区总量,内存中的内容被换出到交换区，而后又被换入到内存，但使用过的交换区尚未被覆盖，该数值即为这些内容已存在于内存中的交换区的大小,相应的内存再次被换出时可不必再对交换区写入。
```

进程信息区统计信息区域的下方显示了各个进程的详细信息。首先来认识一下各列的含义。

```
序号  列名    含义
a    PID     进程id
b    PPID    父进程id
c    RUSER   Real user name
d    UID     进程所有者的用户id
e    USER    进程所有者的用户名
f    GROUP   进程所有者的组名
g    TTY     启动进程的终端名。不是从终端启动的进程则显示为 ?
h    PR      优先级
i    NI      nice值。负值表示高优先级，正值表示低优先级
j    P       最后使用的CPU，仅在多CPU环境下有意义
k    %CPU    上次更新到现在的CPU时间占用百分比
l    TIME    进程使用的CPU时间总计，单位秒
m    TIME+   进程使用的CPU时间总计，单位1/100秒
n    %MEM    进程使用的物理内存百分比
o    VIRT    进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
p    SWAP    进程使用的虚拟内存中，被换出的大小，单位kb。
q    RES     进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
r    CODE    可执行代码占用的物理内存大小，单位kb
s    DATA    可执行代码以外的部分(数据段+栈)占用的物理内存大小，单位kb
t    SHR     共享内存大小，单位kb
u    nFLT    页面错误次数
v    nDRT    最后一次写入到现在，被修改过的页面数。
w    S       进程状态(D=不可中断的睡眠状态,R=运行,S=睡眠,T=跟踪/停止,Z=僵尸进程)
x    COMMAND 命令名/命令行
y    WCHAN   若该进程在睡眠，则显示睡眠中的系统函数名
z    Flags   任务标志，参考 sched.h
```

默认情况下仅显示比较重要的 PID、USER、PR、NI、VIRT、RES、SHR、S、%CPU、%MEM、TIME+、COMMAND 列。可以通过下面的快捷键来更改显示内容。

更改显示内容通过 f 键可以选择显示的内容。按 f 键之后会显示列的列表，按 a-z 即可显示或隐藏对应的列，最后按回车键确定。 按 o 键可以改变列的显示顺序。按小写的 a-z 可以将相应的列向右移动，而大写的 A-Z
可以将相应的列向左移动。最后按回车键确定。 按大写的 F 或 O 键，然后按 a-z 可以将进程按照相应的列进行排序。而大写的 R 键可以将当前的排序倒转。

## 命令使用

top使用格式：top [-] [d] [p] [q] [c] [C] [S] [s]  [n]

参数说明

```
d 指定每两次屏幕信息刷新之间的时间间隔。当然用户可以使用s交互命令来改变之。 
p 通过指定监控进程ID来仅仅监控某个进程的状态。 
q 该选项将使top没有任何延迟的进行刷新。如果调用程序有超级用户权限，那么top将以尽可能高的优先级运行。 
S 指定累计模式 
s 使top命令在安全模式中运行。这将去除交互命令所带来的潜在危险。 
i 使top不显示任何闲置或者僵死进程。 
c 显示整个命令行而不只是显示命令名 
```

其他实用命令 下面介绍在top命令执行过程中可以使用的一些交互命令。从使用角度来看，熟练的掌握这些命令比掌握选项还重要一些。这些命令都是单字母的，如果在命令行选项中使用了s选项，则可能其中一些命令会被屏蔽掉。

```
Ctrl+L 擦除并且重写屏幕。 
h或者? 显示帮助画面，给出一些简短的命令总结说明。 
k       终止一个进程。系统将提示用户输入需要终止的进程PID，以及需要发送给该进程什么样的信号。一般的终止进程可以使用15信号；如果不能正常结束那就使用信号9强制结束该进程。默认值是信号15。在安全模式中此命令被屏蔽。 
i 忽略闲置和僵死进程。这是一个开关式命令。 
q 退出程序。 
r 重新安排一个进程的优先级别。系统提示用户输入需要改变的进程PID以及需要设置的进程优先级值。输入一个正值将使优先级降低，反之则可以使该进程拥有更高的优先权。默认值是10。 
S 切换到累计模式。 
s 改变两次刷新之间的延迟时间。系统将提示用户输入新的时间，单位为s。如果有小数，就换算成m s。输入0值则系统将不断刷新，默认值是5 s。需要注意的是如果设置太小的时间，很可能会引起不断刷新，从而根本来不及看清显示的情况，而且系统负载也会大大增加。 
f或者F 从当前显示中添加或者删除项目。 
o或者O 改变显示项目的顺序。 
l 切换显示平均负载和启动时间信息。 
m 切换显示内存信息。 
t 切换显示进程和CPU状态信息。 
c 切换显示命令名称和完整命令行。 
M 根据驻留内存大小进行排序。 
P 根据CPU使用百分比大小进行排序。 
T 根据时间/累计时间进行排序。 
W 将当前设置写入~/.toprc文件中。这是写top配置文件的推荐方法。
```

常用操作：

```
top   //每隔5秒显式所有进程的资源占用情况
top -d 2  //每隔2秒显式所有进程的资源占用情况
top -c  //每隔5秒显式进程的资源占用情况，并显示进程的命令行参数(默认只有进程名)
top -p 12345 -p 6789//每隔5秒显示pid是12345和pid是6789的两个进程的资源占用情况
top -d 2 -c -p 123456 //每隔2秒显示pid是12345的进程的资源使用情况，并显式该进程启动的命令行参数
```

# iostat 查看磁盘读写性能

## 硬盘读写性能

```
iostat -d -k 1 10 
Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda              14.54       417.21       368.06 15719357562 13867444535
dm-0            104.60       415.64       366.87 15660312829 13822621684
dm-1              0.69         1.57         1.19   59041280   44822840
```

参数说明

```
-d：显示某块具体硬盘，这里没有给出硬盘路径就是默认全部了
-k：以KB为单位显示
1：统计间隔为1秒
10：共统计10次的
tps：该设备每秒的传输次数（Indicate the number of transfers per second that were issued to the device.）。“一次传输”意思是“一次I/O请求”。多个逻辑请求可能会被合并为“一次I/O请求”。“一次传输”请求的大小是未知的。
kB_read/s：每秒从设备（drive expressed）读取的数据量；kB_wrtn/s：每秒向设备（drive expressed）写入的数据量；kB_read：读取的总数据量；kB_wrtn：写入 的总数量数据量；这些单位都为Kilobytes。
```

## 查看设备使用率和响应时间

```
iostat -d -k -x 1 10
Device:         rrqm/s   wrqm/s   r/s   w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await  svctm  %util
sda               4.87    85.88  8.41  6.14   417.21   368.06   107.98     0.02    8.92   2.73   3.97
dm-0              0.00     0.00 12.89 91.72   415.64   366.87    14.96     0.06    1.70   0.38   3.95
dm-1              0.00     0.00  0.39  0.30     1.57     1.19     8.00     0.02   35.25   1.45   0.10
```

参数说明

```
rrqm/s：每秒这个设备相关的读取请求有多少被Merge了（当系统调用需要读取数据的 时候，VFS将请求发到各个FS，如果FS发现不同的读取请求读取的是相同Block的数据，FS会将这个请求合并Merge）；
wrqm/s：每秒这个 设备相关的写入请求有多少被Merge了。
r/s：每秒响应的读取请求数；
w/s：每秒响应的写入请求数；
rkB/s：每秒读取的数据量；
wkB/s：每秒写入的数据量
await：每一个IO请求的处理的平均时间（单位是微秒）。这里可以理解为IO的响应时 间，一般地系统IO响应时间应该低于5ms，如果大于10ms就比较大了。
%util：在统计时间内所有处理IO时间，除以总共统计时间。例如，如果统计间隔1秒，该 设备有0.8秒在处理IO，而0.2秒闲置，那么该设备的%util = 0.8/1 = 80%，所以该参数暗示了设备的繁忙程度。一般地，如果该参数是100%表示设备已经接近满负荷运行了（当然如果是多磁盘，即使%util是100%，因 为磁盘的并发能力，所以磁盘使用未必就到了瓶颈）。
```

## 查看CPU状态信息

```
iostat -c 1 10
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
1.28     0.00      0.43           0.84     0.00         97.45
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
0.77     0.00      0.26           0.00     0.00         98.98
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
13.71     0.00     2.28            0.00     0.00         84.01
```