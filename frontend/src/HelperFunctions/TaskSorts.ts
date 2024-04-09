import ITask from "../types/task";

export function sortByPriority(tasks: ITask[]) {
  const priorityOrder = ["High", "Medium", "Low"];

  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    const priorityIndexA = priorityOrder.indexOf(taskA.priority);
    const priorityIndexB = priorityOrder.indexOf(taskB.priority);
    return priorityIndexA - priorityIndexB;
  });

  return sortedTasks;
}

export function sortByPriorityLow(tasks: ITask[]) {
  const priorityOrder = ["Low", "Medium", "High"];

  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    const priorityIndexA = priorityOrder.indexOf(taskA.priority);
    const priorityIndexB = priorityOrder.indexOf(taskB.priority);
    return priorityIndexA - priorityIndexB;
  });

  return sortedTasks;
}

export function sortByDate(
  tasks: ITask[],
  sortBy: "createdAt" | "updatedAt"
): ITask[] {
  const sortedTasks = [...tasks];

  sortedTasks.sort((taskA, taskB) => {
    // Check if the timestamp is defined before creating a Date object
    const dateA = taskA[sortBy] !== undefined ? new Date(taskA[sortBy]!) : null;
    const dateB = taskB[sortBy] !== undefined ? new Date(taskB[sortBy]!) : null;

    if (dateA === null && dateB === null) {
      return 0; // No comparison can be made, consider them equal
    } else if (dateA === null) {
      return 1; // If dateA is null, consider taskB greater
    } else if (dateB === null) {
      return -1; // If dateB is null, consider taskA greater
    }
    return dateA.getTime() - dateB.getTime();
  });

  return sortedTasks;
}

export function countByPriority(tasks: ITask[]): {low: number, medium: number, high: number} {
  let low = 0, medium = 0, high = 0;

  tasks.forEach(task => {
    switch(task.priority){
      case 'Low':
        low++;
        break;
      case 'Medium':
        medium++;
        break;
      case 'High':
        high++;
        break;
      default:
        //any unexpected priorities, will come back to that on another time
        break;
    }
    
  });
  return {low,medium,high}
  }
