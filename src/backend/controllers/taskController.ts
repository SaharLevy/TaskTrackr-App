import { NextFunction, Request, RequestHandler, Response } from "express";
import Task from "../models/task";

export const getTasks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find().exec();
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

  try {
    const newTask = await Task.create({
      title: title,
      text: text,
      priority: priority,
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
