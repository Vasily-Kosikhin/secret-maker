import mongoose from 'mongoose';

const Secret = new mongoose.Schema({
  text: { type: String, required: true },
  reusable: { type: Boolean, required: true },
});

export default mongoose.model('data', Secret);
