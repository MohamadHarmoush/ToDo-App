import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { fetchTaskDetails } from '@/api';

export const usePrefetchOnVisible = (taskId: string, delay = 2000) => {
  const queryClient = useQueryClient();
  const elementRef = useRef<HTMLDivElement>(null);
  const hasPrefetched = useRef(false);
  const timeoutId = useRef<number | null>(null);

  const prefetch = useCallback(() => {
    if (hasPrefetched.current) return;

    queryClient.prefetchQuery({
      queryKey: ['task', taskId],
      queryFn: () => fetchTaskDetails(taskId),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
    hasPrefetched.current = true;
  }, [taskId]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId.current = setTimeout(prefetch, delay);
        } else if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = null;
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [prefetch, delay]);

  return elementRef;
};
