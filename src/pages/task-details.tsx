import { useAtomValue } from 'jotai';
import { useParams } from 'react-router';

import { tasksAtom } from '@/components/atoms';
import { TaskItem } from '@/components/task/TaskItem';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const tasks = useAtomValue(tasksAtom);
  const task = tasks.find((t) => t.id === id) ?? null;

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
