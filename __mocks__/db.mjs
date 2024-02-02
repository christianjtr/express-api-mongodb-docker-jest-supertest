import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer({
  instance: {
    port: process.env.MONGODB_PORT,
    ip: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_DB,
  },
});

const connectDB = async () => {
  await mongoServer.start();

  const URI = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  await mongoose.connect(URI, mongooseOpts);
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
};

export {
  connectDB,
  disconnectDB,
};
