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

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={testQueryClient()}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Wrapper, ...options });
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
