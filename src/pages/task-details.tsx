import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';

import { fetchTaskDetails } from '@/api';
import { TaskDetailsCard } from '@/components/task/TaskDetailsCard';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

const TaskDetailsPage = () => {
  const { id: taskId = '' } = useParams();
  const navigate = useViewTransitionNavigate('backwards');
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
    <div className='flex h-full items-center justify-center p-4'>
      {error && <p className='text-gray-400'>Task not found. error: {error.message}</p>}
      {isLoading && <ClipLoader color='white' />}
      {task && (
        <TaskDetailsCard task={task} onDelete={() => navigate('/')} />
      )}
    </div>
  );
};

export default TaskDetailsPage;
