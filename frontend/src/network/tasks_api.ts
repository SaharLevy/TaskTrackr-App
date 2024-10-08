import { ObjectId } from "mongoose";
import ITask from "../types/task";

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

export async function fetchTasks(headers?: HeadersInit): Promise<ITask[]> {
  const response = await fetchData("api/", {
    method: "GET",
    headers: headers,
  });
  return response.json();
}

export async function createTask(
  task: ITask,
  headers?: HeadersInit
): Promise<ITask> {
  const response = await fetchData("api/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTaskById(taskId: ObjectId, headers?: HeadersInit) {
  const response = await fetchData(`/api/deleteTask/${taskId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...headers },
  });

  return response.status;
}

export async function updateTaskById(task: ITask, headers?: HeadersInit) {
  const response = await fetchData(`/api/updateTask/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(task),
  });
  return response.status;
}
