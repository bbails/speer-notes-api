FROM node:18

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install

ADD ./ /src

RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

CMD ["npm", "start"]