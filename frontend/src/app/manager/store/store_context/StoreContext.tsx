// RESPONSIBILITY: Provides UI orchestration state to the Store module hierarchy. Async data is managed in useStoreLogic.
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { StoreContextType, StoreInitialData } from '@/app/manager/store/store_types/store_types';
import { useStoreLogic } from '@/app/manager/store/store_context/useStoreLogic';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children, initialData }: { children: React.ReactNode, initialData?: StoreInitialData }) {
 const logic = useStoreLogic(initialData);

 const {
   tab, products, orders, totalOrders, summary, fetchState, saving,
   toast, printData, search, debouncedSearch, currentPage,
   showProductModal, editProductId, editProductData,
   showOrderModal, orderItems, orderMethod, orderTotal,
   customerPhone, sendViaWhatsapp,
   startDate, endDate, sortOrder
 } = logic;

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const value = useMemo(() => logic, [
   tab, products, orders, totalOrders, summary, fetchState, saving,
   toast, printData, search, debouncedSearch, currentPage,
   showProductModal, editProductId, editProductData,
   showOrderModal, orderItems, orderMethod, orderTotal,
   customerPhone, sendViaWhatsapp,
   startDate, endDate, sortOrder
 ]);

 return (
 <StoreContext.Provider value={value}>
 {children}
 </StoreContext.Provider>
 );
}

export function useStoreContext() {
 const context = useContext(StoreContext);
 if (context === undefined) {
 throw new Error('useStoreContext must be used within a StoreProvider');
 }
 return context;
}
