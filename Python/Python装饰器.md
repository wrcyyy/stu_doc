# 什么是装饰器

装饰器本质上是一个Python函数，它可以让其他函数在不需要做任何代码变动的前提下增加额外功能，装饰器的返回值也是一个函数对象。

它经常用于有切面需求的场景，比如：插入日志、性能测试、事务处理、缓存、权限校验等场景。

装饰器是解决这类问题的绝佳设计，有了装饰器，我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用。

# 普通装饰器

```python
def logger(func):
    def wrapper(*args, **kwargs):
        print('开始执行：{}函数'.format(func.__name__))
        func(*args, **kwargs)
        print('执行完毕！')

    return wrapper


@logger
def add(a, b):
    print(f'{a}+{b}={a + b}')


if __name__ == '__main__':
    add(100, 102)
```

# 带参数的装饰器

```python
def say_hello(country):
    def wrapper(func):
        def deco(*args, **kwargs):
            if country == 'china':
                print('你好！')
            elif country == 'america':
                print('hello')
            else:
                return
            func(*args, **kwargs)

        return deco

    return wrapper


@say_hello('china')
def xiao_ming():
    ...


@say_hello('america')
def jack():
    ...


if __name__ == '__main__':
    xiao_ming()
    jack()
```

# 不带参数的类装饰器

```python
class Logger:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print(f'[INFO]: 正在执行{self.func.__name__}')
        return self.func(*args, **kwargs)


@Logger
def say(something):
    print(f'say {something}')


if __name__ == '__main__':
    say('测试')
```

# 带参数的类装饰器

```python
class Logger:
    def __init__(self, level='INFO'):
        self.level = level

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            print(f'[{self.level}]:正在执行{func.__name__}')
            func(*args, **kwargs)

        return wrapper


@Logger(level='WARNING')
def say(something):
    print(f'say {something}')


if __name__ == '__main__':
    say('测试')
```
