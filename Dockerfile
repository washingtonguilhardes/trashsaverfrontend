FROM node:14.19-bullseye AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 500000

FROM node:14.19-bullseye AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build && yarn install --production --ignore-scripts --prefer-offline --network-timeout 500000

FROM node:14.19-bullseye AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 80


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE $PORT

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
