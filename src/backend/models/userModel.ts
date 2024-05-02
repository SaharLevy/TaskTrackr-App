import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

type User = InferSchemaType<typeof userSchema>;

userSchema.statics.signup = async (email: String, password: String) => {
  const emailExist = await this.findOne({ email });

  if (emailExist) {
    throw Error("Email already in use");
  }
};

export default model<User>("User", userSchema);
