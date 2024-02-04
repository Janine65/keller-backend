# NodeJS Version 16
FROM guergeiro/pnpm:18-8
ENV NODE_ENV=production

WORKDIR /usr/src
COPY ["package.json", "pnpm-lock.yaml", "./"]
# RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .

EXPOSE 3000

RUN chown -R node /usr/src
USER node

# Cmd script
CMD ["pnpm", "start"]
