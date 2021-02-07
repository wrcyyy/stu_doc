# 自动更新镜像工具--Watchtower
Watchtower 监视运行容器并监视这些容器最初启动时的镜像有没有变动。当 Watchtower 检测到一个镜像已经有变动时，它会使用新镜像自动重新启动相应的容器。

## 快速开始
只需要执行以下命令就可启动`watchtower`：
```shell
docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower
```

## 选项参数
```text
$ docker run --rm containrrr/watchtower -h

Watchtower automatically updates running Docker containers whenever a new image is released.
More information available at https://github.com/containrrr/watchtower/.

Usage:
  watchtower [flags]

Flags:
  -a, --api-version string                          api version to use by docker client (default "1.25")
  -c, --cleanup                                     remove previously used images after updating
  -d, --debug                                       enable debug mode with verbose logging
      --enable-lifecycle-hooks                      Enable the execution of commands triggered by pre- and post-update lifecycle hooks
  -h, --help                                        help for watchtower
  -H, --host string                                 daemon socket to connect to (default "unix:///var/run/docker.sock")
      --http-api                                    Runs Watchtower in HTTP API mode, so that image updates must to be triggered by a request
      --http-api-token string                       Sets an authentication token to HTTP API requests.
  -S, --include-stopped                             Will also include created and exited containers
  -i, --interval int                                poll interval (in seconds) (default 86400)
  -e, --label-enable                                watch containers where the com.centurylinklabs.watchtower.enable label is true
  -m, --monitor-only                                Will only monitor for new images, not update the containers
      --no-color                                    Disable ANSI color escape codes in log output
      --no-pull                                     do not pull any new images
      --no-restart                                  do not restart any containers
      --no-startup-message                          Prevents watchtower from sending a startup message
      --notification-email-delay int                Delay before sending notifications, expressed in seconds
      --notification-email-from string              Address to send notification emails from
      --notification-email-server string            SMTP server to send notification emails through
      --notification-email-server-password string   SMTP server password for sending notifications
      --notification-email-server-port int          SMTP server port to send notification emails through (default 25)
      --notification-email-server-tls-skip-verify   Controls whether watchtower verifies the SMTP server's certificate chain and host name.
                                                    Should only be used for testing.
      --notification-email-server-user string       SMTP server user for sending notifications
      --notification-email-subjecttag string        Subject prefix tag for notifications via mail
      --notification-email-to string                Address to send notification emails to
      --notification-gotify-tls-skip-verify         Controls whether watchtower verifies the Gotify server's certificate chain and host name.
                                                    Should only be used for testing.
      --notification-gotify-token string            The Gotify Application required to query the Gotify API
      --notification-gotify-url string              The Gotify URL to send notifications to
      --notification-msteams-data                   The MSTeams notifier will try to extract log entry fields as MSTeams message facts
      --notification-msteams-hook string            The MSTeams WebHook URL to send notifications to
      --notification-slack-channel string           A string which overrides the webhook's default channel. Example: #my-custom-channel
      --notification-slack-hook-url string          The Slack Hook URL to send notifications to
      --notification-slack-icon-emoji string        An emoji code string to use in place of the default icon
      --notification-slack-icon-url string          An icon image URL string to use in place of the default icon
      --notification-slack-identifier string        A string which will be used to identify the messages coming from this watchtower instance (default "watchtower")
      --notification-template string                The shoutrrr text/template for the messages
      --notification-url stringArray                The shoutrrr URL to send notifications to
  -n, --notifications strings                        notification types to send (valid: email, slack, msteams, gotify, shoutrrr)
      --notifications-level string                  The log level used for sending notifications. Possible values: panic, fatal, error, warn, info or debug (default "info")
      --remove-volumes                              remove attached volumes before updating
      --revive-stopped                              Will also start stopped containers that were updated, if include-stopped is active
      --rolling-restart                             Restart containers one at a time
  -R, --run-once                                    Run once now and exit
  -s, --schedule string                             the cron expression which defines when to update
      --scope string                                Defines a monitoring scope for the Watchtower instance.
  -t, --stop-timeout duration                       timeout before a container is forcefully stopped (default 10s)
  -v, --tlsverify                                   use TLS and verify the remote
      --trace                                       enable trace mode with very verbose logging - caution, exposes credentials

```

## 自动清除旧的镜像
官方给出的默认启动命令在长期使用后会堆积非常多的标签为`none`的旧镜像，如果放任不管会占用大量的磁盘空间。要避免这种情况可以加入`--cleanup`或`-c` 选项，这样每次更新都会把旧的镜像清理掉。
```shell
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -c
```

## 选择性自动更新
假设我们只想更新`nginx`、`redis`这两个容器，我们可以把容器名称追加到启动命令的最后面
```shell
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -c nginx redis
```

## 设置单个容器自动更新特征
给容器中添加`com.centurylinklabs.watchtower.enable`这个`LABEL`并设置它的值为`false`，或者在启动命令中加入`--label com.centurylinklabs.watchtower.enable=false`参数Watchtower 将永远忽略它的更新，即使它包含在自动更新列表中
```text
docker run -d --name ubuntu --restart always --label com.centurylinklabs.watchtower.enable=false ubuntu
```
当容器启动命令中加入`--label com.centurylinklabs.watchtower.enable=true`参数，并且给`Watchtower`加上`--label-enable`选项时，`Watchtower`将只更新这些包含此参数的容器。
```text
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -c \
    --label-enable
```
> `--label-enable`可以简写为`-e`：

```text
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -ce
```

## 设置自动更新检查频率
默认情况下`Watchtower`每 5 分钟会轮询一次，如果你觉得这个频率太高了可以使用如下选项来控制更新检查的频率，但二者只能选择其一。

- `--interval`或`-i`设置更新检测时间间隔，单位为秒。如每小时检查一次：

    ```text
    docker run -d \
        --name watchtower \
        --restart unless-stopped \
        -v /var/run/docker.sock:/var/run/docker.sock \
        containrrr/watchtower -c \
        --interval 3600
    ```
- `--schedule`或`-s`设置定时检测更新时间。格式为6字段Cron表达式，即第一位为秒。如每天凌晨2点检查一次更新：
    ```text
    docker run -d \
        --name watchtower \
        --restart unless-stopped \
        -v /var/run/docker.sock:/var/run/docker.sock \
        containrrr/watchtower -c \
        --schedule "0 0 2 * * *"
    ```