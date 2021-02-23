# 简介

> MongoDB是一个开源的基于分布式文件存储的数据库系统；高负载情况下可以通过扩展阶段来保证服务器的性能。
>
> MongoDB将数据以键值对的方式进行存储，MongoDB 文档类似于 JSON 对象

# 服务部署

> 创建docker-compose.yml文件

```yaml
version: '3.1'
services:
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    volumes:
      - /mnt/data/mongo/:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: 1qaz2wsx

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: 1qaz2wsx3edc
```

> 执行docker-compose up -d 启动服务

# 基本命令

