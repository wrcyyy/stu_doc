Python解释器内置了很多函数和类型，您可以在任何时候使用它们。

| | |内置函数 | | |
|----|----|----|----|----|
| [abs()](#1-1) |delattr()|hash()|memoryview()|set()|
| [all()](#1-2) |dict()|help()|min()|setattr()|
| [any()](#1-3) |dir()|hex()|next()|slice()|
| [ascii()](#1-4) |divmod()|id()|object()|sorted()|
| [bin()](#1-5) |enumerate()|input()|oct()|staticmethod()|
| [bool()](#1-6) |eval()|int()|open()|str()|
| [breakpoint()](#1-7) |exec()|isinstance()|ord()|sum()|
| [bytearray()](#1-8) |filter()|issubclass()|pow()|super()|
| [bytes()](#1-9) |float()|iter()|print()|tuple()|
| [callable()](#1-10) |format()|len()|property()|type()|
| [chr()](#1-11) |fronzenset()|list()|range()|vars()|
| [classmethod()](#1-12) |getattr()|locals()|repr()|zip()|
| [compile()](#1-13) |globals()|map()|reversed()|\_\_import\_\_()|
| [complex()](#1-14) |hasattr()|max()|round()||

# <h2 id="1-1">abs(x)</h2>

返回一个数的绝对值，参数可以是整数、浮点数或任何实现了\_\_abs\_\_()的对象。如果是一个复数，则返回它的模

# <h2 id="1-2">all(iterable)</h2>

如果iterable的所有元素均为真值（或可迭代对象为空）则返回`True`。等价于：

```python
def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True
```

# <h2 id="1-3">any(iterable)</h2>

如果iterable的任一元素为真则返回`True`，iterable为空，则返回`False`。等价于：

```python
def any(iterable):
    for element in iterable:
        if element:
            return True
    return False
```

# <h2 id="1-4">ascii(object)</h2>

就像函数repr()，返回一个对象可打印的字符串，但是repr()返回的字符串中非ASCII编码的字符串，会使用`\x`、`\u`和`\U`来转义。

# <h2 id="1-5">bin(x)</h2>

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

# <h2 id="1-6">class bool([x])</h2>

返回一个布尔值：`True`或者`False`。x使用标准的真值测试过程来转换。如果x是假的或者被省略，返回`False`；其他情况返回`True`。bool类是int的子类。其他类不能继承自它。它只有`True`和`False`两个实例。

# <h2 id="1-7">breakpoint(*args, **kws)</h2>

此函数会在调试时将你陷入调试器中。具体来说，它调用sys.breakpointhook()，直接传递args和kws。默认情况下，`sys.breakpointhook()`调用pdb.set_trace()
且没有参数。在这种情况下，它存粹是一个便利函数，因此你不必显式地导入pdb且键入尽可能少的代码即可进入调试器。但是，sys.breakpointhook()可以设置为其一些函数并被breakpoint()自动调用，以允许进入你想用的调试器。

# <h2 id="1-8">class bytearray([source[,endpoint[,errors]]])</h2>

返回一个新的bytes数组。bytearray类是一个可变序列，包含范围为0<=x<256.它有可变序列大部分常见的方法；同时有bytes类型的大部分方法。

可选形参source可以用不同的方式来初始化数组：

- 如果是一个string，您必须提供encoding参数（errors参数仍是可选的）；bytearray()会使用str.encode()方法来将string转换为bytes
- 如果是一个integer，会初始化大小为该数字的数组，并使用null字节填充
- 如果是一个遵循缓冲区接口的对象，该对象的只读缓冲区将被用来初始化字节数组
- 如果是一个iterable可迭代对象，它的元素的范围必须是`0<=x<256`的整数，它会被用作数组的初始内容

如果没有实参，则创建大小为0的数组

# <h2 id="1-9">class bytes([source[,endpoint[,errors]]])</h2>

返回一个新的“bytes”对象，是一个不可变序列，包含范围为`0<=x<256`的整数。bytes是bytearray的不可变版本；它有其中不改变序列的方法和相同的索引、切片操作。

# <h2 id="1-10">callable(object)</h2>

如果参数object是可调用的就返回True，否则返回False。如果返回True，调用仍可能失败，但如果返回False，则调用object将肯定不会成功。请注意类是可调用的（调用类将返回一个新的实例）；如果实例所属的类有\_\_call\_\_()则它就是可调用的。

# <h2 id="1-11">chr(i)</h2>

返回Unicode码位为整数i的字符的字符串格式。例如，chr(97)返回字符串`a`，chr(8364)返回字符串`€`。这是ord()的逆函数

实参的合法范围是0到1114111（16进制表示是0x10FFF）。如果i超出这个范围，会触发`ValueError`异常。

# <h2 id="1-12">@classmethod</h2>

把一个方法封装成类方法

一个类方法把类自己作为第一个实参，就像一个实例方法把实例自己作为第一个实参。请使用以下习惯来声明类方法：

```python
class C:
	@classmethod
	def f(cls,arg1,arg2,...):...
```

`@classmethod`这样的形式称为函数的`decorator`

类方法的调用可以在类上进行（例如`C.f()`）也可以在实例上进行（例如`C().f()`）。其所属类以外的类实例会被忽略。如果类方法在其所属类的派生类上调用，则该派生类对象会被作为隐含的第一个参数被传入。

# <h2 id="1-13">compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1)</h2>

将`source`编译成代码或者AST对象。代码对象可以被exec()或ecal()执行。`source`可以是常规的字符串、字节字符串，或者AST对象。

`filename`实参需要是代码读取的文件名；如果代码不需要从文件读取，可以传入一些可辨识的值（经常会使用"\<string\>"）

`mod`实参指定了编译代码必用的模式。如果`source`是语句序列，可以是'exec'；如果是单一表达式，可以是'eval'；如果是单个交互式语句，可以是'single'。（在最后一种情况下，如果表达式执行结果不是`None`将会被打印出来。）

可选参数`flags`和`dont_inherit`控制应当激活哪个编译器选项以及应当允许哪个future特性。如果两个都未提供（或者都为0）则代码会应用与调用compile()的代码相同的旗标来编译。如果给出了`flags`参数而未给出`dont_inherit`（或者为0）则会在无论如何都将被使用的旗标之外还会额外使用`flags`参数所指定的编译器选项和future语句。如果`dont_inherit`为非零整数，则只是用`flags`参数--外围代码中的旗标（future特性和编译器选项）会被忽略。

编译器选项和future语句是由比特位来指明的。比特位可以通过一起按位OR来指明多个选项。指明特定future特性所需的比特位可以在\_\_future\_\_模块的\_Feature实例的compiler_flag属性中找到。编译器旗标可以在ast模块中查找带有`PyCF_`前缀的名称。

optimize 实参指定编译器的优化级别；默认值 -1 选择与解释器的 -O 选项相同的优化级别。显式级别为 0 （没有优化；\_\_debug\_\_ 为真）、1 （断言被删除， \_\_debug\_\_ 为假）或 2 （文档字符串也被删除）。

如果编译的源码不合法，此函数会触发 SyntaxError 异常；如果源码包含 null 字节，则会触发 ValueError 异常。

> 注解：在 'single' 或 'eval' 模式编译多行代码字符串时，输入必须以至少一个换行符结尾。 这使 code 模块更容易检测语句的完整性。

# <h2 id="1-14">class complex([real[,imag]])</h2>

返回值为*real + imag\*1j*的复数，或将字符串或数字转换为复数。如果第一个形参是字符串，则它被解释为一个复数，并且函数调用时必须没有第二个形参。第二个形参不能是字符串。每个实参都可以是任意的数值类型（包括复数）。如果省略了`imag`，则默认值为0，构造函数会像int和float一样进行数值转换。如果两个实参都省略，则返回`0j`。

对于一个普通Python对象`x`，`complex(x)`会委托给`x.__complex__()`。如果`__complex__()`未定义则将回退至`__float__()`。如果`__float()__`未定义则将回退至`__index__`。

> 注解：当从字符串转换时，字符串在 + 或 - 的周围必须不能有空格。例如 complex('1+2j') 是合法的，但 complex('1 + 2j') 会触发 ValueError 异常。



# <h2 id="2-1">delattr(object,name)</h2>

