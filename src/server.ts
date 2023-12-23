import app from "./app";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

import env from "./util/validateEnv";
//import todosRoutes from "./backend/routes/todos";
import clientRoutes from "./backend/routes/clientRoutes";

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
app.use(clientRoutes);

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
