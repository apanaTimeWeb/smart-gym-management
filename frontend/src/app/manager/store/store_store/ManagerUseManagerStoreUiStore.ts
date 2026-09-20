// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import { EMPTY_PRODUCT_FORM } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import type { ManagerStoreReceiptData } from '@/app/manager/store/store_types/ManagerStoreThermalReceiptTypes';
import type { Product, OrderItem } from '@/app/manager/store/store_types/ManagerStoreTypes';


interface ManagerStoreUiState {
  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerStoreReceiptData | null;
  showProductModal: boolean;
  editProductId: string | null;
  editProductData: ProductFormValues | null;
  showOrderModal: boolean;
  orderItems: OrderItem[];
  orderMethod: string;
  customerPhone: string;
  sendViaWhatsapp: boolean;
  saving: boolean;
  setSaving: (saving: boolean) => void;
  setToast: (toast: ManagerStoreUiState['toast']) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  setPrintData: (data: ManagerStoreReceiptData | null) => void;
  setShowProductModal: (show: boolean) => void;
  openAddProduct: () => void;
  openEditProduct: (product: Product) => void;
  setShowOrderModal: (show: boolean) => void;
  setOrderItems: (items: OrderItem[] | ((previous: OrderItem[]) => OrderItem[])) => void;
  setOrderMethod: (method: string) => void;
  setCustomerPhone: (phone: string) => void;
  setSendViaWhatsapp: (value: boolean) => void;
  resetOrder: () => void;
}

export const useManagerStoreUiStore = create<ManagerStoreUiState>((set) => ({
  toast: null,
  printData: null,
  showProductModal: false,
  editProductId: null,
  editProductData: null,
  showOrderModal: false,
  orderItems: [],
  orderMethod: 'Cash',
  customerPhone: '',
  sendViaWhatsapp: false,
  saving: false,
  setSaving: (saving) => set({ saving }),
  setToast: (toast) => set({ toast }),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  setPrintData: (printData) => set({ printData }),
  setShowProductModal: (showProductModal) => set({ showProductModal }),
  openAddProduct: () => set({ editProductId: null, editProductData: EMPTY_PRODUCT_FORM as ProductFormValues, showProductModal: true }),
  openEditProduct: (product) => set({
    editProductId: product.id,
    editProductData: { name: product.name, category: product.category, price: product.price, stock: product.stock, description: product.description || '', unit: product.unit || '' },
    showProductModal: true }),
  setShowOrderModal: (showOrderModal) => set({ showOrderModal }),
  setOrderItems: (orderItems) => set((state) => ({ orderItems: typeof orderItems === 'function' ? orderItems(state.orderItems) : orderItems })),
  setOrderMethod: (orderMethod) => set({ orderMethod }),
  setCustomerPhone: (customerPhone) => set({ customerPhone }),
  setSendViaWhatsapp: (sendViaWhatsapp) => set({ sendViaWhatsapp }),
  resetOrder: () => set({ orderItems: [], customerPhone: '', sendViaWhatsapp: false, showOrderModal: false }) }));
