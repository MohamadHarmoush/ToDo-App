import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect } from 'vitest';

import TaskForm from '@/components/TaskForm';
import type { Task } from '@/domain/Task';
import type { TaskFormInput } from '@/domain/TaskFormInput';
import { delay } from '@/utils/helpers';

import { server } from '../setup';
import { render, screen, waitFor, getSelectorButtonByLabel } from '../test-utils';

const mockkedTask: Task = {
  id: '1',
  title: 'Todo task 1',
  priority: 'High',
  type: 'General',
  notes: 'Todo task notes',
  completed: false,
};

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

  it('shows a validation error when the title is too short', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const titleInput = screen.getByPlaceholderText('What needs to be done?');

    await user.type(titleInput, 'To');
    await user.tab();

    await waitFor(() =>
      expect(screen.getByText(/Title must be at least 3 characters/i)).toBeInTheDocument(),
    );
  });

  it('disables the submit button when the title is invaild', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const inputTitle = screen.getByRole('textbox', { name: 'Title' });
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    await user.type(inputTitle, 'T');

    expect(addButton).toBeDisabled();
  });

  it('user can change priority selection', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const priorityButton = getSelectorButtonByLabel('Priority');
    await user.click(priorityButton);

    const highOption = screen.getByRole('button', { name: 'High' });
    await user.click(highOption);

    expect(priorityButton).toHaveTextContent('High');
  });

  it('submits the form with correct values when submit button is clicked', async () => {
    let capturedRequestBody: TaskFormInput | null = null;

    server.use(
      http.post('*/todos', async ({ request }) => {
        capturedRequestBody = (await request.json()) as TaskFormInput;
        await delay(100);
        return HttpResponse.json(mockkedTask);
      }),
    );
    const user = userEvent.setup();

    render(<TaskForm />);

    const titleInput = screen.getByLabelText('Title');

    const priorityButton = getSelectorButtonByLabel('Priority');
    const typeButton = getSelectorButtonByLabel('Type');
    const notesInput = screen.getByRole('textbox', { name: /notes/i });
    const submitButton = screen.getByRole('button', { name: /add task/i });

    await user.type(titleInput, mockkedTask.title);

    await user.click(priorityButton);
    const highOption = screen.getByRole('button', { name: 'High' });
    await user.click(highOption);

    await user.click(typeButton);
    const generalOption = screen.getByRole('button', { name: /general/i });
    await user.click(generalOption);

    await user.type(notesInput, mockkedTask.notes);

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    // Verify loading spinner disappears after submission completes
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(capturedRequestBody).toEqual({
      title: mockkedTask.title,
      priority: mockkedTask.priority,
      type: mockkedTask.type,
      notes: mockkedTask.notes,
    });

    expect(titleInput).toHaveValue('');
    expect(notesInput).toHaveValue('');
    expect(priorityButton).toHaveTextContent('Medium');
    expect(typeButton).toHaveTextContent('Personal');
  });

  it('shows an API error message when the server returns an error', async () => {
    server.use(
      http.post('*/todos', () => HttpResponse.json({}, { status: 400, statusText: 'Bad Request' })),
    );
    const user = userEvent.setup();

    render(<TaskForm />);

    const titleInput = screen.getByLabelText('Title');

    const priorityButton = getSelectorButtonByLabel('Priority');
    const typeButton = getSelectorButtonByLabel('Type');
    const notesInput = screen.getByRole('textbox', { name: /notes/i });
    const submitButton = screen.getByRole('button', { name: /add task/i });

    await user.type(titleInput, mockkedTask.title);

    await user.click(priorityButton);
    const highOption = screen.getByRole('button', { name: 'High' });
    await user.click(highOption);

    await user.click(typeButton);
    const generalOption = screen.getByRole('button', { name: /general/i });
    await user.click(generalOption);

    await user.type(notesInput, mockkedTask.notes);

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
    });
  });
});
