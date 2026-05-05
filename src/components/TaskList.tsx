import type { Task } from '@/domain/Task';

import { TaskItem } from './task/TaskItem';

type TaskListProps = {
  tasks: Task[];
  onTaskChange: (task: Task) => void;
  onRemoveTask: (taskId: number) => void;
};

const TaskList = ({ tasks, onTaskChange, onRemoveTask }: TaskListProps) => {
  const completedTasks = tasks.filter((task) => task.isComplete);
  const pendingTasks = tasks.filter((task) => !task.isComplete);
  const sortedTasks = [...pendingTasks, ...completedTasks];

  return (
    <div className='mt-8 flex flex-col gap-2 overflow-y-auto pr-2'>
      <h1>
        {`We've added ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}.`}
        {completedTasks.length > 0
          ? ` ${completedTasks.length} ${completedTasks.length === 1 ? 'task' : 'tasks'} are done.`
          : ' No tasks are done yet.'}
      </h1>
      {sortedTasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onTaskChange} onRemove={onRemoveTask} />
      ))}
    </div>
  );
};

export default TaskList;
