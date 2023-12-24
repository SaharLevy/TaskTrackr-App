import { ObjectId } from "mongodb";
import Task from "../models/task";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    //response.ok mean the http call is between 200-299
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetchData("api/", {
    method: "GET",
  });
  return response.json();
}

export interface TaskInput {
  title: string;
  text?: string;
  priority: string;
}

export async function createTask(task: TaskInput): Promise<Task> {
  const response = await fetchData("api/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTaskById(taskId: ObjectId) {
  const response = await fetchData(`/api/deleteTask/${taskId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response.status;
}
