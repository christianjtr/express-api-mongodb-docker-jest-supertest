/* eslint-disable no-console */
import 'dotenv/config';
import Database from './configuration/database';
import Server from './configuration/server';

const main = () => {
  // Database initialization...
  Database.connect();

  // Server initialization...
  const baseURI = `/api/${process.env.API_VERSION}`;
  const port = process.env.PORT || process.env.SERVER_PORT;
  Server.init(baseURI, port);
};

main();
