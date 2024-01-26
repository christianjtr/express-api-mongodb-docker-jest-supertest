module.exports = (mongoose) => mongoose.model('Couriers', mongoose.Schema({
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
