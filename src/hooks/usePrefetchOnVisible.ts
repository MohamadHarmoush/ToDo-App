import { useQuery, useQueryClient, queryOptions } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { fetchTaskDetails } from '@/api';

const fetchTaskOptions = (taskId: string) =>
  queryOptions({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskDetails(taskId),
    staleTime: 5 * 60 * 1000, // 5 minutes,
  });

export const usePrefetchOnVisible = (taskId: string, delay = 2000) => {
  const queryClient = useQueryClient();
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<number | null>(null);

  const prefetch = useCallback(() => {
    queryClient.prefetchQuery(fetchTaskOptions(taskId));
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
