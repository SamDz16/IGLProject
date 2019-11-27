FROM node:12
WORKDIR /server
COPY package*.json /server/
RUN npm install
COPY . /server
EXPOSE 7000
CMD node server.js
