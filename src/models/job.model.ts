import { IJob } from "@/types";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Document & IJob>("Job", JobSchema);
