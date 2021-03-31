// Dependencies
const http = require('http');
const fs = require('fs');

// Set our port to 8080
const PORT = 8080;

// Create a function for handling the requests and responses coming into our server
const handleRequest = (req, res) => {
  // Capture the url the request is made to
  const path = req.url;

  // When we visit different urls, read and respond with different files
  switch (path) {
    case '/notes':
      return fs.readFile(`${__dirname}/public/notes.html`, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });

    // default to rendering index.html, if none of above cases are hit
    default:
      return fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
  }
};

// Create our server
const server = http.createServer(handleRequest);

// Starts our server
server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});