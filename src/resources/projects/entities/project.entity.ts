import mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectOwner: {
    type: String,
    required: true,
  },
  projectMembers: {
    type: Array,
    required: false,
    default: [],
  },
  cards: {
    type: Array,
    required: false,
    default: [],
  },
  developers: {
    type: Array,
    required: false,
    default: [],
  },
});
