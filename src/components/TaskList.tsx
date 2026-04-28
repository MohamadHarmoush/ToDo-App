import type { Task } from '@/domain/Task';

import { TaskItem } from './task/TaskItem';

type TaskListProps = {
  tasks: Task[];
  onTaskChange: (task: Task) => void;
  onRemoveTask: (taskId: number) => void;
};

const TaskList = ({ tasks, onTaskChange, onRemoveTask }: TaskListProps) => {
  const completedTasks = tasks.filter((task) => task.isComplete);
  const taskText = completedTasks.length === 1 ? 'task' : 'tasks';
  return (
    <div className='mt-8 flex flex-col gap-2 overflow-y-auto pr-2'>
      <h1>
        {`We've added ${tasks.length} ${taskText}.`}
        {completedTasks.length > 0
          ? ` ${completedTasks.length} ${taskText} are done.`
          : ' No tasks are done yet.'}
      </h1>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onTaskChange} onRemove={onRemoveTask} />
      ))}
    </div>
  );
};

export default TaskList;
