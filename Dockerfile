FROM node:16-alpine

RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev libpng-dev git
RUN npm install -g npm@8.9.0

WORKDIR /home/node/app

CMD ["npm", "run", "serve"]