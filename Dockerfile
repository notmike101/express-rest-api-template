FROM node:14.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

CMD [ "pm2-runtime", "/usr/src/app/bin/www" ]
