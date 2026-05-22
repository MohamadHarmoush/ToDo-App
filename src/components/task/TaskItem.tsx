import { useState } from 'react';
import { Link } from 'react-router';

import { deleteTask, updateTask } from '@/api';
import { useDeleteTaskMutation } from '@/hooks/useDeleteTaskMutation';
import { useUpdateTaskMutation } from '@/hooks/useUpdateTaskMutation';
import type { Task } from '@/domain/Task';

import { Checkbox } from './Checkbox';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  className?: string;
  onDelete?: () => void;
};

export const TaskItem = ({ task, className = '', onDelete }: Props) => {
  console.log('TaskItem rendered.');
  const [isExpanded, setIsExpand] = useState(false);
  const updateTaskMutation = useUpdateTaskMutation();
  const removeTaskMutation = useDeleteTaskMutation({ onDelete });

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpand((prev) => !prev);
  };

  return (
    <div
      data-testid='task-item'
      className={`flex flex-col gap-2 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4 ${className}`}
    >
      <div className='flex gap-4'>
        <Checkbox
          id={`task-complete-${task.id}`}
          checked={task.completed}
          onChange={(value: boolean) => {
            updateTaskMutation.mutate({ ...task, completed: value });
          }}
        />

        <Link to={`/task/${task.id}`} className='flex-1'>
          <TaskTitle title={task.title} completed={task.completed} />
        </Link>

        <TaskActions
          className='ml-auto'
          expanded={isExpanded}
          onToggle={toggleExpand}
          onRemove={() => {
            removeTaskMutation.mutate(task.id);
          }}
        />
      </div>

      <TaskBadges priority={task.priority} type={task.type} />

      <TaskNotes
        expanded={isExpanded}
        value={task.notes}
        onUpdate={(notes) => {
          updateTaskMutation.mutate({ ...task, notes: notes });
        }}
      />
    </div>
  );
};
