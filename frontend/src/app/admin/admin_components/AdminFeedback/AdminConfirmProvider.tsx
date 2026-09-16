"use client";
// DATA FLOW: Admin feature → confirm(options) → Provider state → AdminConfirmModal → Promise<boolean>.
// RESPONSIBILITY: Provides one shared Admin confirmation service and renders its modal.
import React, { createContext, useState, useCallback, type ReactNode } from 'react';
import AdminConfirmModal from '@/app/admin/admin_components/AdminFeedback/AdminConfirmModal';
import type { AdminConfirmContextType, AdminConfirmOptions } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmTypes';

export const ConfirmContext = createContext<AdminConfirmContextType | undefined>(undefined);

export function AdminConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AdminConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<{ resolve: (value: boolean) => void } | null>(null);
  const confirm = useCallback((nextOptions: AdminConfirmOptions) => {
    const normalized = nextOptions.type === 'danger' ? { ...nextOptions, requireTyping: nextOptions.requireTyping ?? true, confirmationPhrase: nextOptions.confirmationPhrase ?? 'CONFIRM' } : nextOptions;
    setOptions(normalized);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => setResolver({ resolve }));
  }, []);
  const handleConfirm = () => { resolver?.resolve(true); setIsOpen(false); setOptions(null); };
  const handleCancel = () => { resolver?.resolve(false); setIsOpen(false); setOptions(null); };
  return <ConfirmContext.Provider value={{ confirm }}>
    {children}
    {options && <AdminConfirmModal isOpen={isOpen} title={options.title} message={options.message} confirmText={options.confirmText} cancelText={options.cancelText} type={options.type} requireTyping={options.requireTyping} confirmationPhrase={options.confirmationPhrase} onConfirm={handleConfirm} onCancel={handleCancel} />}
  </ConfirmContext.Provider>;
}
