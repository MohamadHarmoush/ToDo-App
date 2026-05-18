import { useForm } from '@tanstack/react-form';
import { useSetAtom } from 'jotai';

import type { Task } from '@/domain/Task';

import { addTaskAtom } from './atoms';
import PrioritySelector from './PrioritySelector';
import { TaskNotes } from './task/TaskNotes';
import TypeSelector from './TypeSelector';

type TaskFormInput = Pick<Task, 'title' | 'priority' | 'type' | 'notes'>;

const formDefaultValues: TaskFormInput = {
  title: '',
  priority: 'Medium',
  type: 'Personal',
  notes: '',
};

const TaskForm = () => {
  const addTask = useSetAtom(addTaskAtom);
  const form = useForm({
    defaultValues: formDefaultValues,
    onSubmit: ({ value }) => {
      const task: Task = {
        id: Date.now(),
        title: value.title.trim(),
        priority: value.priority,
        type: value.type,
        notes: value.notes.trim(),
        isComplete: false,
      };
      addTask(task);
      form.reset();
    },
  });

  return (
    <div className='rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg'>
      <div className='pb-4 text-sm font-semibold tracking-widest text-gray-400 uppercase'>
        New Task
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={`flex flex-col gap-4 transition-colors hover:border-gray-600`}
      >
        <form.Field
          name='title'
          validators={{
            onChange: ({ value }) => {
              if (value.trim().length === 0) return 'Title is required';
              if (value.trim().length < 3) return 'Title must be at least 3 characters';
              if (value.trim().length > 100) return 'Title must be at most 100 characters';
            },
          }}
          children={(field) => (
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-400'>Title</label>
              <input
                className='rounded-lg border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-500'
                type='text'
                name='title'
                value={field.state.value}
                placeholder='What needs to be done?'
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className='text-sm text-red-500'>{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name='priority'
          children={(field) => (
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-400'>Priority</label>

              <PrioritySelector
                value={field.state.value}
                onChange={(value) => {
                  field.handleChange(value);
                }}
              />
            </div>
          )}
        />

        <form.Field name='type'>
          {(field) => (
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-400'>Type</label>

              <TypeSelector
                value={field.state.value}
                onChange={(value) => {
                  field.handleChange(value);
                }}
              />
            </div>
          )}
        </form.Field>

        <form.Field name='notes'>
          {(field) => (
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-400'>Notes</label>
              <TaskNotes
                expanded={true}
                value={field.state.value}
                onUpdate={(notes) => {
                  field.handleChange(notes);
                }}
              />
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <button
              disabled={!canSubmit}
              type='submit'
              onClick={() => form.handleSubmit()}
              className='items-center gap-2 rounded-xl px-8 py-2 enabled:bg-indigo-900 disabled:cursor-not-allowed disabled:bg-indigo-900/50'
            >
              <span>Add Task</span>
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default TaskForm;
