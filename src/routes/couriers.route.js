const CourierController = require('../controllers/couriers.controller');

module.exports = (router) => {
  /**
   * @method GET
   * @name get/couriers
   * @description Get all couriers
   * @param {string} path - Express path
   * @param {callback} controller - findAll
   */
  router.get('/couriers', CourierController.findAll);
  /**
   * @method GET
   * @name get/couriers/:courierId
   * @description Get a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - findById
   */
  router.get('/couriers/:courierId', CourierController.findById);
  /**
   * @method POST
   * @name post/couriers
   * @description Create a new courier
   * @param {string} path - Express path
   * @param {callback} controller - create
   */
  router.post('/couriers', CourierController.create);

  /**
   * @method PUT
   * @name put/couriers/:courierId
   * @description Update a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - updateById
   */
  router.put('/couriers/:courierId', CourierController.updateById);
  /**
   * @method DELETE
   * @name delete/couriers/:courierId
   * @description Delete a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - delete
   */
  router.delete('/couriers/:courierId', CourierController.delete);
};
