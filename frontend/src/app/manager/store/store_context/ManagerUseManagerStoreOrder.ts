// DATA FLOW: Manager module state/API data → useManagerStoreOrder → owning Manager UI components.
// RESPONSIBILITY: Handles the state and logic for managing gym store orders and the order cart.
/** Manages UseStoreOrder for the Manager module. */
import { useState, useCallback, useMemo } from 'react';
import type { Product, OrderItem } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { GYM_DETAILS } from '@/app/manager/manager_utils/ManagerSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { formatCurrency , formatDate} from '@/lib/formatters';
import type { ManagerReceiptData } from '@/app/manager/manager_components/ManagerFeedback/ManagerThermalReceipt';

export function useManagerStoreOrder(
  loadAll: () => Promise<void>,
  setTab: (tab: string) => void,
  showToast: (msg: string, type: ToastType) => void,
  setPrintData: (data: ManagerReceiptData) => void,
  setSaving: (saving: boolean) => void
) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderMethod, setOrderMethod] = useState('Cash');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sendViaWhatsapp, setSendViaWhatsapp] = useState(false);

  const addToOrder = useCallback((p: Product) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.productId === p.id);
      if (existing) return prev;
      return [...prev, { productId: p.id, qty: 1, name: p.name, price: p.price, unit: p.unit }];
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
        items: orderItems.map(i => ({ productId: i.productId, qty: i.qty, price: i.price, product: { name: i.name, unit: i.unit } })),
        method: orderMethod,
        notes: sendViaWhatsapp && customerPhone ? `WhatsApp: ${customerPhone}` : undefined,
        customerName: customerPhone || 'Walk-in',
        total: orderTotal,
        status: 'Completed'
      });

      await loadAll();
      setTab('Orders');

      if (sendViaWhatsapp && customerPhone) {
        showToast(res.message, 'success');
        
        const itemsRecord = orderItems.reduce((acc, item) => {
          acc[`${item.qty}x ${item.name}`] = formatCurrency(item.price * item.qty);
          return acc;
        }, {} as Record<string, string>);

        const waText = WhatsAppFormatter.formatReceipt({
          title: GYM_DETAILS.name,
          subtitle: 'Retail Invoice',
          date: formatDate(new Date().toISOString()),
          customerInfo: {
            'Phone': customerPhone,
            'Order ID': res.data?.id || 'PENDING',
          },
          sections: [
            { title: 'Items', items: itemsRecord },
            { items: { 'Total': formatCurrency(orderTotal), 'Payment': orderMethod } }
          ],
          footer: 'Thank You! Visit Again'
        });

        window.open(`https://wa.me/91${customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`, '_blank');
      } else {
        showToast(res.message, 'success');
        setPrintData({ 
          gymName: GYM_DETAILS.name, 
          gymPhone: GYM_DETAILS.phone, 
          receiptNo: res.data?.id || 'PENDING', 
          date: formatDate(new Date().toISOString()), 
          customerName: customerPhone || 'Walk-in', 
          items: orderItems.map((i) => ({ 
            name: i.unit ? `${i.name} (${i.unit})` : i.name, 
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
  }, [orderItems, orderMethod, sendViaWhatsapp, customerPhone, orderTotal, loadAll, setTab, showToast, setPrintData, setSaving]);

  return {
    showOrderModal, setShowOrderModal,
    orderItems, setOrderItems,
    orderMethod, setOrderMethod,
    customerPhone, setCustomerPhone,
    sendViaWhatsapp, setSendViaWhatsapp,
    addToOrder, removeFromOrder, updateOrderQty,
    orderTotal, placeOrder
  };
}
