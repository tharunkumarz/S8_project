import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  departureCity: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  returnTime: {
    type: String,
    required: true
  },
  stops: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus; 