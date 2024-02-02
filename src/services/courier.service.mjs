import { Courier } from '../models';

export default {
  getCouriers: async () => {
    const couriers = await Courier.find({});
    return couriers;
  },
  getCourierById: async (courierId) => {
    const courier = await Courier.findById(courierId);
    return courier;
  },
  create: async (payload) => {
    const { maxCapacity } = payload;

    const newCourier = await new Courier({
      max_capacity: maxCapacity,
    })
      .save();

    return newCourier;
  },
  updateById: async (courierId, payload) => {
    const { maxCapacity } = payload;

    const updatedCourier = await Courier.findOneAndUpdate({
      _id: courierId,
    }, {
      $set: {
        max_capacity: maxCapacity,
      },
    }, {
      new: true,
    });

    return updatedCourier;
  },
  deleteById: async (courierId) => {
    const deletedCourier = await Courier.findOneAndRemove({
      _id: courierId,
    });

    return deletedCourier;
  },
  lookupByAvailableSpace: async (capacityRequired) => {
    const couriers = await Courier.find({
      max_capacity: {
        $gte: capacityRequired,
      },
    });

    return couriers;
  },
};
