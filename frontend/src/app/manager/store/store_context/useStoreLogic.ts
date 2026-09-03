// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the gym product Store module.
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { storeApi } from '@/app/manager/store/store_api/store_api';
import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/store_types';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { ManagerReceiptData } from '@/app/manager/manager_components/ManagerShared/ManagerThermalReceipt';
import { EMPTY_PRODUCT_FORM, ERR_EMPTY_ORDER, ProductFormValues } from '@/app/manager/store/store_utils/StoreSharedConstants';
import { GYM_DETAILS } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { StoreContextType, OrderItem, StoreInitialData, FetchState } from '@/app/manager/store/store_types/store_types';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';

export function useStoreLogic(initialData?: StoreInitialData | null): StoreContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'Products';
  
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const sortOrder = (searchParams.get('sortOrder') as 'ASC' | 'DESC') || 'DESC';
  
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'tab') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const setTab = useCallback((val: string) => setUrlParam('tab', val), [setUrlParam]);
  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setStartDate = useCallback((val: string) => setUrlParam('startDate', val || null), [setUrlParam]);
  const setEndDate = useCallback((val: string) => setUrlParam('endDate', val || null), [setUrlParam]);
  const setSortOrder = useCallback((val: 'ASC' | 'DESC') => setUrlParam('sortOrder', val), [setUrlParam]);
  const [products, setProducts] = useState<Product[]>(initialData?.products || []);
  const [orders, setOrders] = useState<Order[]>(initialData?.orders || []);
  const [totalOrders, setTotalOrders] = useState<number>(initialData?.totalOrders || 0);
  const [summary, setSummary] = useState<StoreSummary | null>(initialData?.summary || null);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [saving, setSaving] = useState(false);
  const isFirstRender = React.useRef(true);
 
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [printData, setPrintData] = useState<ManagerReceiptData | null>(null);

 const [showProductModal, setShowProductModal] = useState(false);
 const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<ProductFormValues | null>(null);

 const [showOrderModal, setShowOrderModal] = useState(false);
 const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
 const [orderMethod, setOrderMethod] = useState('Cash');
 const [customerPhone, setCustomerPhone] = useState('');
 const [sendViaWhatsapp, setSendViaWhatsapp] = useState(false);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const loadAll = useCallback(async () => {
 setFetchState('loading');
 try {
      const params: Record<string, string> = { 
        limit: '10', 
        page: currentPage.toString(),
        sortOrder
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const [productsRes, ordersRes, summaryRes] = await Promise.all([
        storeApi.getProducts(params),
        storeApi.getOrders(params),
        storeApi.getStoreSummary(),
      ]);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data as any).products || []);
      setOrders(ordersRes.data.orders || []);
      setTotalOrders(ordersRes.data.total || 0);
      setSummary(summaryRes.data);
 } catch (e) { 
 showToast((e as Error).message, 'error'); 
 setFetchState('error');
 } finally { 
 setFetchState('success'); 
 }
 }, [showToast, currentPage, debouncedSearch, startDate, endDate, sortOrder]);

  useEffect(() => { 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialData) return;
    }
    loadAll(); 
  }, [loadAll, initialData]);

  const openAddProduct = useCallback(() => { 
    setEditProductId(null); 
    setEditProductData(EMPTY_PRODUCT_FORM as unknown as ProductFormValues); 
    setShowProductModal(true); 
  }, []);
 
 const openEditProduct = useCallback((p: Product) => {
 setEditProductId(p.id);
 setEditProductData({ 
 name: p.name, 
 category: p.category, 
 price: p.price, 
 stock: p.stock, 
 description: p.description || '' 
 });
 setShowProductModal(true);
 }, []);

  const saveProduct = useCallback(async (data: Partial<ProductFormValues>) => {
    setSaving(true);
    try {
      if (editProductId) {
        const res = await storeApi.updateProduct(editProductId, data);
        const updatedProduct = res.data || data;
        setProducts(prev => prev.map(p => String(p.id) === String(editProductId) ? { ...p, ...updatedProduct } as unknown as Product : p));
        showToast(res.message || 'Product updated successfully', 'success');
      } else {
        const payload = { ...data, status: data.stock && data.stock > 0 ? 'In Stock' : 'Out of Stock' } as Partial<Product>;
        const res = await storeApi.createProduct(payload);
        const newProduct = res.data ? res.data : { ...payload, id: `prod-${Date.now()}`, sales: 0 } as unknown as Product;
        setProducts(prev => [newProduct, ...prev]);
        setSummary(prev => prev ? { ...prev, totalProducts: prev.totalProducts + 1 } : null);
        showToast(res.message || 'Product added successfully', 'success');
      }
      setShowProductModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editProductId, showToast]);

  const deleteProduct = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Remove Product', message: 'Delete this product?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await storeApi.removeProduct(id);
      setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
      setSummary(prev => prev ? { ...prev, totalProducts: Math.max(0, prev.totalProducts - 1) } : null);
      showToast(res.message || 'Product deleted', 'success');
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [showToast, confirm]);

 const addToOrder = useCallback((p: Product) => {
 setOrderItems(prev => {
 const existing = prev.find(i => i.productId === p.id);
 if (existing) {
 return prev;
 }
 return [...prev, { productId: p.id, qty: 1, name: p.name, price: p.price }];
 });
 }, []);

 const removeFromOrder = useCallback((productId: string) => {
 setOrderItems(prev => prev.filter(i => i.productId !== productId));
 }, []);

 const updateOrderQty = useCallback((productId: string, qty: number) => {
 if (qty <= 0) {
 removeFromOrder(productId);
 return;
 }
 setOrderItems(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i));
 }, [removeFromOrder]);

 const orderTotal = useMemo(() => {
 return orderItems.reduce((s, i) => s + i.price * i.qty, 0);
 }, [orderItems]);

  const placeOrder = useCallback(async () => {
    if (orderItems.length === 0) return;
    setSaving(true);
    try {
      const res = await storeApi.createOrder({
        items: orderItems.map(i => ({ productId: i.productId, qty: i.qty, price: i.price })),
        method: orderMethod,
        notes: sendViaWhatsapp && customerPhone ? `WhatsApp: ${customerPhone}` : undefined,
        customerName: customerPhone || 'Walk-in',
        total: orderTotal,
        status: 'Completed'
      });

      await loadAll();
      setTab('Orders');

      if (sendViaWhatsapp && customerPhone) {
        showToast(`Order placed. Receipt sent to ${customerPhone}`, 'success');
        const text = `Hi, your bill from ${GYM_DETAILS.name} for ₹${orderTotal} is completed. Thank you!`;
        window.open(`https://wa.me/91${customerPhone}?text=${encodeURIComponent(text)}`, '_blank');
      } else {
        showToast('Order placed successfully. Printing receipt...', 'success');
        setPrintData({ 
          gymName: GYM_DETAILS.name, 
          gymPhone: GYM_DETAILS.phone, 
          receiptNo: `ORD-${res.data?.id || Date.now()}`, 
          date: new Date().toLocaleDateString('en-IN'), 
          customerName: customerPhone || 'Walk-in', 
          items: orderItems.map((i) => ({ 
            name: i.name, 
            price: i.price, 
            amount: i.price * i.qty 
          })), 
          total: orderTotal, 
          paymentMethod: orderMethod 
        });
        setTimeout(() => window.print(), 100);
      }
      setOrderItems([]);
      setCustomerPhone('');
      setSendViaWhatsapp(false);
      setShowOrderModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [orderItems, orderMethod, sendViaWhatsapp, customerPhone, loadAll, showToast, setTab]);

  return {
    tab, setTab,
    products, orders, totalOrders, summary, fetchState, saving,
    toast, printData, search, debouncedSearch, setSearch,
    currentPage, setCurrentPage,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder,
    showProductModal, setShowProductModal, editProductId, editProductData,
    showOrderModal, setShowOrderModal, orderItems, orderMethod, setOrderMethod,
    customerPhone, setCustomerPhone, sendViaWhatsapp, setSendViaWhatsapp,
    hideToast, setPrintData, loadAll,
 openAddProduct, openEditProduct, saveProduct, deleteProduct,
 addToOrder, removeFromOrder, updateOrderQty, orderTotal, placeOrder
 };
}
