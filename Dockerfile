# Étape 1 : Build l'application Next.js
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers package pour optimiser le cache
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copier le reste du projet
COPY . .  
RUN npm run build && npm prune --production

# Étape 2 : Exécution avec Express pour Prometheus
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .  

# Exposer le port
EXPOSE 3000

# Lancer le serveur Express au lieu de Next.js directement
CMD ["node", "server.js"]
