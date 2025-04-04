const express = require('express');
const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Log lorsque l'application est prête
  console.log('Next.js app is ready.');

  // Route par défaut pour gérer toutes les requêtes (y compris celles du dossier app)
  server.all('/path/:param', (req, res) => {
    console.log(`Requête reçue avec le paramètre : ${req.params.param}`); // Log du paramètre
    const param = req.params.param;
    res.send(`Paramètre reçu : ${param}`);
  });

  // Lancement du serveur
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4000');
  });
});
