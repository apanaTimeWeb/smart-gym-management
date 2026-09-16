'use client';
// RESPONSIBILITY: Test-only providers used by Manager behavior tests; mounts real feature components against isolated TanStack Query and confirmation contexts.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ManagerConfirmProvider } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import type { ReactNode } from 'react';

export function ManagerTestProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }));
  return <QueryClientProvider client={queryClient}><ManagerConfirmProvider>{children}</ManagerConfirmProvider></QueryClientProvider>;
}
