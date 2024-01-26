import mongoose from 'mongoose';

const courierModel = mongoose.model('Courier', mongoose.Schema({
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
}));

export default courierModel;
