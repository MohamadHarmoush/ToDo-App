import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect } from 'vitest';

import App from '@/App';
import type { Task } from '@/domain/Task';
import { delay } from '@/utils/helpers';

import { server } from '../setup';
import { render, screen, waitFor, within } from '../test-utils';

const mockedTasks: Task[] = [
  {
    id: '1',
    title: 'Pending Task 1',
    priority: 'High',
    type: 'Work',
    notes: 'Important work task',
    completed: false,
  },
  {
    id: '2',
    title: 'Pending Task 2',
    priority: 'Medium',
    type: 'Personal',
    notes: 'Personal task notes',
    completed: false,
  },
  {
    id: '3',
    title: 'Completed Task',
    priority: 'Low',
    type: 'General',
    notes: 'Done task',
    completed: true,
  },
];

describe('Tasks Page - Routing & Integration', () => {
  it('renders TasksPage component when navigating to /tasks route', async () => {
    server.use(http.get('*/todos', () => HttpResponse.json(mockedTasks)));

    render(<App />, { initialEntries: ['/tasks'] });

    // Verify we're on the tasks page by checking the heading
    await waitFor(() => {
      expect(screen.getByText(/We've added \d+ tasks/i)).toBeInTheDocument();
    });
  });

  it('displays the app layout with navigation on tasks page', async () => {
    server.use(http.get('*/todos', () => HttpResponse.json(mockedTasks)));

    render(<App />, { initialEntries: ['/tasks'] });

    const header = screen.getByRole('heading', { name: /Simple Todo/i });
    const nav = screen.getByRole('navigation');

    expect(header).toBeInTheDocument();

    const homeLink = within(nav).getByRole('link', { name: /home/i });
    const tasksLink = within(nav).getByRole('link', { name: /tasks/i });
    const aboutLink = within(nav).getByRole('link', { name: /about/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('text-gray-400');

    expect(tasksLink).toBeInTheDocument();
    expect(tasksLink).toHaveClass('text-blue-400');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveClass('text-gray-400');
  });

  it('shows loading state while fetching tasks & then shows tasks count once the success response is received', async () => {
    server.use(
      http.get('*/todos', async () => {
        await delay(200);
        return HttpResponse.json(mockedTasks);
      }),
    );

    render(<App />, { initialEntries: ['/tasks'] });

    const loadingIndicator = screen.getByTestId('loading-spinner');

    expect(loadingIndicator).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /We've added \d+ tasks/i })).toBeInTheDocument(),
    );
  });

  it('renders all tasks from the API', async () => {
    server.use(http.get('*/todos', () => HttpResponse.json(mockedTasks)));

    render(<App />, { initialEntries: ['/tasks'] });

    await waitFor(() => {
      expect(screen.getByText(/We've added 3 tasks/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending Task 1/i)).toBeInTheDocument();
    });

    const taskItems = screen.getAllByTestId('task-item');
    const taskTitles = taskItems.map((item) => within(item).getByRole('heading'));

    expect(taskTitles).toHaveLength(mockedTasks.length);
    expect(taskTitles[0]).toHaveTextContent(mockedTasks[0].title);
    expect(taskTitles[1]).toHaveTextContent(mockedTasks[1].title);
    expect(taskTitles[2]).toHaveTextContent(mockedTasks[2].title);
  });

  it('navigates from home page to tasks page and back', async () => {
    server.use(http.get('*/todos', () => HttpResponse.json(mockedTasks)));
    const user = userEvent.setup();

    render(<App />, { initialEntries: ['/'] });

    const nav = screen.getByRole('navigation');
    const homeLink = within(nav).getByText(/home/i);
    const homePageHeader = screen.getByRole('heading', { name: /Focus on what matters?/i });
    const tasksLink = within(nav).getByText(/tasks/i);

    expect(homeLink).toBeInTheDocument();
    expect(tasksLink).toBeInTheDocument();
    expect(homePageHeader).toBeInTheDocument();

    await user.click(tasksLink);
    expect(screen.getByRole('heading', { name: /Tasks page/i })).toBeInTheDocument();
  });
});
