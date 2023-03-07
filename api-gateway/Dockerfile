FROM node:18.14-alpine
RUN npm install -g npm@8.5.5
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD ./ /var/www/gateway
RUN npm install -g @nestjs/cli
RUN npm install
#CMD npm run build && npm run start:prod
CMD npm run start
