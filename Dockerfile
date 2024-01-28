FROM node:14
WORKDIR /app
ENV PORT 3001
EXPOSE ${PORT}
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install
COPY . /app
CMD ["npm", "run", "server:start"]