'use client';
// RESPONSIBILITY: Provides a programmatic confirm() API to all MANAGER components via React Context. Renders a single shared ManagerConfirmModal at the root level. No async data — sync UI state only.
import { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import ManagerConfirmModal from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmModal';
import type { ManagerConfirmOptions, ManagerConfirmContextType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerConfirmProviderTypes';

const ConfirmContext = createContext<ManagerConfirmContextType | undefined>(undefined);

export function ManagerConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ManagerConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<{ resolve: (value: boolean) => void } | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const confirm = useCallback((options: ManagerConfirmOptions) => {
    resolver?.resolve(false);
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOptions(options);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver({ resolve });
    });
  }, [resolver]);

  const restoreFocus = () => {
    const previous = previousFocusRef.current;
    previousFocusRef.current = null;
    window.requestAnimationFrame(() => previous?.focus());
  };

  const handleConfirm = () => {
    resolver?.resolve(true);
    setResolver(null);
    setOptions(null);
    setIsOpen(false);
    restoreFocus();
  };

  const handleCancel = () => {
    resolver?.resolve(false);
    setResolver(null);
    setOptions(null);
    setIsOpen(false);
    restoreFocus();
  };

  const contextValue = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      {options && (
        <ManagerConfirmModal
          isOpen={isOpen}
          title={options.title}
          message={options.message}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          type={options.type}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ManagerConfirmProvider");
  return context;
};
