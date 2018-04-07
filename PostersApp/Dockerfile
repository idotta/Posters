FROM node:8.9-alpine

EXPOSE 3000

WORKDIR /usr/src/app

# use nodemon for development
RUN npm install --global nodemon

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

#CMD npm install && npm start
CMD npm install & nodemon /usr/src/bin/www