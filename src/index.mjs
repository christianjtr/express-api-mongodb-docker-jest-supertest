/* eslint-disable no-console */
// import Server from './configuration/server';
// import Database from './configuration/database';
// import routes from './routes';

console.log(111222333);

// // Database initialization...

// Database.mongoose
//   .connect(Database.URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.info('MongoDB database connected');
//   })
//   .catch((error) => {
//     console.info('Error trying to connect the MongoDB database', error);
//     process.exit();
//   });

// // Server initialization...

// const port = Server.get('port');

// Server.use(`/api/${process.env.API_VERSION}`, routes);
// Server.set('port', process.env.PORT || process.env.SERVER_PORT);
// Server.listen(port, () => {
//   console.info(`API server listening on port ${port}`);
// });
