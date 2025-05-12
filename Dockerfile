FROM node:20.19.1-alpine3.21
ADD . /todo
WORKDIR /todo
# RUN npm install