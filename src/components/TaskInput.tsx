import { useSetAtom } from 'jotai';
import { useState } from 'react';

import type { Priority } from '@/domain/Priority';
import type { Task } from '@/domain/Task';
import type { TaskType } from '@/domain/TaskType';

import { addTaskAtom } from './atoms';
import PrioritySelector from './PrioritySelector';
import TypeSelector from './TypeSelector';

type TaskInputProps = {
  placeholder?: string;
  priority?: Priority;
  taskType?: TaskType;
  className?: string;
};

const TaskInput = ({
  priority = 'Medium',
  taskType = 'General',
  placeholder = 'What needs to be done?',
  className = '',
}: TaskInputProps) => {
  const addTask = useSetAtom(addTaskAtom);

  console.log('TaskInput rendered.');
  const [task, setTask] = useState<Task>(() => ({
    id: -1,
    title: '',
    priority: priority,
    type: taskType,
    notes: '',
    isComplete: false,
  }));

  const handleChange = (name: string, value: string) => {
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTask(task);
      }}
      className={`rounded-xl border border-gray-800 p-2 transition-colors hover:border-gray-600 hover:bg-gray-800 ${className} flex flex-wrap gap-2`}
    >
      <input
        className='flex-1 p-2 text-white placeholder-gray-500'
        type='text'
        name='title'
        value={task.title}
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(e.target.name, e.target.value);
        }}
      />

      <div className='flex flex-wrap gap-2'>
        <PrioritySelector
          value={task.priority}
          onChange={(value) => {
            handleChange('priority', value);
          }}
        />

        <TypeSelector
          value={task.type}
          onChange={(value) => {
            handleChange('type', value);
          }}
        />

        <button
          disabled={!task.title}
          type='submit'
          className='inline-flex items-center gap-2 rounded-xl px-8 enabled:bg-indigo-900 disabled:cursor-not-allowed disabled:bg-indigo-900/50'
        >
          <span>+</span>
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
