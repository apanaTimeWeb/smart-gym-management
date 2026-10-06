// RESPONSIBILITY: Renders ManagerConfirmProvider's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import ManagerConfirmModal from '@/components/ui/manager_confirm_modal/ManagerConfirmModal';
import type { ManagerConfirmOptions, ManagerConfirmContextType } from '@/components/ui/manager_confirm_provider/ManagerConfirmProviderTypes';
import type { ReactNode } from 'react';


/**
 * @description Renders/orchestrates the ManagerConfirmProvider user interface for the manager infrastructure module without owning sibling business logic.
 * @dependencies @/components/ui/manager_confirm_modal/ManagerConfirmModal; @/components/ui/manager_confirm_provider/ManagerConfirmProviderTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ConfirmContext = createContext<ManagerConfirmContextType | undefined>(undefined);

/** @description Renders the ManagerConfirmProvider component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
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
        <ManagerConfirmModal data-testid="ui-managerconfirmprovider-managerconfirmmodal-1"
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

/**
 * @description Provides access to the module-scoped destructive-action confirmation workflow. It reads the confirmation state from ManagerConfirmProvider; callers must use it for destructive actions rather than window.confirm. @dependencies Uses the module route shell or confirmation provider plus approved application infrastructure only. @edge-case Preserves safe fallback/recovery behavior and avoids exposing implementation details to the user. 
 */
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ManagerConfirmProvider");
  return context;
};
