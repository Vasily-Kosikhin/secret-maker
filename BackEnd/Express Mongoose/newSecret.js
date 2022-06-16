import mongoose from 'mongoose';

const NewSecret = new mongoose.Schema({
  secret: { type: String, required: true },
});

export default mongoose.model('secretData', NewSecret);
