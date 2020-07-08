import { Schema } from "mongoose";

const recordSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

recordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // 1 hour

export default recordSchema;
