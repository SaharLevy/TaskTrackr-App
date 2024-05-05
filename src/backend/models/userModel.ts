import { InferSchemaType, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

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

interface UserModel extends Model<User> {
  signUp(email: string, password: string): Promise<User>;
}

userSchema.statics.signUp = async function (email, password) {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

export default model<User, UserModel>("User", userSchema);
