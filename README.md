# 阿里云容器服务触发器

### 需要
1. 安装docker
1. 安装PM2
1. 安装nodejs

### 部署服务
1. clone该仓库
1. 在项目根目录创建并配置dockerfiles文件夹
1. 在项目根目录配置config.js
1. 使用PM2部署当前项目

### 需要触发的镜像配置

##### 配置阿里云镜像的构建
![QQ图片20190724174101](https://user-images.githubusercontent.com/7960859/62024400-66292b00-b207-11e9-87a5-56fcba119519.png)
1. 配置代码变更自动构建镜像，建议只针对特定分支名进行

##### 配置阿里云镜像的触发器
![QQ图片20190724174137](https://user-images.githubusercontent.com/7960859/62024401-675a5800-b207-11e9-926d-400ea9b3a885.png)
1. 配置触发器URL
1. 选择要触发的TAG，TAG需与上一步配置的一致

##### 配置dockerfiles
![QQ图片20190724180143](https://user-images.githubusercontent.com/7960859/62024402-69241b80-b207-11e9-8694-f8a0f679d2b1.png)
1. 在dockerfiles下创建层级文件夹
1. 文件夹名对应为仓库名和TAG名，例如aliyun-docker-trigger/example，就建立文件夹dockerfiles/aliyun-docker-trigger/example
1. 在仓库名/TAG名下创建docker-compose.ymal文件