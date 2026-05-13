import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { tasksAtom } from '@/components/atoms';
import { TaskItem } from '@/components/task/TaskItem';
import type { Task } from '@/domain/Task';

const TaskDetailsPage = () => {
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const tasks = useAtomValue(tasksAtom);

  useEffect(() => {
    if (id === undefined) return;
    const taskId = parseInt(id);
    const foundTask = tasks.find((task) => task.id === taskId);
    setTask(foundTask ?? null);
  }, [id, tasks]);

  if (!task) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p className='text-gray-400'>Task not found</p>
      </div>
    );
  }

  return <TaskItem task={task} />;
};

export default TaskDetailsPage;
