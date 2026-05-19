import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';

import { deleteTask, updateTask } from '@/api';
import type { Task } from '@/domain/Task';

import { Checkbox } from './Checkbox';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  className?: string;
};

export const TaskItem = ({ task, className = '' }: Props) => {
  console.log('TaskItem rendered.');
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpand] = useState(false);

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map((t) => (t.id === updatedTask.id ? updatedTask : t)) ?? []
      );
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const removeTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.filter((t) => t.id !== deletedId) ?? []
      );
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpand((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4 ${className}`}>
      <div className='flex gap-4'>
        <Checkbox
          id={`task-complete-${task.id}`}
          checked={task.completed}
          onChange={(value: boolean) => {
            updateTaskMutation.mutate({ ...task, completed: value });
          }}
        />

        <Link to={`/task/${task.id}`} className='flex-1'>
          <TaskTitle
            title={task.title}
            completed={task.completed}
            onClick={() => {
              updateTaskMutation.mutate({ ...task, completed: !task.completed });
            }}
          />
        </Link>

        <TaskActions
          className='ml-auto'
          expanded={isExpanded}
          onToggle={toggleExpand}
          onRemove={() => {
            removeTaskMutation.mutate(task.id);
          }}
        />
      </div>

      <TaskBadges priority={task.priority} type={task.type} />

      <TaskNotes
        expanded={isExpanded}
        value={task.notes}
        onUpdate={(notes) => {
          updateTaskMutation.mutate({ ...task, notes: notes });
        }}
      />
    </div>
  );
};
