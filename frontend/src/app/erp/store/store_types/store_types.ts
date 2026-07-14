// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Store module.

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { type ProductFormValues } from '@/app/erp/store/store_utils/StoreSharedConstants';
import React from 'react';

export interface StoreInitialData {
  products: Product[];
  orders: Order[];
  totalOrders: number;
  summary: StoreSummary | null;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface OrderItem {
 productId: number;
 qty: number;
 name: string;
 price: number;
}

export interface StoreContextType {
 tab: string;
 setTab: (tab: string) => void;
 
 products: Product[];
 orders: Order[];
 totalOrders: number;
 summary: StoreSummary | null;
 fetchState: FetchState;
 saving: boolean;
 
  toast: { message: string; type: ToastType } | null;
  printData: ErpReceiptData | null;
  
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  
  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  sortOrder: 'ASC' | 'DESC';
  setSortOrder: (o: 'ASC' | 'DESC') => void;
 
 showProductModal: boolean;
 setShowProductModal: (show: boolean) => void;
 editProductId: number | null;
 editProductData: ProductFormValues | null;
 
 showOrderModal: boolean;
 setShowOrderModal: (show: boolean) => void;
 orderItems: OrderItem[];
 orderMethod: string;
 setOrderMethod: (method: string) => void;
 customerPhone: string;
 setCustomerPhone: (p: string) => void;
 sendViaWhatsapp: boolean;
 setSendViaWhatsapp: (s: boolean) => void;
 
 hideToast: () => void;
 setPrintData: (data: ErpReceiptData | null) => void;
 
 loadAll: () => Promise<void>;
 openAddProduct: () => void;
 openEditProduct: (p: Product) => void;
 saveProduct: (data: ProductFormValues) => Promise<void>;
 deleteProduct: (id: number) => Promise<void>;
 
 addToOrder: (p: Product) => void;
 removeFromOrder: (productId: number) => void;
 orderTotal: number;
 placeOrder: () => Promise<void>;
}

export interface Product {
  id: number; name: string; category: string; price: number;
  stock: number; description?: string; imageUrl?: string; isActive: boolean;
}
export interface Order {
  id: number; total: number; method: string; status: string;
  notes?: string; createdAt: string;
  items?: { id: number; qty: number; price: number; product: { name: string } }[];
}
export interface StoreSummary {
  totalProducts: number; totalOrders: number;
  totalRevenue: number; lowStockProducts: Product[];
}
