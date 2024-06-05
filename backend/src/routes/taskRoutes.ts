import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

//require auth for all task routes
router.use(requireAuth);

router.get("/api/", taskController.getTasks);

router.get("/api/:taskId", taskController.getTask);

router.post("/api/createTask", taskController.createTask);

router.delete("/api/deleteTask/:taskId", taskController.deleteTask);

router.put("/api/updateTask/:taskId", taskController.updateTask);

export default router;
