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
    queryFn: async () => {
      const tasks = await fetchTasks();
      const completedTasks = tasks.filter((task) => task.completed);
      const pendingTasks = tasks.filter((task) => !task.completed);
      return [...pendingTasks, ...completedTasks];
    },
  });

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  console.log('TaskList rendered.');

  return (
    <div className='mt-8 flex flex-col gap-2 overflow-y-auto pr-2'>
      <div>
        {isLoading && (
          <div className='flex justify-center'>
            <ClipLoader color='white' />
          </div>
        )}
        {isError && <h1 className='pt-2 text-red-500'>{error.message}</h1>}
      </div>
      {isSuccess && (
        <h1>
          {`We've added ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}.`}
          {completedCount > 0
            ? ` ${completedCount} ${completedCount === 1 ? 'task' : 'tasks'} are done.`
            : ' No tasks are done yet.'}
        </h1>
      )}
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
