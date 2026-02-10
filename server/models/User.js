import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', UserSchema);
