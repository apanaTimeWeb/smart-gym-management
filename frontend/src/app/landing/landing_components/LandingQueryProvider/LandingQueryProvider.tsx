'use client';
// RESPONSIBILITY: Provides an isolated TanStack Query client for Landing module mutations and future server-state flows.
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { LandingQueryProviderProps } from '@/app/landing/landing_types/landing_types';

export default function LandingQueryProvider({ children }: LandingQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
