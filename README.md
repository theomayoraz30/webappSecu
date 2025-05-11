# Déploiement en production - Application Vue.js avec Docker

## Environnement
Le fichier .env contient des variables d’environnement utilisées pour configurer l’application selon le contexte (développement ou production).

### Variables
```VITE_ENVIRONMENT=development```
Cette variable indique que l’application tourne en mode développement. Cela peut activer certaines fonctionnalités utiles aux développeurs.

```VITE_API_URL=http://localhost:8000```
Il s’agit de l’URL de l’API à laquelle l’application frontend va envoyer ses requêtes. Ici, elle pointe vers un serveur local, ce qui est typique en développement.

## Docker
Ce projet utilise Docker pour builder une application Vue.js et la servir avec NGINX.

### 1. Construire l'image Docker

```bash
docker build -t secu-vue .
```

### 2. Lancer le conteneur

```bash
docker run -d -p 80:80 --name secu-container secu-vue
```

L'application sera accessible sur `http://localhost`.

## Nettoyage

```bash
docker stop secu-container
docker rm secu-container
docker rmi secu-vue
```
