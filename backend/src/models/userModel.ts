import { InferSchemaType, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
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
  signUp(fullName: string, email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
  update(
    newFullName: string,
    newEmail: string,
    oldEmail: string,
    password: string
  ): Promise<User>;
}

userSchema.statics.signUp = async function (fullName, email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  if (!fullName) {
    throw Error("Full name is required");
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
  const user = await this.create({ fullName, email, password: hashedPassword });

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

userSchema.statics.update = async function (
  newFullName,
  newEmail,
  oldEmail,
  password
) {
  if (!oldEmail) {
    throw Error("cant find user email in localstorage please login again");
  }
  const user = await this.findOne({ email: oldEmail });
  if (!user) {
    throw Error("Incorrect email");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw Error("Incorrect password");
  }
  let updatedUser;
  if (newFullName !== "noChange" && newEmail !== "noChange") {
    updatedUser = await this.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail, fullName: newFullName }
    );
    return updatedUser;
  }
  if (newFullName === "noChange") {
    updatedUser = await this.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail }
    );
    return updatedUser;
  }
  if (newEmail === "noChange") {
    updatedUser = await this.findOneAndUpdate(
      { email: oldEmail },
      { fullName: newFullName }
    );
    return updatedUser;
  }
};

export default model<User, UserModel>("User", userSchema);
