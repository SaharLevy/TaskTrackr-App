import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/login", userController.logingUser);

router.post("/signup", userController.signupUser);

export default router;
