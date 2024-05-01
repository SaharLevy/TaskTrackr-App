import { Request, Response } from "express";
import User from "../models/userModel";

//login user

export const logingUser = async (req: Request, res: Response) => {
  res.json({ messege: "login user" });
};

//signup user

export const signupUser = async (req: Request, res: Response) => {
  res.json({ messege: "signup user" });
};
