import { InferSchemaType, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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
  login(email: string, password: string): Promise<User>;
}

userSchema.statics.signUp = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

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

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw Error("Incorrect password");
  }
  return user;
};

export default model<User, UserModel>("User", userSchema);
