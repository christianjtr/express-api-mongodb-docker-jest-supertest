const express = require('express');
const morgan = require('morgan');

const Server = express();

Server.use(morgan('dev'));
Server.use(express.json());
Server.use(
  express.urlencoded({
    extended: false,
  }),
);

module.exports = Server;
