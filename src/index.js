const Server = require('./configuration/server');
const MongoDBClient = require('./configuration/database');

MongoDBClient.mongoose
  .connect(MongoDBClient.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB database connected');
  })
  .catch((error) => {
    console.log('Error trying to connect the MongoDB database', error);
    process.exit();
  });

const routes = require('./routes');

Server.use(`/api/${process.env.API_VERSION}`, routes);
Server.set('port', process.env.PORT || process.env.SERVER_PORT);
Server.listen(Server.get('port'), () => {
  console.log(`API server listening on port ${Server.get('port')}`);
});
