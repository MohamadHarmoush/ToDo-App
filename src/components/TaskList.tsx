import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { TodoActions } from '@/domain/TodoAction';

import { todosAtom } from './atoms';
import { TaskItem } from './task/TaskItem';

const TaskList = () => {
  const [tasks, dispatch] = useAtom(todosAtom);
  console.log('TaskList rendered.');

  const sortedTasks = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.isComplete);
    const pendingTasks = tasks.filter((task) => !task.isComplete);
    return [...pendingTasks, ...completedTasks];
  }, [tasks]);

  const completedCount = useMemo(() => tasks.filter((task) => task.isComplete).length, [tasks]);

  return (
    <div className='mt-8 flex flex-col gap-2 overflow-y-auto pr-2'>
      <h1>
        {`We've added ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}.`}
        {completedCount > 0
          ? ` ${completedCount} ${completedCount === 1 ? 'task' : 'tasks'} are done.`
          : ' No tasks are done yet.'}
      </h1>
      {sortedTasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          onUpdate={(updatedTask) => {
            dispatch(TodoActions.update(updatedTask));
          }}
          onRemove={(taskId) => {
            dispatch(TodoActions.remove(taskId));
          }}
        />
      ))}
    </div>
  );
};

export default TaskList;
