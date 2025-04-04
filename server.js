// Import required packages
const express = require('express');
const next = require('next');

// Create a Next.js app instance
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

// Prepare Next.js app (this is necessary before using it in a custom server)
app.prepare().then(() => {
  // Create an Express server to handle requests
  const server = express();

  // Basic route to test if the server is running correctly
  // This is a simple GET route for the root URL, just returning "Hello World"
  server.get('/', (req, res) => {
    res.send('Hello World'); // Respond with a simple message
  });

  // Dynamic route example to handle parameterized URLs
  // This handles requests like /path/somevalue where 'somevalue' is the dynamic parameter
  server.all('/path/:param', (req, res) => {
    // Log the received parameter for debugging purposes
    const param = req.params.param;
    console.log(`Requête reçue avec le paramètre : ${param}`); // Logging the parameter value
    res.send(`Paramètre reçu : ${param}`); // Send the parameter back in the response
  });

  // Start the server on port 4000
  // This is the port we will access the app in the browser or through API calls
  server.listen(4000, (err) => {
    if (err) throw err; // If there is an error, throw it
    console.log('> Ready on http://localhost:4000'); // Log a message indicating the server is ready
  });
});
