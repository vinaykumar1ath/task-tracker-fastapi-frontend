import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "../api/tasks";

import {
  Task,
  TaskFilters,
  TaskUpdate,
  TaskCreate
} from "../types/api";

const TASK_KEY = "tasks";

export function useTasks(
  filters?: TaskFilters
) {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError
  } = useQuery({
    queryKey: [TASK_KEY, filters],
    queryFn: () => getTasks(filters)
  });

  const createMutation = useMutation({
    mutationFn: (task: TaskCreate) =>
      createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_KEY]
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: number;
      data: TaskUpdate;
    }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_KEY]
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_KEY]
      });
    }
  });

  return {
    tasks: tasks ?? [],
    isLoading,
    isError,

    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate
  };
}
