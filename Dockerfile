FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia o restante do projeto
COPY . .

# Instala os browsers do Playwright
RUN npx playwright install --with-deps

# Adiciona xvfb para criar um servidor gráfico virtual
RUN apt-get update && apt-get install -y xvfb

# Executa testes no modo headed usando xvfb
CMD ["xvfb-run", "--auto-servernum", "--", "npx", "playwright", "test", "--headed"]