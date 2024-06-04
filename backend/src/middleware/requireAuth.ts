import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export const requireAuth = (req, res, next) => {
  //verify the user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  const token = authorization?.split(" ")[1]; // Use optional chaining to handle undefined value

  try {
    const { email } = jwt.verify(token, process.env.SECRET as string);
    req.user = userModel.findOne({ email }).select("email");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "You must be logged in." });
  }
};
