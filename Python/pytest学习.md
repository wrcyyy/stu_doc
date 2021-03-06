# 简介

[官方文档](https://docs.pytest.org/en/latest/contents.html)

[精简文档](https://learning-pytest.readthedocs.io/zh/latest/)

# Fixture

## 什么是Fixture

Fixture是一些函数，pytest 会在执行测试函数之前（或之后）加载运行它们

最常用的用法是在fixture中定义我们在测试用例执行前和执行后要做的操作。

例如我们在执行用例前获取一个邮编：

```python
# test_postcode.py
@pytest.fixture()
def postcode():
    return '010'


def test_postcode(postcode):
    assert postcode == '010'
```

更多时候，我们希望一个固件可以在更大程度上复用，这就需要对固件进行集中管理。Pytest 使用文件`conftest.py`集中管理固件。

*需要注意的是：在复杂的项目中，可以在不同的目录层级定义`conftest.py`，其作用域为其所在的目录和子目录。*

## 预处理和后处理

很多时候我们需要在测试用例执行前准备数据或者建立连接，测试结束后清除数据或者连接。

当有大量重复的操作时，最好的办法就是用Fixture来执行预处理和后处理操作

pytest使用`yield`关键词将Fixture分为两部分，`yield`之前的代码会在测试用例执行前执行；`yield`之后的代码则在测试用例执行后执行

示例：

```python
# test_db.py
@pytest.fixture()
def db():
    print('Connection successful')
    yield
    print('Connection closed')


def test_search(db):
    assert 1 == 1
```

## Fixture作用域

Fixture的作用是为了抽离出重复的工作和方便复用，为了更精细化控制固件（比如只想对数据库访问测试脚本使用自动连接关闭的固件），pytest 使用作用域来进行指定固件的使用范围。

在定义Fixture时，通过`scope`参数声明作用域：

```
function    函数级，每条测试用例都会执行一次该Fixture（默认值为function）
class   类级别，每个测试类执行一次，测试类内的用例都可以使用
module  模块级，每个模块执行一次，模块内的函数和方法都可以使用
session 会话级，一次测试只执行一次，所有函数和方法都可以使用
```

## 重命名

固件的名称默认为定义时的函数名，如果不想使用默认，可以通过`name`选项指定名称：

```python
# test_rename.py
@pytest.fixture(name='age')
def calculate_average_age():
    return 28


def test_age(age):
    assert age == 28
```

## 参数化

假设现在有一批 API 需要测试对不同数据库的支持情况（对所有数据库进行相同操作），最简单的方法就是针对每个数据库编写一个测试用例，但这包含大量重复代码，如数据库的连接、关闭，查询等。

# pytest.ini文件配置

- `console_output_style`参数用于指定控制台打印格式，默认为`progress`,可选参数：

    - `classic`pytest经典输出
    - `progress`在经典输出的基础上增加了进度显示
    - `count`显示已完成的数量，而不是百分比
- `testpaths`指定测试用例根目录，告诉`pytest`仅运行该目录下的用例。指定多个目录需要用空格分隔

## 日志设置

- `log_format`指定日志格式，参考值：`%(asctime)s %(levelname)s %(message)s`
- `log_date_format`指定日志中时间的显示格式，参考值：`%Y-%m-%d %H:%M:%S`
- `log_level`指定日志等级，参考值`INFO`

示例：

```
# content of pytest.ini
[pytest]
testpaths = TestCase
addopts = -s
          -q
          -n=1
          --reruns=2
          --reruns-delay=5
          --alluredir=Report/allure-results
          --clean-alluredir
log_format = %(asctime)s %(levelname)s %(message)s
log_level = INFO
log_cli = True
log_date_format = %Y-%m-%d %H:%M:%S
```

# 插件

# pytest多线程插件`pytest-xdist`

该插件能够多线程运行用例，只需要在`pytest.ini`文件中加入`-n=auto`参数即可。

[官方文档](https://pypi.org/project/pytest-xdist/)

# 常用方法示例

## 如何改变命令行默认参数值

如果你每次运行pytest时都需要传入相同的运行参数，那么可以将这部分参数写入到配置文件中

```text
# pytest.ini
[pytest]
addopts = -ra -q
```

除此之外，还可以通过添加环境变量的方式进行设置：`export PYTEST_ADDOPTS="-v"`

进行上述操作后，用户执行命令`pytest -m slow`就会等效于：`pytest -ra -q -v -m slow`

> 需要注意的是，如果参数冲突则以最后一个为准，此处-v参数将会覆盖-q参数

## 根据不同的命令行参数，改变传入函数的值

假设我们某条用例需要依赖于命令行选项：

```python
# test_sample.py
def test_answer(cmdopt):
    if cmdopt == "type1":
        print('first')
    elif cmdopt == 'type2':
        print('second')
    assert 0
```

为此，我们需要添加一个命令行选项，并通过fixture函数提供`cmdopt`：

```python
# conftest.py
def pytest_addoption(parser):
    """
    增加运行参数
    :param parser:
    :return:
    """
    parser.addoption("--cmdopt", action="store", default="type1", help="my option: type1 or type2")


@pytest.fixture
def cmdopt(request):
    return request.config.getoption("--cmdopt")
```

然后分别运行以下命令并查看结果：

```
$ pytest -q test_sample.py
$ pytest -q --cmdopt=type2 test_sample.py
```

从结果中可以看到，测试用例能够按照不同的命令行参数运行

## 根据命令行参数控制跳过哪些测试用例

我们使用`--runslow`参数来控制标记了`pytest.mark.slow`的测试用例

```python
# conftest.py
def pytest_addoption(parser):
    """
    增加运行参数
    :param parser:
    :return:
    """
    parser.addoption(
        "--runslow", action="store_true", default=False, help="run slow tests"
    )


def pytest_configure(config):
    config.addinivalue_line("markers", "slow: mark test as slow to run")


def pytest_collection_modifyitems(config, items):
    if config.getoption("--runslow"):
        return
    skip_slow = pytest.mark.skip(reason="need --runslow option to run")
    for item in items:
        if "slow" in item.keywords:
            item.add_marker(skip_slow)
```

接下来我们编写两条测试用例

```python
# test_module.py
import pytest

def test_func_fast():
    pass


@pytest.mark.slow
def test_func_slow():
    pass
```

执行`pytest -rs`后就可以发现`test_func_slow`这条用例被跳过了

执行`pytest --runslow`则两条用例都会执行

## 编写集成良好的断言助手

可以使用`pytest.fail`标记使测试失败并显示特定消息。 

如果在辅助函数中的某个位置设置了`__tracebackhide__`选项，则测试支持功能将不会显示在跟踪中

```python
import pytest

def checkconfig(x):
    __tracebackhide__ = True
    if not hasattr(x, "config"):
        pytest.fail("not configured: {}".format(x))


def test_something():
    checkconfig(42)
```

> `__tracebackhide__`参数会影响`pytest`的显示，除非使用`--full-trace`命令行参数，否则不会显示`checkconfig`函数

如果你只想隐藏一部分异常，则可以将`__tracebackhide__`设置为可获取异常信息的可调用对象：

```python
import operator
import pytest


class ConfigException(Exception):
    pass


def checkconfig(x):
    __tracebackhide__ = operator.methodcaller("errisinstance", ConfigException)
    if not hasattr(x, "config"):
        raise ConfigException("not configured: {}".format(x))


def test_something():
    checkconfig(42)
```

## 向测试报告标题中添加信息

```python
# conftest.py

def pytest_report_header(config):
    return "project deps: mylib-1.1"
```

## 测试报告后处理

如果需要在创建测试报告时进行一些定制化的处理，就需要创建一个钩子函数并在创建测试报告时调用。

下边的代码会将失败用例的信息输出到文件中

```python
# conftest.py
import pytest
import os.path


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    # 这里只处理实际执行失败的用例，跳过setup/teardown
    if rep.when == "call" and rep.failed:
        mode = "a" if os.path.exists("failures") else "w"
        with open("failures", mode) as f:
            if "tmpdir" in item.fixturenames:
                extra = f" ({item.funcargs['tmpdir']})"
            else:
                extra = ""

            f.write(rep.nodeid + extra + "\n")

```

