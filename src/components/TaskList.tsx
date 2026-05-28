import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ClipLoader } from 'react-spinners';

import { fetchTasks } from '@/api';

import { TaskItem } from './task/TaskItem';

const TaskList = () => {
  const {
    data: tasks = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async ({ signal }) => {
      const tasks = await fetchTasks(signal);
      return tasks;
    },
  });

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  console.log('TaskList rendered.');

  return (
    <div>
      <div className='mt-4 mb-6'>
        {isLoading && (
          <div className='flex justify-center'>
            <ClipLoader data-testid='loading-spinner' color='white' />
          </div>
        )}
        {isError && <h1 className='pt-2 text-red-500'>{error.message}</h1>}

        {isSuccess && (
          <h1>
            {`We've added ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}.`}
            {completedCount > 0
              ? ` ${completedCount} ${completedCount === 1 ? 'task' : 'tasks'} are done.`
              : ' No tasks are done yet.'}
          </h1>
        )}
      </div>
      <div className='grid gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3'>
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
