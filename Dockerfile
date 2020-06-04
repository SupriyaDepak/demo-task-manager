FROM node:10
RUN mkdir -p /app
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package.json

ENV NODE_ENV=staging

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

COPY . .

EXPOSE 3000

# ARG node_env

CMD [ "node", "index.js" ]
