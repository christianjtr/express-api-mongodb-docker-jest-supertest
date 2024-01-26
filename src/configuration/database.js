const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const models = require('../models');

module.exports = {
  URL: `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
  mongoose,
  models,
};
