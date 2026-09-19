import type { ReactNode } from 'react';

export interface SuperadminConfirmProviderProps {
  children: ReactNode;
}

export interface SuperadminConfirmResolverState {
  resolve: (value: boolean) => void;
}
