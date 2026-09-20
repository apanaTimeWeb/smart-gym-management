// RESPONSIBILITY: Provides the programmatic confirm() API to Trainer features and owns only transient dialog state; no server/API data is stored here.
'use client';
import { createContext, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import TrainerConfirmModal from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmModal';
import type { TrainerConfirmContextValue, TrainerConfirmOptions } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmTypes';

export const ConfirmContext = createContext<TrainerConfirmContextValue | undefined>(undefined);

export function TrainerConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<TrainerConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const settle = useCallback((result: boolean) => {
    resolver?.(result);
    setResolver(null);
    setOptions(null);
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, [resolver]);

  const confirm = useCallback((nextOptions: TrainerConfirmOptions) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOptions(nextOptions);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => setResolver(() => resolve));
  }, []);

  const value = useMemo<TrainerConfirmContextValue>(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {options ? (
        <TrainerConfirmModal
          isOpen={isOpen}
          title={options.title}
          message={options.message}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          type={options.type}
          requireTypedConfirmation={options.requireTypedConfirmation}
          confirmationPhrase={options.confirmationPhrase}
          onConfirm={() => settle(true)}
          onCancel={() => settle(false)}
        />
      ) : null}
    </ConfirmContext.Provider>
  );
}
