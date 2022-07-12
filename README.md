## GROUPOMANIA P7 par Edwin Dervaux

Voici le projet n°7 Groupomania : Créez un réseau social d’entreprise.

### Technologies utilisées :

### BACKEND :
- Node.js, Express, JWT, Multer, Bcrypt, Dotenv
- Base de données : 
- MySQL hébergé sur PlanetScale
- L'ORM utilisé est Prisma 

### FRONTEND : 
- Vue 3
- Vite
- Bootstrap 5

### Pour démarrer le projet : 

1. Cloner le répository
2. Installer les dépendences node.js du dossier Back puis Front via la commande `npm install`
3. Créer un fichier `.env` dans le dossier Back pour que Dotenv permette d'utiliser des variables d'environnement et sécuriser les informations sensibles du backend : 
- PORT=Votre Port
- PASSWORD_JWT=Cryptage du token
- DATABASE_URL=Lien de la base de données
4. Créer un fichier `.env` dans le dossier Front avec les variables suivantes :
- VITE_SERVER_ADDRESS=Adresse du serveur
- VITE_SERVER_PORT=N° du port
5. Demarrer le Front en lançant `npm run dev` dans le terminal
6. Demarrer le Back en lançant `npm run dev` dans le terminal
7. Ce repository a été testé avec une base de données MySQL PlanetScale en ligne


### Voici comment utiliser PRISMA pour interagir avec la base de données :

Le schema de la base de données est dans le fichier `schéma.prisma`

Si vous voulez le charger, vous devez exécuter dans le dossier Back `npx prisma db push` 


Bonne visite à tous !