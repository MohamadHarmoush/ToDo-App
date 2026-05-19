import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';

import { fetchTaskDetails } from '@/api';
import { TaskItem } from '@/components/task/TaskItem';

const TaskDetailsPage = () => {
  const { id: taskId = '' } = useParams();
  const {
    data: task,
    error,
    isLoading,
  } = useQuery({
    queryKey: [taskId],
    queryFn: () => fetchTaskDetails(taskId),
  });

  return (
    <div className='flex h-full items-center justify-center'>
      {error && <p className='text-gray-400'>Task not found. error: {error.message}</p>}
      {isLoading && <ClipLoader color='white' />}
      {task && <TaskItem task={task} />}
    </div>
  );
};

export default TaskDetailsPage;
