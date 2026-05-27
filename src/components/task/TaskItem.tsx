import { useState } from 'react';

import { TransitionLink } from '@/components/TransitionLink';
import type { Task } from '@/domain/Task';
import { useDeleteTaskMutation } from '@/hooks/useDeleteTaskMutation';
import { usePrefetchOnVisible } from '@/hooks/usePrefetchOnVisible';
import { useUpdateTaskMutation } from '@/hooks/useUpdateTaskMutation';

import { Checkbox } from './Checkbox';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  onDelete?: () => void;
};

export const TaskItem = ({ task, onDelete }: Props) => {
  console.log('TaskItem rendered.');
  const [isExpanded, setIsExpand] = useState(true);
  const itemRef = usePrefetchOnVisible(task.id);
  const updateTaskMutation = useUpdateTaskMutation();
  const removeTaskMutation = useDeleteTaskMutation({ onDelete });

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpand((prev) => !prev);
  };

  return (
    <div
      ref={itemRef}
      data-testid='task-item'
      className='flex flex-col gap-2 rounded-xl bg-slate-200 px-4 pt-2 pb-4 dark:bg-gray-800/50'
    >
      <div className='flex gap-4'>
        <Checkbox
          id={`task-complete-${task.id}`}
          checked={task.completed}
          onChange={(value: boolean) => {
            updateTaskMutation.mutate({ ...task, completed: value });
          }}
        />

        <TransitionLink to={`/task/${task.id}`} className='flex-1'>
          <TaskTitle title={task.title} completed={task.completed} />
        </TransitionLink>

        <TaskActions
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
