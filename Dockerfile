FROM node:lts-alpine AS INSTALL_MODULES
RUN apk update --no-cache
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY ["client/package.json", "client/package-lock.json", "./client/"]
RUN npm install npm@latest
RUN npm install && npm install --prefix client

FROM node:lts-alpine AS BUILD_IMAGE
WORKDIR /app
COPY --from=INSTALL_MODULES /app/node_modules ./node_modules
COPY --from=INSTALL_MODULES /app/client/node_modules ./client/node_modules
COPY . .
RUN npm run build
RUN npm prune --production && npm prune --prefix client --production

FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY ["client/package.json", "client/package-lock.json", "./client/"]
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/client/build ./client/build
COPY --from=BUILD_IMAGE /app/client/node_modules ./client/node_modules
ENV NODE_ENV production
CMD ["npm", "start"]
