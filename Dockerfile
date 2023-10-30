FROM node:18.18.1 AS build
RUN apt-get update -y && apt-get install -y ca-certificates
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile
COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.build.json /app/tsconfig.build.json
COPY ./prisma /app/prisma
RUN npx prisma generate
RUN yarn build

FROM node:18.18.1-slim
RUN apt-get update -y && apt-get install -y openssl
COPY --from=build /app/dist /dist/
COPY --from=build /app/package.json /package.json
COPY --from=build /app/node_modules /node_modules/
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
CMD ["node", "/dist/main.js"]
EXPOSE 8080
