import * as v from 'valibot';
import { describe, it, expect } from 'vitest';

import { TitleSchema, TaskFormInputSchema } from '@/domain/schemas';

//TitleSchema
describe('Task schema', () => {
  it('accepts a valid title', () => {
    const result = v.safeParse(TitleSchema, 'Todo task 1');
    expect(result.success).toBe(true);
  });

  it('fails if the the title less than 3', () => {
    const result = v.safeParse(TitleSchema, 'T1');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues[0].message).toBe('Title must be at least 3 characters');
    }
  });

  it('fails if the title is empty', () => {
    const result = v.safeParse(TitleSchema, '');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues[0].message).toBe('Title must be at least 3 characters');
    }
  });
});

//TaskFormInputSchema
describe('TaskFormInputSchema', () => {
  const validInput = {
    title: 'Todo task',
    priority: 'Medium',
    type: 'Personal',
    notes: '',
  };

  it('parses a valid input object', () => {
    const result = v.safeParse(TaskFormInputSchema, validInput);

    expect(result.success).toBe(true);
  });

  it('fails if the input is invalid', () => {
    const invalidInput = { ...validInput, priority: 'Highest' };
    const result = v.safeParse(TaskFormInputSchema, invalidInput);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues.length).toBeGreaterThan(0);
    }
  });
});
