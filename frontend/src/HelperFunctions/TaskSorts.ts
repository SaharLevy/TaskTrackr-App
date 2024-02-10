import Task from "../models/task";

export function sortByPriority(tasks: Task[]) {
  const priorityOrder = ["High", "Medium", "Low"];

  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    const priorityIndexA = priorityOrder.indexOf(taskA.priority);
    const priorityIndexB = priorityOrder.indexOf(taskB.priority);
    return priorityIndexA - priorityIndexB;
  });

  return sortedTasks;
}

export function sortByPriorityLow(tasks: Task[]) {
  const priorityOrder = ["Low", "Medium", "High"];

  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    const priorityIndexA = priorityOrder.indexOf(taskA.priority);
    const priorityIndexB = priorityOrder.indexOf(taskB.priority);
    return priorityIndexA - priorityIndexB;
  });

  return sortedTasks;
}
