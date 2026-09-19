// RESPONSIBILITY: Core infrastructure component for routing, loading, and error boundaries in the module.
'use client';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
export function SuperadminQueryProvider({ children }: {
    children: ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
            },
        },
    }));
    return (<QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>);
}
