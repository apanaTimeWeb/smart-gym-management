import { type Product, type Order, type StoreSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { ErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';
import { EMPTY_PRODUCT_FORM } from '../store_utils/StoreSharedConstants';
import React from 'react';

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
  summary: StoreSummary | null;
  loading: boolean;
  saving: boolean;
  
  toast: { message: string; type: ToastType } | null;
  printData: ErpReceiptData | null;
  
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  editProductId: number | null;
  productForm: typeof EMPTY_PRODUCT_FORM;
  setProductForm: React.Dispatch<React.SetStateAction<typeof EMPTY_PRODUCT_FORM>>;
  
  showOrderModal: boolean;
  setShowOrderModal: (show: boolean) => void;
  orderItems: OrderItem[];
  orderMethod: string;
  setOrderMethod: (method: string) => void;
  
  hideToast: () => void;
  setPrintData: (data: ErpReceiptData | null) => void;
  
  loadAll: () => Promise<void>;
  openAddProduct: () => void;
  openEditProduct: (p: Product) => void;
  saveProduct: (e: React.FormEvent) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  
  addToOrder: (p: Product) => void;
  removeFromOrder: (productId: number) => void;
  orderTotal: number;
  placeOrder: () => Promise<void>;
}
