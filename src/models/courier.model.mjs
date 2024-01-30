import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourierSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  max_capacity: {
    type: Schema.Types.Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Courier = mongoose.model('Courier', CourierSchema);

export default Courier;
