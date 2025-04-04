// server.js
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  console.log('✅ Next.js app is prepared.');

  // Example custom route
  server.get('/path/:param', (req, res) => {
    const param = req.params.param;
    console.log(`📥 Requête reçue avec le paramètre : ${param}`);
    res.send(`Paramètre reçu : ${param}`);
  });

  // Default catch-all handler for all other routes (VERY important!)
  server.all('*', (req, res) => {
    return handle(req, res); // Let Next.js handle the request
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://localhost:${port}`);
  });
});
