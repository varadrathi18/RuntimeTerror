import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  birthdate: { type: String },
  age: { type: String },
  contact: { type: String },
  class: { type: String },
  stream: { type: String }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  profile: { type: ProfileSchema, default: {} }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);