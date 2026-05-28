import { useState } from 'react';

import PrioritySelector from '@/components/PrioritySelector';
import TypeSelector from '@/components/TypeSelector';
import type { Task } from '@/domain/Task';
import { useDeleteTaskMutation } from '@/hooks/useDeleteTaskMutation';
import { useUpdateTaskMutation } from '@/hooks/useUpdateTaskMutation';

import { Checkbox } from './Checkbox';

type Props = {
  task: Task;
  onDelete?: () => void;
};

export const TaskDetailsCard = ({ task, onDelete }: Props) => {
  const [editedTask, setEditedTask] = useState(task);
  const updateTaskMutation = useUpdateTaskMutation();
  const removeTaskMutation = useDeleteTaskMutation({ onDelete });

  const handleFieldChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    const updated = { ...editedTask, [field]: value };
    setEditedTask(updated);
    updateTaskMutation.mutate(updated);
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      removeTaskMutation.mutate(task.id);
    }
  };

  return (
    <div className='w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800'>
      {/* Header */}
      <div className='mb-6 flex flex-row justify-end'>
        <button
          onClick={handleDelete}
          className='text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
        >
          Delete
        </button>
      </div>

      {/* Title */}
      <textarea
        value={editedTask.title}
        onChange={(e) => handleFieldChange('title', e.target.value)}
        rows={1}
        className='mb-4 w-full resize-none overflow-visible bg-transparent text-2xl font-bold text-gray-900 focus:outline-none dark:text-white'
        placeholder='Task title'
        ref={(el) => {
          if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
          }
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = `${target.scrollHeight}px`;
        }}
      />

      {/* Status Row */}
      <div className='mb-4 flex items-center gap-3'>
        <Checkbox
          id='task-complete-detail'
          checked={editedTask.completed}
          onChange={(value) => handleFieldChange('completed', value)}
        />
        <span
          className={
            editedTask.completed ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-300'
          }
        >
          {editedTask.completed ? 'Completed' : 'Active'}
        </span>
      </div>

      {/* Priority & Type Row */}
      <div className='mb-4 flex flex-wrap items-center justify-start gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>Priority:</span>
          <PrioritySelector
            value={editedTask.priority}
            onChange={(value) => handleFieldChange('priority', value)}
          />
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>Type:</span>
          <TypeSelector
            value={editedTask.type}
            onChange={(value) => handleFieldChange('type', value)}
          />
        </div>
      </div>

      {/* Notes */}
      <textarea
        value={editedTask.notes}
        onChange={(e) => handleFieldChange('notes', e.target.value)}
        rows={4}
        className='w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
        placeholder='Add notes...'
      />
    </div>
  );
};
