FROM node:8

WORKDIR /usr/src/app

ADD https://github.com/sbfkcel/markdown-server/archive/refs/heads/master.zip /usr/src/app/

RUN unzip master.zip

WORKDIR /usr/src/app/markdown-server-master

RUN npm install

EXPOSE 8001

CMD [ "node", "index.js" ]
