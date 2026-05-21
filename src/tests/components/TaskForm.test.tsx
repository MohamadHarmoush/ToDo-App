import { userEvent } from '@testing-library/user-event';
import { use } from 'react';
import { describe, it, expect } from 'vitest';

import TaskForm from '@/components/TaskForm';

import { render, screen, waitFor } from '../test-utils';

describe('TaskForm', () => {
  it('user can type in the title & notes input boxex', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const titleInput = screen.getByLabelText('Title');
    // or
    // const titleInput = screen.getByPlaceholderText('What needs to be done?');
    const notesInput = screen.getByRole('textbox', { name: 'Notes' });
    await user.type(titleInput, 'Todo 1');
    await user.type(notesInput, 'notes for todo 1');

    expect(titleInput).toHaveValue('Todo 1');
    expect(notesInput).toHaveValue('notes for todo 1');
  });

  it('shows a validation errpr when the title is too short', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const titleInput = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    await user.type(titleInput, 'Todo 1');
    await user.click(addButton);

    await waitFor(() =>
      expect(screen.getByText(/Title must be at least 3 characters/i)).toBeInTheDocument(),
    );
  });
});
