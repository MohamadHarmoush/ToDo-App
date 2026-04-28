import { useState } from 'react';

import { getPriorityColor } from '@/domain/Priority';
import type { Task } from '@/domain/Task';
import { getTaskTypeColor } from '@/domain/TaskType';

import { ArrowIcon } from './ArrowIcon';
import { Badge } from './Badge';
import { RemoveIcon } from './RemoveIcon';

type Props = {
  task: Task;
  className?: string;
  onUpdate: (task: Task) => void;
  onRemove: (taskId: number) => void;
};

export const TaskItem = ({ task, className, onUpdate, onRemove }: Props) => {
  const [isExpanded, setIsExpand] = useState(false);
  const priorityColor = getPriorityColor(task.priority);
  const typeColor = getTaskTypeColor(task.type);

  const taskTitleClassName = task.isComplete ? 'line-through text-gray-400' : '';
  const expandedPanelClassName = isExpanded
    ? 'h-auto scale-100 opacity-100'
    : 'pointer-events-none h-0 scale-95 overflow-hidden opacity-0';

  const handleOnCheckClick = (value: boolean) => {
    onUpdate({ ...task, isComplete: value });
  };
  const toggleExpand = () => {
    setIsExpand((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4 ${className}`}>
      <div className='flex gap-4'>
        <input
          type='checkbox'
          id={`task-complete-${task.id}`}
          checked={task.isComplete}
          onChange={(e) => {
            handleOnCheckClick(e.target.checked);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='mt-1 h-4 w-4'
        />
        <label
          htmlFor={`task-complete-${task.id}`}
          className={`w-full cursor-pointer ${taskTitleClassName}`}
        >
          {task.title}
        </label>
        <div className='flex gap-2'>
          <button type='button' onClick={toggleExpand} className='pl-10'>
            <ArrowIcon direction={isExpanded ? 'up' : 'down'} />
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onRemove(task.id);
            }}
            className='rounded-lg bg-red-800 p-1 text-white transition-colors hover:bg-red-300/80'
          >
            <RemoveIcon className='h-5 w-5' />
          </button>
        </div>
      </div>

      <div className='flex flex-row gap-2'>
        <Badge label={task.priority} textColor={priorityColor} />
        <Badge label={task.type} textColor={typeColor} />
      </div>

      <div className={`transition-all duration-300 ease-in-out ${expandedPanelClassName}`}>
        <textarea
          className='w-full rounded-lg bg-gray-800 p-2 text-xs outline-none'
          placeholder='Add notes...'
          rows={4}
          value={task.notes}
          onChange={(e) => {
            onUpdate({ ...task, notes: e.target.value });
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};
