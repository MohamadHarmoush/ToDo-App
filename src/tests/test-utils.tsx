import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const testQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

interface RenderWithRouterOptions extends RenderOptions {
  initialEntries?: string[];
}

function customRender(ui: React.ReactElement, options: RenderWithRouterOptions = {}) {
  const { initialEntries = ['/'], ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient()}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    ),
    ...renderOptions,
  });
}

// Get a dropdown/selector button by its label text.
export function getSelectorButtonByLabel(labelText: string): HTMLElement {
  const label = screen.getByText(labelText);
  const button = label.closest('div')?.querySelector('button');
  if (!button) {
    throw new Error(`Button for label "${labelText}" not found`);
  }
  return button as HTMLElement;
}

export * from '@testing-library/react';
export { customRender as render };
