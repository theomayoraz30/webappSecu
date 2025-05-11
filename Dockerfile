# Étape 1 : Construire l'application Vue.js
FROM node:22 AS build

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json .env ./

RUN npm install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Builder l'application en mode production
RUN npm run build

# Étape 2 : Servir avec NGINX
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire par défaut de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copier un fichier de configuration NGINX personnalisé (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]