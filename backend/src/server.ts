import app from "./app";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

import env from "./util/validateEnv";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

import passport from "passport";
import session from "express-session";

const allowedOrigins = [
  "http://localhost:3000", // Frontend development
  `http://localhost:${env.Port}`, // Backend port (if needed)
  "https://task-trackr-app-frontend.onrender.com",
];

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
}

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = `CORS blocked request from: ${origin}`;
      console.log(msg);
      callback(new Error(msg), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // Allow the "user" header along with the others
  allowedHeaders: ["Content-Type", "Authorization", "user", "token"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = env.Port || 5000;
console.log(`Server running on port: ${port}`);

mongoose
  .connect(env.MongoConnectionString)
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Mount the user routes at /api/user
app.use("/api/user", userRoutes);
// Mount task routes at /api/tasks (update your frontend calls accordingly)
app.use(taskRoutes);

app.use(express.static("assets"));

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Route not found"));
});

// Global error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});
