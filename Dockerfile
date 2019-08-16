FROM node:alpine

WORKDIR /app

COPY . .

# RUN echo "https://mirrors.aliyun.com/alpine/latest-stable/main/" > /etc/apk/repositories
# RUN echo "http://dl-cdn.alpinelinux.org/alpine/latest-stable/community" > /etc/apk/repositories

RUN apk add docker

RUN npm i --production

VOLUME ./dockerfiles

CMD node .