[参考链接](https://sourcery.ai/blog/explaining-refactorings-1/)

代码简洁易懂不仅易于维护，更能避免不必要的问题

今天总结一下重构python项目的几个思路

# 合并嵌套的if条件

合并前：

```python
if a:
    if b:
        return c
```

合并后：

```python
if a and b:
    return c
```

# 将重复的代码移到条件语句之外

```python
if x > 10:
    total = x * 10
    res = f'Total:{total}'
else:
    total = x * 100
    res = f'Total:{total}'
```

更改后：

```python
if x > 10:
    total = x * 10
else:
    total = x * 100
res = f'Total:{total}'
```

# 将内部循环中的yield替换为yield from

```python
def get_content(entry):
    for x in entry:
        yield x
# 返回一个generator
```

替换后

```python
def get_content(entry):
    yield from entry
# 返回一个generator
```

# 使用any而不是循环

```python
found = False
for thing in things:
    if thing == other_thing:
        found = True
        break
```

替换后：

```python
found = any(thing == other_thing for thing in things)
```

# 用[]替换list()

创建列表时直接使用`[]`而不是`list()`

测试创建速度：

```shell
python3 -m timeit "x = list()"
python3 -m timeit "x = []"
```

*同样的原因和性能表现，使用{}替代dict()*

# 将重复执行的语句移出for/while循环

```python
res = []
for x in numbers:
    i = 'tester'
    res.append(i * x)
```

更改后：

```python
res = []
i = 'tester'
for x in numbers:
    res.append(i * x)
```

# 将for循环转换为list/dictionary/set 表达式

```python
cubes = []
for i in range(20):
    cubes.append(i ** 3)
```

更改后：

```python
cubes = [i ** 3 for i in range(20)]
```

# 用增量赋值替换赋值

```python
count = count + other_value
```

更改后：

```python
count += other_value
```

# 用if表达式替换if语句

```python

if condition:
    x = 1
else:
    x = 2
```

更改后：

```python
x = 1 if condition else 2
```