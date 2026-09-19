// RESPONSIBILITY: Defines the Store domain types, interfaces, and state contracts for the Store module.
// HIGHLY RECOMMENDED additions: sku, barcode, costPrice, reorderThreshold on Product;
// customerId, gstAmount, returnStatus on Order.

import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { ManagerStoreReceiptData } from '@/app/manager/store/store_types/ManagerStoreThermalReceiptTypes';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';

export type ManagerStoreSortOrder = 'ASC' | 'DESC';
export type ManagerStoreProductFieldType = 'text' | 'number';
export type ReturnStatus = 'NONE' | 'PARTIAL' | 'FULL';

export interface StoreInitialData {
  products: Product[];
  orders: Order[];
  totalOrders: number;
  summary: StoreSummary | null;
}

export interface OrderItem {
  productId: string;
  qty: number;
  name: string;
  price: number;
  unit?: string;
}

export interface ManagerStoreViewModel {
  tab: string;
  setTab: (tab: string) => void;

  products: Product[];
  orders: Order[];
  totalOrders: number;
  summary: StoreSummary | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;

  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerStoreReceiptData | null;

  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (s: string) => void;
  stockFilter: string;
  setStockFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  sortOrder: ManagerStoreSortOrder;
  setSortOrder: (o: ManagerStoreSortOrder) => void;

  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  editProductId: string | null;
  editProductData: ProductFormValues | null;

  showOrderModal: boolean;
  setShowOrderModal: (show: boolean) => void;
  closeOrderModal: () => Promise<void>;
  orderItems: OrderItem[];
  orderMethod: string;
  setOrderMethod: (method: string) => void;
  customerPhone: string;
  setCustomerPhone: (p: string) => void;
  sendViaWhatsapp: boolean;
  setSendViaWhatsapp: (s: boolean) => void;

  hideToast: () => void;
  setPrintData: (data: ManagerStoreReceiptData | null) => void;

  loadAll: () => Promise<void>;
  openAddProduct: () => void;
  openEditProduct: (p: Product) => void;
  saveProduct: (data: ProductFormValues) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addToOrder: (p: Product) => void;
  removeFromOrder: (productId: string) => void;
  updateOrderQty: (productId: string, qty: number) => void;
  orderTotal: number;
  placeOrder: () => Promise<void>;
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  unit?: string;
  // HIGHLY RECOMMENDED — standard inventory fields
  sku?: string;               // Stock Keeping Unit
  barcode?: string;
  costPrice?: number;         // purchase price for margin calculations
  reorderThreshold?: number;  // alert when stock falls below this
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  total: number;
  method: string;
  status: string;
  notes?: string;
  createdAt: string;
  // HIGHLY RECOMMENDED
  customerId?: string;          // link to member if purchase is by a member
  gstAmount?: number;           // GST applied on this order
  returnStatus: ReturnStatus;   // return/refund tracking
  items?: { id: string; qty: number; price: number; product: { name: string; unit?: string } }[];
}

// ─── Store Summary ────────────────────────────────────────────────────────────
export interface StoreSummary {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: Product[];
}
