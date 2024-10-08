import { NextFunction, Request, RequestHandler, Response } from "express";
import Task from "../models/task";

export const getTasks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers["user"] as string;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID not provided in headers." });
    }
    // Query for tasks belonging to this user
    const tasks = await Task.find({ userId }).exec();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId).exec();
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const text = req.body.text;
  const priority = req.body.priority;
  const userId = req.body.userId;

  try {
    const newTask = await Task.create({
      title: title,
      text: text,
      priority: priority,
      userId: userId, // Set the userId field to the logged-in user's _id
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "couldnt delete task" });
    }
    return res.json({
      success: true,
      message: "task has been deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId; // Assuming taskId is in the route params, not the request body
  //const currentTime = new Date();
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
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
  } catch (error) {
    next(error);
    /*return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  */
  }
};
