import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: false,
      default: ['user'],
    },
  },
  {
    timestamps: true,
  },
);
