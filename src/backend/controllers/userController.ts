import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

//create token

const createToken = (_id: ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET || "", { expiresIn: "3d" });
};

//login user

export const logingUser = async (req: Request, res: Response) => {
  res.json({ messege: "login user" });
};

//signup user

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);

    //create token
    const token = createToken(user._id);

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
