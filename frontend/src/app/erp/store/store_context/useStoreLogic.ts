import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { storeApi, type Product, type Order, type StoreSummary } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { EMPTY_PRODUCT_FORM, ERR_EMPTY_ORDER, ProductFormValues } from '@/app/erp/store/store_utils/StoreSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { StoreContextType, OrderItem } from '@/app/erp/store/store_types/store_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export function useStoreLogic(initialData?: any): StoreContextType {
  const { confirm } = useConfirm();
  const [tab, setTab] = useState('Products');
  const [products, setProducts] = useState<Product[]>(initialData?.products || []);
  const [orders, setOrders] = useState<Order[]>(initialData?.orders || []);
  const [totalOrders, setTotalOrders] = useState<number>(initialData?.totalOrders || 0);
  const [summary, setSummary] = useState<StoreSummary | null>(initialData?.summary || null);
  const [loading, setLoading] = useState(!initialData);
  const [saving, setSaving] = useState(false);
  const isFirstRender = React.useRef(true);
 
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [printData, setPrintData] = useState<ErpReceiptData | null>(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

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
 setLoading(true);
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
 } finally { 
 setLoading(false); 
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
 const res = await storeApi.updateProduct(editProductId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await storeApi.createProduct(payload); 
 showToast((res as any).message, 'success'); 
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
 const res = await storeApi.removeProduct(id); 
 showToast((res as any).message, 'success'); 
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
    products, orders, totalOrders, summary, loading, saving,
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
