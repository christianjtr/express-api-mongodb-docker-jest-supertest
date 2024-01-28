import HTTPStatus from 'http-status';
import Joi from '@hapi/joi';
import { CourierModel } from '../models';

// #region Validations...

export async function checkId(req, _, next) {
  try {
    const queryObject = Joi.object({
      courierId: Joi.number().integer().required(),
    });

    const { courierId } = await queryObject.validateAsync(req.params);

    req.safeFields = {
      ...(req.safeFields || {}),
      courierId,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export async function validateRecordPaylodad(req, _, next) {
  try {
    const queryObject = Joi.object({
      max_capacity: Joi.number().integer().required(),
    });

    const { max_capacity: maxCapacity } = await queryObject.validateAsync(req.body);

    req.safeFields = {
      ...(req.safeFields || {}),
      maxCapacity,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export async function validateLookupQueryParams(req, _, next) {
  try {
    const queryObject = Joi.object({
      capacityRequired: Joi.number().integer().min(0).required(),
    });

    const { capacityRequired } = await queryObject.validateAsync(req.params);

    req.safeFields = {
      ...(req.safeFields || {}),
      capacityRequired,
    };

    next();
  } catch (error) {
    next(error);
  }
}

// #endregion

export async function findAll(_, res) {
  try {
    const couriers = await CourierModel.findAll();

    res.status(HTTPStatus.OK).send(couriers);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when getting couriers.',
      },
    });
  }
}

export async function findById(req, res) {
  try {
    const { courierId } = req.safeFields;

    const courier = await CourierModel.find({
      id: courierId,
    });

    if (!courier) {
      res.status(HTTPStatus.NOT_FOUND).send({
        error: {
          message: `Courier not found with Id = ${courierId}.`,
        },
      });
    }

    res.status(HTTPStatus.OK).send(courier);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error retrieving courier',
      },
    });
  }
}

export async function create(req, res) {
  try {
    const { maxCapacity } = req.safeFields;

    const newCourier = await new CourierModel({
      max_capacity: maxCapacity,
    })
      .save();

    res.status(HTTPStatus.CREATED).send(newCourier);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when creating a courier.',
      },
    });
  }
}

export async function updateById(req, res) {
  try {
    const { courierId, maxCapacity } = req.safeFields;

    const updatedCourier = await CourierModel.findOneAndUpdate({
      id: courierId,
    }, {
      $set: {
        max_capacity: maxCapacity,
      },
    }, {
      new: true,
    });

    if (!updatedCourier) {
      res.status(HTTPStatus.NOT_FOUND).send({
        courier: updatedCourier,
        message: `Courier was not found with Id = ${courierId}`,
      });
    }

    res.status(HTTPStatus.OK).send(updatedCourier);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred while updating a courier.',
      },
    });
  }
}

export async function deleteById(req, res) {
  try {
    const { courierId } = req.safeFields;

    const deletedCourier = await CourierModel.findOneAndRemove({
      id: courierId,
    });

    if (!deletedCourier) {
      res.status(HTTPStatus.NOT_FOUND).send({
        error: {
          message: `Courier was not found. Error deleting the courier with Id = ${courierId}`,
        },
      });
    }

    res.status(HTTPStatus.OK).send({
      message: `Courier having Id = ${courierId} was deleted.`,
    });
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error deleting the courier',
      },
    });
  }
}

export async function lookupByAvailableSpace(req, res) {
  try {
    const { capacityRequired } = req.safeFields;

    const couriers = await CourierModel.find({
      max_capacity: {
        $gte: capacityRequired,
      },
    });

    res.status(HTTPStatus.OK).send(couriers);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when getting couriers.',
      },
    });
  }
}
