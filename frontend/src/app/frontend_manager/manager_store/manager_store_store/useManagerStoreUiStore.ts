/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import { EMPTY_PRODUCT_FORM } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { ProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { ManagerStoreReceiptData } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreThermalReceiptTypes';
import type { Product, OrderItem } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


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

/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreUiStore.
 * @dependencies Uses ManagerStoreProductFormTypes, ManagerToastTypes, ManagerStoreThermalReceiptTypes, ManagerStoreTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
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
