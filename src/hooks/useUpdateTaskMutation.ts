import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask } from '@/api';
import type { Task } from '@/domain/Task';

/**
 * Hook for updating a task with optimistic updates.
 * Updates the cache immediately, then syncs with the server.
 */
export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(
        ['tasks'],
        (old) => old?.map((t) => (t.id === updatedTask.id ? updatedTask : t)) ?? [],
      );
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task>(['task', updatedTask.id], updatedTask);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
