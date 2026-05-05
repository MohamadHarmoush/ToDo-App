import { useState } from 'react';

import type { Task } from '@/domain/Task';

import { Checkbox } from './Checkbox';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  className?: string;
  onUpdate: (task: Task) => void;
  onRemove: (taskId: number) => void;
};

export const TaskItem = ({ task, className = '', onUpdate, onRemove }: Props) => {
  console.log('TaskItem rendered.');
  const [isExpanded, setIsExpand] = useState(false);

  const handleOnCheckClick = (value: boolean) => {
    onUpdate({ ...task, isComplete: value });
  };

  const toggleExpand = () => {
    setIsExpand((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4 ${className}`}>
      <div className='flex gap-4'>
        <Checkbox
          id={`task-complete-${task.id}`}
          checked={task.isComplete}
          onChange={handleOnCheckClick}
        />

        <TaskTitle
          title={task.title}
          isComplete={task.isComplete}
          onClick={() => {
            handleOnCheckClick(!task.isComplete);
          }}
        />

        <TaskActions
          className='ml-auto'
          expanded={isExpanded}
          onToggle={toggleExpand}
          onRemove={() => {
            onRemove(task.id);
          }}
        />
      </div>

      <TaskBadges priority={task.priority} type={task.type} />

      <TaskNotes
        expanded={isExpanded}
        value={task.notes}
        onUpdate={(notes) => {
          onUpdate({ ...task, notes: notes });
        }}
      />
    </div>
  );
};
