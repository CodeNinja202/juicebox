const express = require('express');
const server = express();
const apiRouter = require('./api');
const PORT = 3000;
server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  
  server.post('/api/users/register', () => {});
  server.post('/api/users/login', () => {});
  server.delete('/api/users/:id', () => {});

  const { client } = require('./db');
  client.connect();
server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });