import { ObjectId } from "bson";
import ITask from "../types/task";

const apiUrl = process.env.REACT_APP_API_URL || "/api";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  console.log("Fetching URL:", input);
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
  const response = await fetchData(`${apiUrl}`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
}

export async function createTask(
  task: ITask,
  headers?: HeadersInit
): Promise<ITask> {
  const response = await fetchData(`${apiUrl}/createTask`, {
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
  const response = await fetchData(`${apiUrl}/deleteTask/${taskId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...headers },
  });

  return response.status;
}

export async function updateTaskById(task: ITask, headers?: HeadersInit) {
  const response = await fetchData(`${apiUrl}/updateTask/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(task),
  });
  return response.status;
}

//Created this function in order to communicate with the backend api need to work on the backend

export async function completeTaskById(taskId: string, headers?: HeadersInit) {
  const response = await fetchData(`${apiUrl}/completeTask/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ completed: true }), // Send the completion update
  });
  return response.status;
}
