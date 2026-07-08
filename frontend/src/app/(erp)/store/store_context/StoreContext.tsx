"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { storeApi, type Product, type Order, type StoreSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { ErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';
import { EMPTY_PRODUCT_FORM } from '../store_utils/StoreSharedConstants';

interface OrderItem {
  productId: number;
  qty: number;
  name: string;
  price: number;
}

interface StoreContextType {
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

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState('Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<StoreSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [printData, setPrintData] = useState<ErpReceiptData | null>(null);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderMethod, setOrderMethod] = useState('Cash');

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, summaryRes] = await Promise.all([
        storeApi.getProducts(),
        storeApi.getOrders({ limit: '100' }),
        storeApi.getStoreSummary(),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data.orders);
      setSummary(summaryRes.data);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [showToast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const openAddProduct = useCallback(() => { 
    setEditProductId(null); 
    setProductForm(EMPTY_PRODUCT_FORM); 
    setShowProductModal(true); 
  }, []);
  
  const openEditProduct = useCallback((p: Product) => {
    setEditProductId(p.id);
    setProductForm({ 
      name: p.name, 
      category: p.category, 
      price: String(p.price), 
      stock: String(p.stock), 
      description: p.description || '' 
    });
    setShowProductModal(true);
  }, []);

  const saveProduct = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      const payload = { 
        ...productForm, 
        price: Number(productForm.price), 
        stock: Number(productForm.stock) 
      };
      
      if (editProductId) { 
        await storeApi.updateProduct(editProductId, payload); 
        showToast('Product updated!', 'success'); 
      } else { 
        await storeApi.createProduct(payload); 
        showToast('Product added!', 'success'); 
      }
      setShowProductModal(false); 
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editProductId, productForm, loadAll, showToast]);

  const deleteProduct = useCallback(async (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    try { 
      await storeApi.removeProduct(id); 
      showToast('Product deleted', 'success'); 
      await loadAll(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadAll, showToast]);

  const addToOrder = useCallback((p: Product) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.productId === p.id);
      if (existing) {
        return prev.map(i => i.productId === p.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { productId: p.id, qty: 1, name: p.name, price: p.price }];
    });
  }, []);

  const removeFromOrder = useCallback((productId: number) => {
    setOrderItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const orderTotal = useMemo(() => {
    return orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  }, [orderItems]);

  const placeOrder = useCallback(async () => {
    if (orderItems.length === 0) return showToast('Add items to order first', 'error');
    setSaving(true);
    try {
      const res = await storeApi.createOrder({ 
        items: orderItems.map(i => ({ productId: i.productId, qty: i.qty })), 
        method: orderMethod 
      }) as { data: Order };
      
      showToast('Order placed!', 'success');
      
      setPrintData({
        gymName: 'GymSmart Store', 
        gymPhone: '+91 83479 77566',
        receiptNo: `ORD-${res.data.id}`, 
        date: new Date().toLocaleDateString('en-IN'),
        customerName: 'Walk-in Customer',
        items: orderItems.map(i => ({ name: i.name, price: i.price, amount: i.price * i.qty })),
        total: orderTotal, 
        paymentMethod: orderMethod,
      });
      
      setTimeout(() => window.print(), 100);
      setOrderItems([]); 
      setShowOrderModal(false); 
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [orderItems, orderMethod, orderTotal, loadAll, showToast]);

  const value = useMemo(() => ({
    tab, setTab,
    products, orders, summary, loading, saving,
    toast, printData,
    showProductModal, setShowProductModal, editProductId, productForm, setProductForm,
    showOrderModal, setShowOrderModal, orderItems, orderMethod, setOrderMethod,
    hideToast, setPrintData, loadAll,
    openAddProduct, openEditProduct, saveProduct, deleteProduct,
    addToOrder, removeFromOrder, orderTotal, placeOrder
  }), [
    tab, products, orders, summary, loading, saving,
    toast, printData,
    showProductModal, editProductId, productForm,
    showOrderModal, orderItems, orderMethod,
    hideToast, loadAll, openAddProduct, openEditProduct, saveProduct, deleteProduct,
    addToOrder, removeFromOrder, orderTotal, placeOrder
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
