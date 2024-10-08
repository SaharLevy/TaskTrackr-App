import { InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    text: String,
    priority: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1 }); // Create an index on the userId field

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
