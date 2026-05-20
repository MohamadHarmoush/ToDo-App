import { describe, it, expect } from 'vitest';

import type { Task } from '@/domain/Task';
import { taskReducer } from '@/utils/TaskReducer';

const mockkedTask: Task = {
  id: '1',
  title: 'Todo task 1',
  priority: 'Medium',
  type: 'General',
  notes: 'Todo task notes',
  completed: false,
};

describe('TaskReducer', () => {
  // ADD_TODO
  it('add a task to an empty list', () => {
    const result = taskReducer([], { type: 'ADD_TODO', payload: mockkedTask });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockkedTask);
  });

  // UPDATE_TODO
  it('updates only the matching task by id', () => {
    const updatedTask: Task = { ...mockkedTask, completed: true };
    const result = taskReducer([mockkedTask], { type: 'UPDATE_TODO', payload: updatedTask });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(updatedTask);
  });

  //REMOVE_TODO
  it('remove only the matching task by id', () => {
    const other = { ...mockkedTask, id: '2', title: 'Todo task 2', completed: true };
    const result = taskReducer([mockkedTask, other], { type: 'REMOVE_TODO', payload: { id: '2' } });

    expect(result).toHaveLength(1);
    expect(result).not.toContain(other);
    expect(result).toContain(mockkedTask);
  });

  //REMOVE_TODO
  it('does not remove any item, if no matching task with the id ', () => {
    const result = taskReducer([mockkedTask], { type: 'REMOVE_TODO', payload: { id: '2' } });

    expect(result).toHaveLength(1);
    expect(result).toContain(mockkedTask);
  });

  //SET_TODOS
  it('replace the entire list', () => {
    const newList = [{ ...mockkedTask, id: '2', title: 'Todo task 2', completed: true }];
    const result = taskReducer([mockkedTask], { type: 'SET_TODOS', payload: newList });

    expect(result).not.toContain(mockkedTask);
    expect(result).toEqual(newList);
  });
});
