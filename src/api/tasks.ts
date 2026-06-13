import { api } from "./client";
import {
  Task,
  TaskCreate,
  TaskFilters,
  TaskUpdate
} from "../types/api";

export async function getTasks(
  filters?: TaskFilters
): Promise<Task[]> {
  const response = await api.get(
    "/task/",
    {
      params: filters
    }
  );

  return response.data;
}

export async function createTask(
  task: TaskCreate
) {
  const response = await api.post(
    "/task/",
    task
  );

  return response.data;
}

export async function updateTask(
  taskId: number,
  update: TaskUpdate
): Promise<Task> {
  const response = await api.patch(
    "/task/",
    update,
    {
      params: {
        task_id: taskId
      }
    }
  );

  return response.data;
}

export async function deleteTask(
  taskId: number
) {
  const response = await api.delete(
    "/task/",
    {
      params: {
        task_id: taskId
      }
    }
  );

  return response.data;
}
