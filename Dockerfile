FROM node:alpine

WORKDIR /app

COPY . .

RUN apk add tzdata --update --no-cache \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" /etc/localtime \
  && apk del tzdata

RUN apk add docker

RUN npm i --production && npm cache clean --force

CMD node .