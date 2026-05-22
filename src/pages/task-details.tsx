import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';

import { fetchTaskDetails } from '@/api';
import { TaskItem } from '@/components/task/TaskItem';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

const TaskDetailsPage = () => {
  const { id: taskId = '' } = useParams();
  const navigate = useViewTransitionNavigate();
  const {
    data: task,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskDetails(taskId),
    enabled: !!taskId,
  });

  return (
    <div className='flex h-full items-center justify-center'>
      {error && <p className='text-gray-400'>Task not found. error: {error.message}</p>}
      {isLoading && <ClipLoader color='white' />}
      {task && <TaskItem task={task} className='w-full' onDelete={() => navigate('/')} />}
    </div>
  );
};

export default TaskDetailsPage;
