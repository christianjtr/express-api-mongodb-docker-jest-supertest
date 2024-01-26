const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const couriers = require('./couriers.model')(mongoose);

module.exports = {
  couriers,
};
