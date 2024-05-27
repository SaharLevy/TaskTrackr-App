import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

//create token

const createToken = (email: string) => {
  return jwt.sign({ email }, process.env.SECRET || "", { expiresIn: "3d" });
};

//login user

export const logingUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);

    //create token
    const token = createToken(user.email);

    res.status(200).json({ user, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // Handle the case where error is not an Error object
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

//signup user

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.signUp(email, password);

    //create token
    const token = createToken(user.email);

    res.status(200).json({ user, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // Handle the case where error is not an Error object
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
