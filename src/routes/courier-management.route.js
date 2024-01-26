const CourierController = require('../controllers/couriers.controller');

module.exports = (router) => {
  /**
   * @method GET
   * @name get/courier-management/lookup
   * @description Get couriers where [max capacity] >= [capacity required]
   * @param {string} path - Express path
   * @param {callback} controller - findAll
   */
  router.get('/courier-management/lookup', CourierController.lookupByAvailableSpace);
};
