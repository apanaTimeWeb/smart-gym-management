// DATA FLOW: Superadmin feature action → confirmation context → modal decision → mutation continuation/cancellation.
// RESPONSIBILITY: Provides a programmatic confirm() API to all SUPERADMIN components via React Context. Renders a single shared SuperadminConfirmModal at the root level. No async data — sync UI state only.
'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { SuperadminConfirmContextValue, SuperadminConfirmOptions } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmTypes';
import type { SuperadminConfirmProviderProps, SuperadminConfirmResolverState } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProviderTypes';
import SuperadminConfirmModal from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmModal';
const ConfirmContext = createContext<SuperadminConfirmContextValue | undefined>(undefined);
export function SuperadminConfirmProvider({ children }: SuperadminConfirmProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<SuperadminConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<SuperadminConfirmResolverState | null>(null);
    const confirm = useCallback((options: SuperadminConfirmOptions) => {
        setOptions(options);
        setIsOpen(true);
        return new Promise<boolean>((resolve) => {
            setResolver({ resolve });
        });
    }, []);
    const handleConfirm = () => {
        resolver?.resolve(true);
        setResolver(null);
        setOptions(null);
        setIsOpen(false);
    };
    const handleCancel = () => {
        resolver?.resolve(false);
        setResolver(null);
        setOptions(null);
        setIsOpen(false);
    };
    return (<ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (<SuperadminConfirmModal isOpen={isOpen} title={options.title} message={options.message} confirmText={options.confirmText} cancelText={options.cancelText} type={options.type} onConfirm={handleConfirm} onCancel={handleCancel}/>)}
    </ConfirmContext.Provider>);
}
export const useSuperadminConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context)
        throw new Error("useSuperadminConfirm must be used within SuperadminConfirmProvider");
    return context;
};
