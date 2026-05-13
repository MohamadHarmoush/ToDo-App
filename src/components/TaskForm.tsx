import { useSetAtom } from 'jotai';
import { useState } from 'react';

import type { Task } from '@/domain/Task';

import { addTaskAtom } from './atoms';
import PrioritySelector from './PrioritySelector';
import { TaskNotes } from './task/TaskNotes';
import TypeSelector from './TypeSelector';

const TaskForm = () => {
  const [task, setTask] = useState<Task>(() => ({
    id: -1,
    title: '',
    priority: 'Medium',
    type: 'Personal',
    notes: '',
    isComplete: false,
  }));

  const addTask = useSetAtom(addTaskAtom);
  const handleChange = (name: string, value: string) => {
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className='rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg'>
      <div className='pb-4 text-sm font-semibold tracking-widest text-gray-400 uppercase'>
        New Task
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask(task);
        }}
        className={`flex flex-col gap-4 transition-colors hover:border-gray-600`}
      >
        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-400'>Title</label>
          <input
            className='rounded-lg border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-500'
            type='text'
            name='title'
            value={task.title}
            placeholder='What needs to be done?'
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-400'>Priority</label>

          <PrioritySelector
            value={task.priority}
            onChange={(value) => {
              handleChange('priority', value);
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-400'>Type</label>

          <TypeSelector
            value={task.type}
            onChange={(value) => {
              handleChange('type', value);
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-400'>Notes</label>
          <TaskNotes
            expanded={true}
            value={task.notes}
            onUpdate={(notes) => {
              handleChange('notes', notes);
            }}
          />
        </div>
        <button
          disabled={!task.title}
          type='submit'
          className='items-center gap-2 rounded-xl px-8 py-2 enabled:bg-indigo-900 disabled:cursor-not-allowed disabled:bg-indigo-900/50'
        >
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
