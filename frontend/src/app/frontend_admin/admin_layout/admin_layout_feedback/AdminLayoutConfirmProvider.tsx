"use client";
// RESPONSIBILITY: Provides one shared Admin confirmation service and renders its modal.
// DATA FLOW: Admin feature → confirm(options) → Provider state → AdminLayoutConfirmModal → Promise<boolean>.
import React, { createContext, useState, useCallback, useMemo } from 'react';
import AdminLayoutConfirmModal from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutConfirmModal';
import type { AdminConfirmContextType, AdminConfirmOptions } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutConfirmTypes';
import type { AdminConfirmProviderProps } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutConfirmProviderTypes';

export const ConfirmContext = createContext<AdminConfirmContextType | undefined>(undefined);

/**
 * AdminLayoutConfirmProvider renders the admin confirm provider UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export function AdminLayoutConfirmProvider({ children }: AdminConfirmProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AdminConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<{ resolve: (value: boolean) => void } | null>(null);
  const confirm = useCallback((nextOptions: AdminConfirmOptions) => {
    const normalized = { ...nextOptions, requireTyping: nextOptions.requireTyping ?? false, confirmationPhrase: nextOptions.confirmationPhrase ?? 'CONFIRM' };
    setOptions(normalized);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => setResolver({ resolve }));
  }, []);
  const handleConfirm = () => { resolver?.resolve(true); setIsOpen(false); setOptions(null); };
  const handleCancel = () => { resolver?.resolve(false); setIsOpen(false); setOptions(null); };
  const contextValue = useMemo(() => ({ confirm }), [confirm]);
  return <ConfirmContext.Provider value={contextValue}>
    {children}
    {options && <AdminLayoutConfirmModal isOpen={isOpen} title={options.title} message={options.message} confirmText={options.confirmText} cancelText={options.cancelText} type={options.type} requireTyping={options.requireTyping} confirmationPhrase={options.confirmationPhrase} onConfirm={handleConfirm} onCancel={handleCancel} />}
  </ConfirmContext.Provider>;
}
