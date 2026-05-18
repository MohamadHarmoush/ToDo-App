import * as v from 'valibot';

export const TitleSchema = v.pipe(
  v.string(),
  v.minLength(1, 'Title is required'),
  v.minLength(3, 'Title must be at least 3 characters'),
  v.maxLength(100, 'Title must be at most 100 characters'),
);

export const PrioritySchema = v.picklist(['Low', 'Medium', 'High']);
export const TaskTypeSchema = v.picklist([
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Finance',
  'General',
]);

export const TaskSchema = v.object({
  id: v.string(),
  title: v.pipe(v.string(), v.minLength(1)),
  priority: PrioritySchema,
  type: TaskTypeSchema,
  notes: v.string(),
  completed: v.boolean(),
});

export const TaskArraySchema = v.array(TaskSchema);

export const TaskFormInputSchema = v.object({
  title: TitleSchema,
  priority: PrioritySchema,
  type: TaskTypeSchema,
  notes: v.string(),
});
