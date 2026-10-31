# Этап 1: Сборка зависимостей и Next.js 15
FROM node:22.12.0-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Этап 2: Минимальный production runtime
FROM node:22.12.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Создаем директорию для базы данных SQLite с правами на запись
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Копируем публичные файлы и результат standalone сборки
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# КОПИРУЕМ СКОМПИЛИРОВАННЫЕ NODE_MODULES ДЛЯ НАТИВНЫХ ДРАЙВЕРОВ SQLITE И КРИПТОГРАФИИ PAYLOAD
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]