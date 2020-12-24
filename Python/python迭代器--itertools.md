# 无穷迭代器
- count()
```python
from itertools import count
# 返回从10开始间隔为2的值
for x in count(10, 2):
    print(x)
```
- cycle()循环返回可迭代对象中的元素，`cycle('ABCD') --> A B C D A B C D ...`
- repeat()重复无限次或n次，`repeat(10, 3) --> 10 10 10`
# 常规迭代器
- accumulate()自动求和，`	
accumulate([1,2,3,4,5]) --> 1 3 6 10 15`
- chain()字符串拆分，`chain('ABC', 'DEF') --> A B C D E F`
- chain.from_iterable()字符串拆分，`chain.from_iterable(['123', '25']) --> 1 2 3 2 5`
- compress()压缩，`compress('ABCDEF', [1,0,1,0,1,1]) --> A C E F`
- dropwhile()删除首次不符合条件之前的数据，`dropwhile(lambda x: x<5, [1,4,6,4,1]) --> 6 4 1`
- filterfalse()返回判断为假的数据，`filterfalse(lambda x: x%2, range(10)) --> 0 2 4 6 8`
- groupby()根据条件进行分组
```python
from itertools import groupby
groups = []
uniquekeys = []
info = [(1, '黎明'), (3, '陈小春'), (2, '刘德华')]
data = sorted(info, key=lambda x: x[0])
for i, j in groupby(data, lambda x: x[0] > 1):
    groups.append(list(j))
    uniquekeys.append(i)
print(groups)
print(uniquekeys)
```
- islice()切片，`islice('ABCDEFG', 2, None) --> C D E F G`
- starmap()将可迭代对象按照指定函数进行运算
```
info = [(x, y) for x, y in zip(range(1, 10), range(11, 20))]
print(list(starmap(lambda x, y: x * y, info)))
```
- takewhile()取出条件为真的数据并过滤,判断为false时停止取值，`takewhile(lambda x: x < 5, [1, 4, 6, 4，3, 1]) --> 1 4`
- tee()从一个可迭代对象中返回n个独立的迭代对象
```python
from itertools import tee
info = [1, 2, 3]
x, y, z = tee(info, 3)
print(list(x))
print(list(y))
print(list(z))
```
- zip_longest()将字符串按顺序组合，`	
zip_longest('ABCD', 'xy', fillvalue='-') --> Ax By C- D-`
# 排列组合迭代器
- product()笛卡尔积，`product('AB', repeat=2) --> AA AB BA BB`
- permutations()排列组合无重复元素，`permutations('AB', 2) --> AB BA`
- combinations()有序排列组合无重复元素，`combinations('ABCD', 2) --> AB AC AD BC BD CD`
- combinations_with_replacement()有序排列组合有重复元素，`combinations_with_replacement('ABCD', 2) --> AA AB AC AD BB BC BD CC CD DD`