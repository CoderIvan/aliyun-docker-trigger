# 阿里云容器服务触发器

![Node.js CI](https://github.com/CoderIvan/aliyun-docker-trigger/workflows/Node.js%20CI/badge.svg)

## 需要

1. ubuntu
1. docker

## 部署服务

1. clone该仓库，创建镜像
1. 使用Docker部署该镜像
  ![image](https://user-images.githubusercontent.com/7960859/70210213-16d2a880-176d-11ea-8b6c-7e586d60d832.png)
  1. 挂载`/var/run/docker.sock`至容器中的`/var/run/docker.sock`，使用容器中的Docker可以控制宿主机的Docker
  1. 挂载`~/.docker/config.json`至容器中的`/root/.docker/config.json`，使用容器拥有pull阿里镜像的权限
  1. 挂载`./dockerfiles`至容器中的`/app/dockerfiles`，告诉容器中的服务该维护哪些容器

## 环境变量配置
![image](https://user-images.githubusercontent.com/7960859/86327006-1ce22680-bc75-11ea-83da-a785fcfa48e2.png)

EMAIL_TRANSPORT_USER: 发送邮件的邮箱名
EMAIL_TRANSPORT_PASS: 发送邮件的邮箱密码
EMAIL_SUBSCRIBERS: 默认订阅者(多个时，以`,`分隔)

## 配置阿里云的触发器

#### 让镜像随代码变更自动构建
  ![image](https://user-images.githubusercontent.com/7960859/70210507-d3c50500-176d-11ea-9392-de10a4302d6b.png)
  1. 当对应分支有代码提交后会自动触发构建
  1. 以上图为例，`branch`:`mqtt-broker`为测试网版本的分支，每次提交代码会自动触发构建，并创建`test`版本的镜像

#### 为镜像添加触发器
  ![image](https://user-images.githubusercontent.com/7960859/70210781-8dbc7100-176e-11ea-8864-7c2c27d656ff.png)
  ![image](https://user-images.githubusercontent.com/7960859/70210749-72516600-176e-11ea-9a2b-f3643122432f.png)
  1. 配置触发器URL，这是测试网暴露的`aliyun-docker-trigger`服务
  1. 触发方式选择`Tag触发`，Tag选择你的部署的镜像版本，以上一点`自动构建`为例，镜像版本为`test`，随着上面每完成一次`test`版本镜像的`build`完成而触发

## 配置aliyun-docker-trigger的触发器

#### 配置dockerfiles文件夹
  ![image](https://user-images.githubusercontent.com/7960859/70211372-dd4f6c80-176f-11ea-933a-1b409a2ef312.png)
  1. 在dockerfiles下创建层级文件夹
  1. 文件夹名对应为`镜像名`和`TAG名`，例如参考上面的步骤，我需要创建mqtt-broker/test
  1. 在上一步的文件夹下创建docker-compose.ymal文件

#### 配置Email接受部署成功的邮件提示
  ![image](https://user-images.githubusercontent.com/7960859/70211923-45eb1900-1771-11ea-8fc0-a5840f2cf69d.png)
  ![image](https://user-images.githubusercontent.com/7960859/70211959-60bd8d80-1771-11ea-8dab-568bb6046487.png)

## 触发原理
1. aliyun触发器触发后，会给指定的地址（以上为例：`http://www.dbjtech.com:8000/`）发送请求，并携带`镜像名`(以上为例：mqtt-broker)与`Tag名`(以上为例：test)
1. aliyun-docker-trigger服务，`镜像名`(以上为例：mqtt-broker)与`Tag名`(以上为例：test)，找`dockerfiles`是否有该文件目录(以上为例：找`mqtt-broker/test`文件夹是否存在)
1. 如果存在，则获取`docker-compose.yml`文件
1. 执行`docker pull registry.cn-qingdao.aliyuncs.com/dbjtech/${name}:${tag}`
1. 执行`docker stack deploy -c ${file} ${name} ${tag} --with-registry-auth`
1. 检查`email.js`是否存在，存在则发送邮件