/* eslint-disable no-console */
import 'dotenv/config';
import Database from './configuration/database';
import Server from './configuration/server';

const main = () => {
  // Database initialization...
  Database.connect();
  if (process.env.SEED_MOCKED_DATA) {
    Database.seedMockData();
  }

  // Server initialization...
  const baseURI = `/api/${process.env.API_VERSION}`;
  const port = process.env.PORT || process.env.SERVER_PORT;
  Server.init(baseURI, port);
};

main();
