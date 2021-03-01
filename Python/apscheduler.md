# 什么是apscheduler

[官方文档](https://apscheduler.readthedocs.io/en/stable/userguide.html#)

apscheduler 使用起来十分方便。提供了基于日期、固定时间间隔以及crontab
类型的任务，我们可以在主程序的运行过程中快速增加新作业或删除旧作业，如果把作业存储在数据库中，那么作业的状态会被保存，当调度器重启时，不必重新添加作业，作业会恢复原状态继续执行。

apscheduler 可以当作一个跨平台的调度工具来使用，可以做为 linux 系统crontab 工具或 windows 计划任务程序的替换。注意，apscheduler
不是一个守护进程或服务，它自身不带有任何命令行工具。它主要是要在现有的应用程序中运行，也就是说，apscheduler 为我们提供了构建专用调度器或调度服务的基础模块。

# 安装

`pip install apscheduler`

# 基本概念介绍

APScheduler框架由四种组件组成：`triggers`,`job stores`,`executors`,`schedulers`

## triggers

触发器包含调度逻辑。 每个作业都有自己的触发器，该触发器确定下一步应在何时运行该作业。 除了其初始配置外，触发器完全是无状态的。

## job stores

作业存储器指定了作业被存放的位置，默认情况下作业保存在内存，也可将作业保存在各种数据库中，当作业被存放在数据库中时，它会被序列化，当被重新加载时会反序列化。作业存储器充当保存、加载、更新和查找作业的中间商。在调度器之间不能共享作业存储。

## executors

执行器是将指定的作业（调用函数）提交到线程池或进程池中运行，当任务完成时，执行器通知调度器触发相应的事件。

## schedulers

任务调度器，属于控制角色，通过它配置作业存储器、执行器和触发器，添加、修改和删除任务。调度器协调触发器、作业存储器、执行器的运行，通常只有一个调度程序运行在应用程序中，开发人员通常不需要直接处理作业存储器、执行器或触发器，配置作业存储器和执行器是通过调度器来完成的。

# 示例

## combining任务

仅在周六周天每两小时执行：

```python
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.combining import AndTrigger
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger


def tick():
    print(f'当前时间为：{datetime.now()}')


if __name__ == '__main__':
    trigger = AndTrigger([IntervalTrigger(hours=2), CronTrigger(day_of_week='sat,sun')])
    scheduler = BlockingScheduler()
    scheduler.add_job(tick, trigger)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass

```

仅在周一下午2点和周二下午三点执行：

```python
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.combining import OrTrigger
from apscheduler.triggers.cron import CronTrigger


def tick():
    print(f'当前时间为：{datetime.now()}')


if __name__ == '__main__':
    trigger = OrTrigger([CronTrigger(day_of_week='mon', hour=14), CronTrigger(day_of_week='tue', hour=15)])
    scheduler = BlockingScheduler()
    scheduler.add_job(tick, trigger)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
```

## interval任务

```python
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler


def tick():
    print(f'当前时间为：{datetime.now()}')


if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(tick, 'interval', seconds=3)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
```

## cron任务

```python
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler


def tick():
    print(f'当前时间为：{datetime.now()}')


if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(tick, 'cron', hour=14, minute=50)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
```

## date任务

指定时间点执行

```python
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.date import DateTrigger
from pytz import utc


def tick():
    print(f'当前时间为：{datetime.now()}')


if __name__ == '__main__':
    trigger = DateTrigger('2020-12-22 07:17:00', timezone=utc)
    scheduler = BlockingScheduler()
    scheduler.add_job(tick, trigger)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
```
