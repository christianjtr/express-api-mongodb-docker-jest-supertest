import mongoose from 'mongoose';

const CourierSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  max_capacity: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const CourierModel = mongoose.model('Courier', CourierSchema);

export default CourierModel;
