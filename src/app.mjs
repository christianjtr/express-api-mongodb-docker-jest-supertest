/* eslint-disable no-console */
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import errorLoggerHandler from './middleware/errorLoggerHandler.middleware';
import routes from './routes';

const app = express();
const baseURI = `/api/${process.env.API_VERSION}`;

app.use(morgan('dev'));
app.use(json());
app.use(
  urlencoded({
    extended: false,
  }),
);

app.use(baseURI, routes);
app.use(`${baseURI}/docs`, swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.api.specs.yml')));
app.use(errorLoggerHandler);

export default app;
