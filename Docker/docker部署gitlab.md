# 简介
# 部署安装
* 设置环境变量`export GITLAB_HOME=/srv/gitlab`
* 创建`docker-compose.yml`文件：
    ```yaml
    web:
      image: 'gitlab/gitlab-ee:latest'
      restart: always
      hostname: 'gitlab.example.com'
      environment:
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'https://gitlab.example.com'
          # 此处添加gitlab.rb中的配置，每条配置单独一行
      ports:
        - '80:80'
        - '443:443'
        - '22:22'
      volumes:
        - '$GITLAB_HOME/config:/etc/gitlab'
        - '$GITLAB_HOME/logs:/var/log/gitlab'
        - '$GITLAB_HOME/data:/var/opt/gitlab'
    ```
- 启动容器`docker-compose up -d`

# 配置
* 语言切换
在`Settings->Preferences->Localization`进行语言切换
