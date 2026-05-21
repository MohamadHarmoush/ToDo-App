import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as mainRender, type RenderOptions } from '@testing-library/react';

const testQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

function Wrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={testQueryClient()}>{children}</QueryClientProvider>;
}

export function render(ui: React.ReactElement, options?: RenderOptions) {
  return mainRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
