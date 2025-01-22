"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["user"];
        if (!userId) {
            return res
                .status(400)
                .json({ error: "User ID not provided in headers." });
        }
        // Query for tasks belonging to this user
        const tasks = yield task_1.default.find({ userId }).exec();
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    try {
        const task = yield task_1.default.findById(taskId).exec();
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTask = getTask;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const text = req.body.text;
    const priority = req.body.priority;
    const userId = req.body.userId;
    try {
        const newTask = yield task_1.default.create({
            title: title,
            text: text,
            priority: priority,
            userId: userId, // Set the userId field to the logged-in user's _id
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    try {
        const deletedTask = yield task_1.default.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res
                .status(404)
                .json({ success: false, message: "couldnt delete task" });
        }
        return res.json({
            success: true,
            message: "task has been deleted successfuly",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId; // Assuming taskId is in the route params, not the request body
    //const currentTime = new Date();
    try {
        const updatedTask = yield task_1.default.findByIdAndUpdate(taskId, req.body, {
            new: true,
        });
        if (!updatedTask) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        return res.json({
            success: true,
            message: "Task has been updated successfully",
            data: updatedTask,
        });
    }
    catch (error) {
        next(error);
        /*return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      */
    }
});
exports.updateTask = updateTask;
