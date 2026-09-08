'use client';
// RESPONSIBILITY: Wraps all Manager pages with TanStack Query's QueryClientProvider.
// Mirrors AdminQueryProvider and SuperadminQueryProvider patterns.
// DATA FLOW: layout.tsx → ManagerQueryProvider → all manager pages

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function ManagerQueryProvider({ children }: { children: React.ReactNode }) {
  // useState ensures each session gets its own QueryClient instance (no cross-request state sharing)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
