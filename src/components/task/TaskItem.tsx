import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { Link } from 'react-router';

import type { Task } from '@/domain/Task';

import { removeTaskAtom, updateTaskAtom } from '../atoms';

import { Checkbox } from './Checkbox';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  className?: string;
};

export const TaskItem = ({ task, className = '' }: Props) => {
  console.log('TaskItem rendered.');
  const [isExpanded, setIsExpand] = useState(false);
  const updateTask = useSetAtom(updateTaskAtom);
  const removeTask = useSetAtom(removeTaskAtom);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpand((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4 ${className}`}>
      <div className='flex gap-4'>
        <Checkbox
          id={`task-complete-${task.id}`}
          checked={task.completed}
          onChange={(value: boolean) => {
            updateTask({ ...task, completed: value });
          }}
        />

        <Link to={`/task/${task.id}`} className='flex-1'>
          <TaskTitle
            title={task.title}
            completed={task.completed}
            onClick={() => {
              updateTask({ ...task, completed: !task.completed });
            }}
          />
        </Link>

        <TaskActions
          className='ml-auto'
          expanded={isExpanded}
          onToggle={toggleExpand}
          onRemove={() => {
            removeTask(task.id);
          }}
        />
      </div>

      <TaskBadges priority={task.priority} type={task.type} />

      <TaskNotes
        expanded={isExpanded}
        value={task.notes}
        onUpdate={(notes) => {
          updateTask({ ...task, notes: notes });
        }}
      />
    </div>
  );
};
