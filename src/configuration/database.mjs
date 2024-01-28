/* eslint-disable no-console */
import mongoose from 'mongoose';
import * as models from '../models';
import MockData from '../../data/mock_data.json';

const configuration = {
  URL: `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
  models,
};

const connect = () => {
  const DBConnection = mongoose.connection;

  DBConnection.once('open', () => {
    console.log(`MongoDB database connected: ${configuration.URL}`);
  });

  DBConnection.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
  });

  try {
    mongoose.connect(configuration.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const seedMockData = async () => {
  const { models: { CourierModel } } = configuration;

  await CourierModel.deleteMany({});
  await CourierModel.insertMany(MockData);

  mongoose.connection.close();
};

export default {
  connect,
  seedMockData,
};
