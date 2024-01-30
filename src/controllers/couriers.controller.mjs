import HTTPStatus from 'http-status';
import Joi from '@hapi/joi';
import { Courier } from '../models';

// #region Validations...

export async function checkId(request, _, next) {
  try {
    const queryObject = Joi.object({
      courierId: Joi.string().hex().length(24).required(),
    });

    const { courierId } = await queryObject.validateAsync(request.params);

    request.safeFields = {
      ...(request.safeFields || {}),
      courierId,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export async function validateRecordPaylodad(request, _, next) {
  try {
    const queryObject = Joi.object({
      max_capacity: Joi.number().integer().min(0).required(),
    });

    const { max_capacity: maxCapacity } = await queryObject.validateAsync(request.body);

    request.safeFields = {
      ...(request.safeFields || {}),
      maxCapacity,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export async function validateLookupQueryParams(request, _, next) {
  try {
    const queryObject = Joi.object({
      capacityRequired: Joi.number().integer().min(0).required(),
    });

    const { capacityRequired } = await queryObject.validateAsync(request.params);

    request.safeFields = {
      ...(request.safeFields || {}),
      capacityRequired,
    };

    next();
  } catch (error) {
    next(error);
  }
}

// #endregion

export async function findAll(_, response, next) {
  try {
    const couriers = await Courier.find({});

    response.status(HTTPStatus.OK).send(couriers);
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when getting couriers.',
      },
    });
    next(error);
  }
}

export async function findById(request, response, next) {
  try {
    const { courierId } = request.safeFields;

    const courier = await Courier.findById(courierId);

    if (!courier) {
      response.status(HTTPStatus.NOT_FOUND).send({
        error: {
          message: `Courier not found with Id = ${courierId}.`,
        },
      });

      return;
    }

    response.status(HTTPStatus.OK).send(courier);
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error retrieving courier',
      },
    });
    next(error);
  }
}

export async function create(request, response, next) {
  try {
    const { maxCapacity } = request.safeFields;

    const newCourier = await new Courier({
      max_capacity: maxCapacity,
    })
      .save();

    response.status(HTTPStatus.CREATED).send(newCourier);
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when creating a courier.',
      },
    });
    next(error);
  }
}

export async function updateById(request, response, next) {
  try {
    const { courierId, maxCapacity } = request.safeFields;

    const updatedCourier = await Courier.findOneAndUpdate({
      _id: courierId,
    }, {
      $set: {
        max_capacity: maxCapacity,
      },
    }, {
      new: true,
    });

    if (!updatedCourier) {
      response.status(HTTPStatus.NOT_FOUND).send({
        courier: updatedCourier,
        message: `Courier was not found with Id = ${courierId}`,
      });

      return;
    }

    response.status(HTTPStatus.OK).send(updatedCourier);
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred while updating a courier.',
      },
    });
    next(error);
  }
}

export async function deleteById(request, response, next) {
  try {
    const { courierId } = request.safeFields;

    const deletedCourier = await Courier.findOneAndRemove({
      _id: courierId,
    });

    if (!deletedCourier) {
      response.status(HTTPStatus.NOT_FOUND).send({
        error: {
          message: `Courier was not found. Error deleting the courier with Id = ${courierId}`,
        },
      });

      return;
    }

    response.status(HTTPStatus.OK).send({
      message: `Courier having Id = ${courierId} was deleted.`,
    });
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error deleting the courier',
      },
    });
    next(error);
  }
}

export async function lookupByAvailableSpace(request, response, next) {
  try {
    const { capacityRequired } = request.safeFields;

    const couriers = await Courier.find({
      max_capacity: {
        $gte: capacityRequired,
      },
    });

    response.status(HTTPStatus.OK).send(couriers);
  } catch (error) {
    response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message || 'Error occurred when getting couriers.',
      },
    });
    next(error);
  }
}
