ARG BUILDIMGTAG=24-alpine
ARG FINALIMAGE=node:24-alpine

FROM node:$BUILDIMGTAG AS build

RUN  corepack enable
RUN  yarn set version 4.11.0

ENV APP=/app
USER node
WORKDIR $APP

COPY --chown=node package.json yarn.lock ./
COPY --chown=node .yarnrc.yml ./

RUN yarn install --immutable && \
    rm -rf "$(yarn cache dir)"

COPY --chown=node . .

RUN yarn typecheck
# RUN yarn lint
RUN yarn tsc
RUN yarn test
RUN yarn prepare

FROM $FINALIMAGE AS final
RUN  corepack enable
RUN  yarn set version 4.11.0

ENV NODE_ENV=production
ENV APP=/app
USER node
WORKDIR $APP

COPY --from=base --chown=node:node "$APP/package.json" ./
COPY --from=base --chown=node:node "$APP/yarn.lock" ./
# COPY --from=base --chown=node:node "$APP/dist/" ./

RUN yarn install --immutable && \
    rm -rf "$(yarn cache dir)"

RUN yarn workspaces focus --production

EXPOSE 8081

CMD ["yarn", "start"]