import mongoose from 'mongoose';
import models from '../models';

mongoose.Promise = global.Promise;

export default {
  URL: `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
  mongoose,
  models,
};
