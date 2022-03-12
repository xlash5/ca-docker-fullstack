FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /api

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]