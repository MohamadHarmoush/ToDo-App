import TaskList from '@/components/TaskList';

const TasksPage = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='w-full text-center text-2xl'>Tasks page</h1>
      <TaskList />
    </div>
  );
};

export default TasksPage;
