# 简介
# 部署安装
* 设置环境变量`export GITLAB_HOME=/srv/gitlab`
* 创建`docker-compose.yml`文件：
    ```yaml
    web:
      image: 'gitlab/gitlab-ee:latest'
      restart: always
      hostname: '10.5.51.69'
      environment:
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://10.5.51.69'
          # 此处添加gitlab.rb中的配置，每条配置单独一行
          gitlab_rails['gitlab_shell_ssh_port'] = 10022
      ports:
        - '10.5.51.69:80:80'
        - '10.5.51.69:10022:22'
      labels:
        - com.centurylinklabs.watchtower.enable:true
      volumes:
        - '$GITLAB_HOME/config:/etc/gitlab'
        - '$GITLAB_HOME/logs:/var/log/gitlab'
        - '$GITLAB_HOME/data:/var/opt/gitlab'
    ```
- 启动容器`docker-compose up -d`

# 配置
* 语言切换
在`Settings->Preferences->Localization`进行语言切换
