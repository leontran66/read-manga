FROM node:current
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY ["client/package.json", "client/package-lock.json", "./client/"]
RUN npm install
RUN npm install --prefix client
COPY . .
RUN npm run build
RUN npm run build --prefix client
ENV NODE_ENV production
CMD ["npm", "start"]
