FROM mcr.microsoft.com/playwright:v1.44.1-jammy

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Fix permissions after all files are in place
RUN chmod +x node_modules/.bin/playwright

CMD ["npx", "playwright", "test"]