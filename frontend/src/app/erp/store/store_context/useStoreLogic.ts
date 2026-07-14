// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the gym product Store module.
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { storeApi } from '@/app/erp/store/store_api/store_api';
import type { Product, Order, StoreSummary } from '@/app/erp/store/store_types/store_types';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { EMPTY_PRODUCT_FORM, ERR_EMPTY_ORDER, ProductFormValues } from '@/app/erp/store/store_utils/StoreSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { StoreContextType, OrderItem, StoreInitialData, FetchState } from '@/app/erp/store/store_types/store_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

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
  const [printData, setPrintData] = useState<ErpReceiptData | null>(null);

 const [showProductModal, setShowProductModal] = useState(false);
 const [editProductId, setEditProductId] = useState<number | null>(null);
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
        storeApi.getProducts(),
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
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
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

 const saveProduct = useCallback(async (data: ProductFormValues) => {
 setSaving(true);
 try {
 const payload = { 
 ...data, 
 price: Number(data.price), 
 stock: Number(data.stock) 
 };
 
 if (editProductId) { 
 const res = await storeApi.updateProduct(editProductId, payload) as { message: string }; 
 showToast(res.message, 'success'); 
 } else { 
 const res = await storeApi.createProduct(payload) as { message: string }; 
 showToast(res.message, 'success'); 
 }
 setShowProductModal(false); 
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editProductId, loadAll, showToast]);

 const deleteProduct = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Delete Product', message: 'Delete this product?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await storeApi.removeProduct(id) as { message: string }; 
 showToast(res.message, 'success'); 
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
    if (orderItems.length === 0) return showToast(ERR_EMPTY_ORDER, 'error');
    setSaving(true);
 try {
 const res = await storeApi.createOrder({ 
 items: orderItems.map(i => ({ productId: i.productId, qty: i.qty })), 
 method: orderMethod,
 ...(sendViaWhatsapp && customerPhone ? { customerPhone } : {})
 }) as { data: Order, message: string };
 
 showToast(res.message, 'success');
 
     setPrintData({
       gymName: GYM_DETAILS.name, 
       gymPhone: GYM_DETAILS.phone,
       receiptNo: `ORD-${res.data.id}`, 
       date: new Date().toLocaleDateString('en-IN'),
       customerName: sendViaWhatsapp && customerPhone ? customerPhone : 'Walk-in Customer',
       items: orderItems.map(i => ({ name: i.name, price: i.price, amount: i.price * i.qty })),
       total: orderTotal, 
       paymentMethod: orderMethod,
     });
 
     if (!sendViaWhatsapp) {
       setTimeout(() => window.print(), 100);
     } else {
       let billMsg = `*${GYM_DETAILS.name} Receipt*\nReceipt No: ORD-${res.data.id}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\n*Items:*\n`;
       orderItems.forEach(i => {
         billMsg += `- ${i.name} x${i.qty} (₹${i.qty * i.price})\n`;
       });
       billMsg += `\n*Total: ₹${orderTotal}*\nPayment Method: ${orderMethod}\n\nThank you for shopping with us!`;
       
       const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
       const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(billMsg)}`;
       window.open(url, '_blank');
     }
     
     setOrderItems([]); 
     setCustomerPhone('');
     setSendViaWhatsapp(false);
     setShowOrderModal(false); 
     await loadAll();
   } catch (err) { 
     showToast((err as Error).message, 'error'); 
   } finally { 
     setSaving(false); 
   }
 }, [orderItems, orderMethod, orderTotal, loadAll, showToast, sendViaWhatsapp, customerPhone]);

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
 addToOrder, removeFromOrder, orderTotal, placeOrder
 };
}
