import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { Request, Response, NextFunction } from "express";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //verify the user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required." });
  }

  const token = authorization.split(" ")[1]; // Use optional chaining to handle undefined value

  try {
    console.log("token", token);
    const { email } = jwt.verify(
      token,
      process.env.SECRET as string
    ) as jwt.JwtPayload;
    req.user = await userModel.findOne({ email }).select("email");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "You must be logged in." });
  }
};
