FROM node:12-slim
WORKDIR /app
COPY . .
RUN npm ci --only=production
CMD ["node", "index.js"]