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