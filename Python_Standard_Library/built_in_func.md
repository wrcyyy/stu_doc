Python解释器内置了很多函数和类型，您可以在任何时候使用它们。

| | |内置函数 | | |
|----|----|----|----|----|
| [abs()](#1) |delattr()|hash()|memoryview()|set()|
| [all()](#2) |dict()|help()|min()|setattr()|
| [any()](#3) |dir()|hex()|next()|slice()|
| [ascii()](#4) |divmod()|id()|object()|sorted()|
| [bin()](#5) |enumerate()|input()|oct()|staticmethod()|
| [bool()](#6) |eval()|int()|open()|str()|
| [breakpoint()](#7) |exec()|isinstance()|ord()|sum()|
| bytearray() |filter()|issubclass()|pow()|super()|
| bytes() |float()|iter()|print()|tuple()|
| callable() |format()|len()|property()|type()|
| chr() |fronzenset()|list()|range()|vars()|
| classmethod() |getattr()|locals()|repr()|zip()|
| compile() |globals()|map()|reversed()|\_\_import\_\_()|
| complex() |hasattr()|max()|round()||

# <h2 id="1">abs(x)</h2>

返回一个数的绝对值，参数可以是整数、浮点数或任何实现了\_\_abs\_\_()的对象。如果是一个复数，则返回它的模

# <h2 id="2">all(iterable)</h2>

如果iterable的所有元素均为真值（或可迭代对象为空）则返回`True`。等价于：

```python
def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True
```

# <h2 id="3">any(iterable)</h2>

如果iterable的任一元素为真则返回`True`，iterable为空，则返回`False`。等价于：

```python
def any(iterable):
    for element in iterable:
        if element:
            return True
    return False
```

# <h2 id="4">ascii(object)</h2>

就像函数repr()，返回一个对象可打印的字符串，但是repr()返回的字符串中非ASCII编码的字符串，会使用`\x`、`\u`和`\U`来转义。

# <h2 id="5">bin(x)</h2>

将一个正无数转变为一个前缀为“0b”的二进制字符串，结果是一个合法的Python表达式。如果x不是Python的`int`对象，那它需要定义\_\_index\_\_()方法返回一个整数。例子：

```python
>> > bin(3)
'0b11'
>> > bin(-10)
'-0b1010'
```

如果不一定需要前缀`0b`，还可以使用如下方法：

```python
>> > format(14, '#b'), format(14, 'b')
('0b1110', '1110')
>> > f'{14:#b}', f'{14:b}'
('0b1110', '1110')
```

# <h2 id="6">class bool([x])</h2>

返回一个布尔值：`True`或者`False`。x使用标准的真值测试过程来转换。如果x是假的或者被省略，返回`False`；其他情况返回`True`。bool类是int的子类。其他类不能继承自它。它只有`True`和`False`两个实例。

# <h2 id="7">breakpoint(*args, **kws)</h2>

此函数会在调试时将你陷入调试器中。具体来说，它调用sys.breakpointhook()，直接传递args和kws。默认情况下，`sys.breakpointhook()`调用pdb.set_trace()
且没有参数。在这种情况下，它存粹是一个便利函数，因此你不必显式地导入pdb且键入尽可能少的代码即可进入调试器。但是，sys.breakpointhook()可以设置为其一些函数并被breakpoint()自动调用，以允许进入你想用的调试器。

# <h2 id="8">class bytearray([source[,endpoint[,errors]]])</h2>

返回一个新的bytes数组。bytearray类是一个可变序列，包含范围为0<=x<256.它有可变序列大部分常见的方法；同时有bytes类型的大部分方法。

可选形参source可以用不同的方式来初始化数组：

- 如果是一个string，您必须提供encoding参数（errors参数仍是可选的）；bytearray()会使用str.encode()方法来将string转换为bytes
- 如果是一个integer，会初始化大小为该数字的数组，并使用null字节填充
- 如果是一个遵循缓冲区接口的对象，该对象的只读缓冲区将被用来初始化字节数组
- 如果是一个iterable可迭代对象，它的元素的范围必须是`0<=x<256`的整数，它会被用作数组的初始内容

如果没有实参，则创建大小为0的数组

# <h2 id="9">class bytes([source[,endpoint[,errors]]])</h2>

返回一个新的“bytes”对象，是一个不可变序列，包含范围为`0<=x<256`的整数。bytes是bytearray的不可变版本；它有其中不改变序列的方法和相同的索引、切片操作。

# <h2 id="10">callable(object)</h2>

如果参数object是可调用的就返回True，否则返回False。如果返回True，调用仍可能失败，但如果返回False，则调用object将肯定不会成功。请注意类是可调用的（调用类将返回一个新的实例）；如果实例所属的类有\_\_call\_\_()则它就是可调用的。

# <h2 id="11">chr(i)</h2>

返回Unicode码位为整数i的字符的字符串格式。例如，chr(97)返回字符串`a`，chr(8364)返回字符串`€`。这是ord()的逆函数

实参的合法范围是0到1114111（16进制表示是0x10FFF）。如果i超出这个范围，会触发`ValueError`异常。

