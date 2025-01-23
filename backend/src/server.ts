import app from "./app";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

import env from "./util/validateEnv";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

import passport from "passport";
import session from "express-session";

app.use(bodyParser.json());

const port = env.Port;
console.log(port);
mongoose
  .connect(env.MongoConnectionString)
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRoutes);
app.use(taskRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Route not found"));
});
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "an unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
);
