[Toc]
# python语言规范
[参考文档](https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/contents/)
## Lint
## 导入
## 包
## 异常
## 全局变量
## 嵌套/局部/内部类或函数
## 列表推导
## 默认迭代器和操作符
## 生成器
## lambda函数
## 条件表达式
## 默认参数值
## 属性
## True/False的求值
## 过时的语言特性
## 词法作用域
## 函数与方法装饰器
## 线程
## 威力过大的特性
# python风格规范
## 分号
## 行长度
## 括号
## 缩进
## 空行
## 空格
## Shebang
## 注释
## 类
## 字符串
## 文件和sockets
## TODO注释
## 导入格式
## 语句
## 访问控制
## 命名
```text
module_name
package_name
ClassName
method_name
ExceptionName
function_name
GLOBAL_VAR_NAME
instance_var_name
function_parameter_name
local_var_name
```
### 应该避免的名称
1. 单字符名称, 除了计数器和迭代器.
2. 包/模块名中的连字符(-)
3. 双下划线开头并结尾的名称(Python保留, 例如__init__)

### 命名约定
1. 所谓”内部(Internal)”表示仅模块内可用, 或者, 在类内是保护或私有的.
2. 用单下划线(_)开头表示模块变量或函数是protected的(使用from module import *时不会包含).
3. 用双下划线(__)开头的实例变量或方法表示类内私有.
4. 将相关的类和顶级函数放在同一个模块里. 不像Java, 没必要限制一个类一个模块.
5. 对类名使用大写字母开头的单词(如CapWords, 即Pascal风格), 但是模块名应该用小写加下划线的方式(如lower_with_under.py). 尽管已经有很多现存的模块使用类似于CapWords.py这样的命名, 但现在已经不鼓励这样做, 因为如果模块名碰巧和类名一致, 这会让人困扰.

python之父Guido推荐的规范
类型|公共|内部
----|---|---
Modules | lower_with_under | _lower_with_under
Packages | lower_with_under |  
Classes | CapWords | _CapWords
Exceptions | CapWords |  
Functions | lower_with_under() | _lower_with_under()
Global/Class Constants | CAPS_WITH_UNDER | _CAPS_WITH_UNDER
Global/Class Variables | lower_with_under | _lower_with_under
Instance Variables | lower_with_under | _lower_with_under (protected) or __lower_with_under (private)
Method Names | lower_with_under() | _lower_with_under() (protected) or __lower_with_under() (private)
Function/Method Parameters | lower_with_under |  
Local Variables | lower_with_under |  
## Main