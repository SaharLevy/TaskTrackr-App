import { InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    text: String,
    priority: { type: String, required: true },
  },
  { timestamps: true }
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
