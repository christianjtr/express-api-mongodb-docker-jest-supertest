/* eslint-disable no-console */
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import errorLoggerHandler from '../middleware/errorLoggerHandler.middleware';
import routes from '../routes';

const server = express();

const init = (baseURI, port) => {
  server.use(morgan('dev'));
  server.use(json());
  server.use(
    urlencoded({
      extended: false,
    }),
  );

  server.use(baseURI, routes);
  server.use(errorLoggerHandler);
  server.set('port', port);
  server.listen(port, () => {
    console.info(`API server listening on port ${port}`);
  });
};

export default {
  init,
};
