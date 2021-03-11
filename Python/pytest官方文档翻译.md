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

