import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/api';
import type { Task } from '@/domain/Task';

type UseDeleteTaskOptions = {
  onDelete?: () => void;
};

/**
 * Hook for deleting a task with optimistic updates.
 * Removes the task from cache immediately, then syncs with the server.
 */
export const useDeleteTaskMutation = (options: UseDeleteTaskOptions = {}) => {
  const { onDelete } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(
        ['tasks'],
        (old) => old?.filter((t) => t.id !== deletedId) ?? [],
      );
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSuccess: (_data, deletedId) => {
      queryClient.removeQueries({ queryKey: ['task', deletedId] });
      onDelete?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
