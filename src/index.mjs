/* eslint-disable no-console */
import 'dotenv/config';

import Server from './configuration/server';
import Database from './configuration/database';
import routes from './routes';

// Database initialization...

Database.mongoose
  .connect(Database.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.info('MongoDB database connected');
  })
  .catch((error) => {
    console.info('Error trying to connect the MongoDB database', error);
    process.exit();
  });

// Server initialization...

const port = process.env.PORT || process.env.SERVER_PORT;

Server.use(`/api/${process.env.API_VERSION}`, routes);
Server.set('port', port);
Server.listen(port, () => {
  console.info(`API server listening on port ${port}`);
});
