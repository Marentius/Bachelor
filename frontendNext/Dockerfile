FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV AWS_EC2_METADATA_DISABLED=TRUE
ENV TZ=Europe/Oslo

EXPOSE 3000

CMD npm run dev