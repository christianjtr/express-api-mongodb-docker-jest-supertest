/* eslint-disable no-console */
import 'dotenv/config';
import database from './database/db';
import app from './app';

// Database initialization...
const initializeDB = async () => {
  try {
    await database.connect();
    if (process.env.SEED_MOCKED_DATA === 'true') {
      await database.seedMockData();
    }
    console.info('[Info]: Database initialized');
  } catch (error) {
    console.error(error);
  }
};

// Server initialization...
const port = process.env.PORT || process.env.SERVER_PORT;
app.set('port', port);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.info(`[Info]: API app listening on port ${port}`);
    initializeDB();
  });
}

export default app;
