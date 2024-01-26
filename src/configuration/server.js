import express, { json, urlencoded } from 'express';
import morgan from 'morgan';

const Server = express();

Server.use(morgan('dev'));
Server.use(json());
Server.use(
  urlencoded({
    extended: false,
  }),
);

export default Server;
