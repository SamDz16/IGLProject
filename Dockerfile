FROM node:12

#create app directory
WORKDIR /app

#Install app dependecies
COPY package*.json ./

RUN npm install

#Copy the application source code in the working directory we've just created
COPY . .

#Expose port and start application
EXPOSE 7000

CMD ["npm" , "start"]
