# pull official base image
FROM node:16-buster-slim
# set work directory
WORKDIR /usr/src/app

# copy files into docker container
COPY . .

# install dependencies
RUN yarn install

# build app
RUN yarn build

# expose port
EXPOSE 3000
ENV PORT 3000

# run app on start
CMD ["yarn", "dev"]