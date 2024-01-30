/* eslint-disable no-console */
import mongoose from 'mongoose';
import * as models from '../models';
import MockData from '../../data/mock_data.json';

const configuration = {
  URL: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
  models,
};

const connect = async () => {
  try {
    await mongoose.connect(configuration.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB database connected: ${configuration.URL}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const closeConnection = () => {
  mongoose.connection.close();
};

const seedMockData = async () => {
  const { models: { Courier } } = configuration;
  try {
    await Courier.deleteMany({});
    await Courier.insertMany(MockData);
  } catch (error) {
    console.error(new Error(error));
  }
};

export default {
  connect,
  closeConnection,
  seedMockData,
};
