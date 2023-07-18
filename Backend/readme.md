### LANCEMENT DEL'APPLICATION ###

  => ouvrir le dossier dans un IDE
    => ouvrir un terminal
    => taper: 
          => cd ./Frontend
          => npm install
          => npm start



### CONNEXION A LA BASE DE DONNÉES

Pour se connecter à la base de données, remplacez dans le fichier "./app.js" à la ligne 13, le code suivant: 

=> " + process.env.PASSWORD_MONGODB + " (avec les guillemets)

par: 8Q4h9BeHpqDMsJam
puis: 
  => ouvrir un autre terminal à la source du projet
    => taper: 
          => cd ./Backend
          => yarn install
          => yarn nodemon ./server.js



### AUTHENTIFICATION ###

Pour pouvoir se connecter avec un utilisateur et valider l'authentification, remplacez dans le fichier: 

=> "./middlewares/auth.js" à la ligne 8
=> "./controllers/user.js à lal igne 44

le code suivant:

  => process.env.JWT_TOKEN

par : "$2y$10$muFgBCk7Zk6/xduORx1jWeMCdIbhX49SfCTQz3hPPzeFYlu4grLPG" (avec les guillemets)



