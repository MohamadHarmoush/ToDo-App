import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

import { createTask } from '@/api';
import { TitleSchema } from '@/domain/schemas';
import type { TaskFormInput } from '@/domain/TaskFormInput';

import PrioritySelector from './PrioritySelector';
import { TaskNotes } from './task/TaskNotes';
import TypeSelector from './TypeSelector';

const formDefaultValues: TaskFormInput = {
  title: '',
  priority: 'Medium',
  type: 'Personal',
  notes: '',
};

const TaskForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (_result, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ['tasks'] });
      form.reset();
    },
  });
  const form = useForm({
    defaultValues: formDefaultValues,
    onSubmit: async ({ value }) => {
      const input: TaskFormInput = {
        title: value.title.trim(),
        priority: value.priority,
        type: value.type,
        notes: value.notes.trim(),
      };

      mutate(input);
    },
  });

  return (
    <div className='bg-background-color rounded-2xl border border-gray-700 p-5 shadow-lg'>
      <div className='text-color pb-4 text-sm font-semibold tracking-widest uppercase'>
        New Task
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={`flex flex-col gap-4 transition-colors hover:border-gray-600`}
      >
        <form.Field
          name='title'
          validators={{
            onChange: TitleSchema,
          }}
          children={(field) => (
            <div className='flex flex-col gap-1'>
              <label className='text-color text-sm' htmlFor='title'>
                Title
              </label>
              <input
                className='bg-background-color rounded-lg border border-gray-700 p-2 placeholder-gray-500'
                type='text'
                name='title'
                id='title'
                value={field.state.value}
                placeholder='What needs to be done?'
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className='text-sm text-red-500'>
                  {String(field.state.meta.errors[0]?.message)}
                </span>
              )}
            </div>
          )}
        />

        <form.Field
          name='priority'
          children={(field) => (
            <div className='flex flex-col gap-1'>
              <label htmlFor='priority' className='text-color text-sm'>
                Priority
              </label>

              <PrioritySelector
                id='priority'
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
              <label htmlFor='type' className='text-color text-sm'>
                Type
              </label>

              <TypeSelector
                id='type'
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
              <label htmlFor='notes' className='text-color text-sm'>
                Notes
              </label>
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
              className='items-center gap-2 rounded-xl px-8 py-2 text-white enabled:bg-indigo-900 disabled:cursor-not-allowed disabled:bg-indigo-900/50'
            >
              {isPending && <ClipLoader data-testid='loading-spinner' size={24} color='white' />}
              {!isPending && <span>Add Task</span>}
            </button>
          )}
        </form.Subscribe>
      </form>
      <div className='pt-2 text-sm text-red-500'>{error?.message}</div>
    </div>
  );
};

export default TaskForm;
