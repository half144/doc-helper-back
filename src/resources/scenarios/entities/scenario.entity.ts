import mongoose from 'mongoose';

export const ScenarioSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    createdBy: { type: String, required: false },
    cardNumber: { type: String, required: true },
    cardReviwer: { type: String, required: true },
    cardHolder: { type: String, required: true },
    cardDescription: { type: String, required: true },
    sprint: { type: String, required: true },
    scenarios: [
      {
        testcaseName: { type: String, required: true },
        testcaseDescription: {
          dado: { type: String, required: true },
          quando: { type: String, required: true },
          entao: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
