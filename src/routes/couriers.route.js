import { Router } from 'express';
import * as CourierController from '../controllers/couriers.controller';

const router = Router();

// #region CRUD Operations...

/**
   * @method GET
   * @name get/couriers
   * @description Get all couriers
   * @param {string} path - Express path
   * @param {callback} controller - findAll
   */
router.get('/', CourierController.findAll);

/**
   * @method GET
   * @name get/couriers/:courierId
   * @description Get a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - findById
   */
router.get('/:courierId', CourierController.checkId, CourierController.findById);

/**
   * @method POST
   * @name post/couriers
   * @description Create a new courier
   * @param {string} path - Express path
   * @param {callback} controller - create
   */
router.post('/', CourierController.validateRecordPaylodad, CourierController.create);

/**
   * @method PUT
   * @name put/couriers/:courierId
   * @description Update a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - updateById
   */
router.put('/:courierId', CourierController.checkId, CourierController.validateRecordPaylodad, CourierController.updateById);

/**
   * @method DELETE
   * @name delete/couriers/:courierId
   * @description Delete a courier by Id
   * @param {string} path - Express path
   * @param {callback} controller - deleteById
   */
router.delete('/:courierId', CourierController.checkId, CourierController.deleteById);

// #endregion

// #region Management Operations...

/**
   * @method GET
   * @name get/couriers/lookup/:capacityRequired
   * @description Get couriers where [max capacity] >= [capacity required]
   * @param {string} path - Express path
   * @param {callback} controller - lookupByAvailableSpace
   */
router.get('/lookup/:capacityRequired', CourierController.validateLookupQueryParams, CourierController.lookupByAvailableSpace);

// #endregion

export default router;
