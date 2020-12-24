# 什么是allure
allure是一个支持多语言的灵活且轻量级的测试报告框架，能够自动收集测试过程中的数据，生成丰富且精美的测试报告。更多信息请阅读[官方文档](https://docs.qameta.io/allure/)
# allure环境搭建：
  1. 不同平台安装allure的方法不同，这里仅介绍windows平台下allure的安装步骤。其它平台请阅读[allure官方文档](https://docs.qameta.io/allure/)进行操作
  2. 官方提供的安装方法可能会受网络环境影响而安装失败，可选择在[GitHub仓库](https://github.com/allure-framework/allure2 )下载文件并安装allure2
  3. Windows环境下可以用以下步骤进行安装
        1. 安装scoop，使用**管理员权限**打开powershell窗口，输入命令`Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')`
        2. 如果安装不成功则运行`Set-ExecutionPolicy RemoteSigned -scope CurrentUser`，运行成功后重新执行第一步
        3. scoop安装成功后控制台会输出`Scoop was installed successfully!`
        4. 执行`scoop install allure`进行allure的安装
        5. allure安装成功后控制台会输出`'allure' (2.13.1) was installed successfully!`
# allure中的各种数据
allure报告中的部分数据可以通过报告中的json文件进行修改
## 环境信息
我们可以通过修改环境信息，展示我们想展示的一些数据，例如测试服务器地址、版本信息、测试工程师等。

该文件位于`allure-report/widgets/environment.json`，通过修改此文件内容就能将自定义数据展示到报告中了。文件内容格式如下：
```json
[
    {
        "name": "协议",
        "values": [
            "http"
        ]
    },
    {
        "name": "域名",
        "values": [
            "beta.inconnect.inhand.design"
        ]
    },
    {
        "name": "测试账户",
        "values": [
            "wangrc@inhand.com.cn"
        ]
    },
    {
        "name": "版本号",
        "values": [
            "0.11.0"
        ]
    }
]
```
## 历史趋势
在`jenkins`中通过插件中的配置能够自动的保存历史信息并在下一次生成报告时使用。但是在本地或者`gitlab-ci`中执行测试代码时往往没有很好的办法自动将历史数据展示到报告中。

`allure generate {results_dir} -o {report_dir} -c`命令用于报告的生成；`results_dir`为运行测试代码时生成的allure的运行文件目录，`report_dir`为最终报告的存储目录。

在需要展示历史趋势时只需要将每次运行后的`report_dir/history`目录下的文件复制到`results_dir/history`目录下就可以了，allure生成报告时会自动读取此处的数据并生成历史趋势。

经过调研，通过以下步骤实现了对历史数据存储和展示：
1. 从数据库中读取历史数据，生成对应文件保存在`results_dir/history`目录下
2. 运行测试脚本并生成报告
2. 读取`report_dir/history`目录下的文件，并将每个文件信息存储在数据库中，在下一次运行时读取