import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 minutes
    },
  },
});

createRoot(document.querySelector('#root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
    <ReactQueryDevtools />
  </QueryClientProvider>,
);
