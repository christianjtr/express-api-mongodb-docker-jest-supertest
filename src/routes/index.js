const express = require('express');

const router = express.Router();

require('./couriers.route')(router);
require('./courier-management.route')(router);

module.exports = router;
