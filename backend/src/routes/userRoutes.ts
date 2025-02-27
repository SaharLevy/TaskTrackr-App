import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/login", userController.logingUser);

router.post("/signup", userController.signupUser);

router.put("/update", userController.updateUser);

export default router;
