FROM node:18.18.1-slim AS build
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.build.json /app/tsconfig.build.json
COPY ./prisma /app/prisma
RUN npx prisma generate
RUN npm run build

FROM node:18.18.1-slim
RUN apt-get update -y && apt-get install -y openssl
COPY --from=build /app/dist /dist/
COPY --from=build /app/package.json /package.json
COPY --from=build /app/node_modules /node_modules/
CMD ["node", "/dist/src/main.js"]
EXPOSE 8080
