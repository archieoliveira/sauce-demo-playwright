FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

RUN npm ci

# Ensure playwright binary is executable (fixes Windows permission issues)
RUN chmod +x node_modules/.bin/playwright

# Copia o restante do projeto
COPY . .

# Executa testes no modo headed usando xvfb
CMD ["npx", "playwright", "test"]