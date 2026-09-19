import type { ReactNode } from 'react';

export interface ConfirmProviderProps {
  children: ReactNode;
}

export interface SuperadminConfirmResolverState {
  resolve: (value: boolean) => void;
}
