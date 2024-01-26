const {
  couriers: Couriers,
} = require('../models');

module.exports = {
  /**
   * @method findAll
   * @description Get all couriers
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  findAll: async (req, res) => {
    try {
      const params = req.query || {};
      return res.status(200).send(await Couriers.find(params));
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || 'Error occurred when getting couriers.',
        },
      });
    }
  },
  /**
   * @method findById
   * @description Get a courier by Id
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  findById: async (req, res) => {
    try {
      const courierByIdData = await Couriers.find({
        id: req.params.courierId,
      });
      if (!courierByIdData) {
        return res.status(404).send({
          error: {
            message: `Courier not found with Id = ${req.params.courierId}.`,
          },
        });
      }
      return res.status(200).send(courierByIdData);
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || `Error retrieving courier with Id = ${req.params.courierId}.`,
        },
      });
    }
  },
  /**
   * @method create
   * @description Create a new courier
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  create: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          error: {
            message: 'Bad request: courier content is empty.',
          },
        });
      }

      const courierData = await new Couriers({
        ...req.body,
      }).save();

      return res.status(201).send(courierData);
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || 'Error occurred when creating a courier.',
        },
      });
    }
  },
  /**
   * @method updateById
   * @description Update a courier by Id
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  updateById: async (req, res) => {
    try {
      if (!req.params.courierId) {
        return res.status(400).send({
          error: {
            message: 'Bad request: courierId must be provided in order to update the record.',
          },
        });
      }
      if (!req.body) {
        return res.status(400).send({
          error: {
            message: 'Bad request: courier content is empty.',
          },
        });
      }
      const courierToBeUpdatedData = await Couriers.findOneAndUpdate({
        id: Number(req.params.courierId),
      }, {
        $set: {
          max_capacity: Number(req.body.max_capacity),
        },
      }, {
        new: true,
      });
      if (!courierToBeUpdatedData) {
        return res.status(200).send({
          courier: {},
          message: `Courier was not found with Id = ${req.params.courierId}`,
        });
      }
      return res.status(200).send(courierToBeUpdatedData);
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || 'Error occurred while updating a courier.',
        },
      });
    }
  },
  /**
   * @method delete
   * @description Delete a courier by Id
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  delete: async (req, res) => {
    try {
      if (!req.params.courierId) {
        return res.status(400).send({
          error: {
            message: 'Bad request: courierId must be provided in order to delete the record.',
          },
        });
      }
      const courierToBeDeletedData = await Couriers.findOneAndRemove({
        id: Number(req.params.courierId),
      });
      if (!courierToBeDeletedData) {
        return res.status(404).send({
          error: {
            message: `Courier was not found. Error deleting the courier with Id = ${req.params.courierId}`,
          },
        });
      }
      return res.status(200).send({
        message: 'Courier was deleted.',
      });
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || `Error deleting the courier with Id = ${req.params.courierId}`,
        },
      });
    }
  },
  /**
   * @method lookupByAvailableSpace
   * @description Get all couries whose capacity is greater or equal to the one required
   * @param {object} request - Express request object
   * @param {object} response - Express response object
   */
  lookupByAvailableSpace: async (req, res) => {
    try {
      const capacityRequired = Number(req.body.capacity_required) || null;
      if (!capacityRequired) {
        return res.status(400).send({
          error: {
            message: 'Bad request: capacity_required must be provided in order to look up the couriers.',
          },
        });
      }
      return res.status(200).send(
        await Couriers.find({
          max_capacity: {
            $gte: capacityRequired,
          },
        }),
      );
    } catch (error) {
      return res.status(500).send({
        error: {
          message: error.message || `Error occurred when getting couriers. Capacity required = ${req.body.capacity_required}`,
        },
      });
    }
  },
};
