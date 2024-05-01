import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/api/", taskController.getTasks);

router.get("/api/:taskId", taskController.getTask);

router.post("/api/createTask", taskController.createTask);

router.delete("/api/deleteTask/:taskId", taskController.deleteTask);

router.put("/api/updateTask/:taskId", taskController.updateTask);

export default router;
