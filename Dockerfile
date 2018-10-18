FROM keymetrics/pm2:10-alpine

RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /app
RUN npm install
CMD ["npm", "start"]
