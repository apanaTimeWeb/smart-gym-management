'use client';
// RESPONSIBILITY: Owns Store order creation orchestration, confirmation, idempotency, receipt generation, and dirty-draft protection.
// DATA FLOW: Store order UI → confirmation/dirty guard → TanStack mutation/API → query refresh → receipt/WhatsApp output.
import type { ManagerConfirmType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerConfirmModalTypes';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { Product, OrderItem } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { formatCurrencyFromMinorUnits, formatDate } from '@/lib/formatters';
import { ManagerStoreUrlConfig } from '@/app/manager/store/store_url_config';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { GYM_DETAILS } from '@/app/manager/manager_infrastructure/ManagerGymIdentity';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { ManagerStoreReceiptData } from '@/app/manager/store/store_types/ManagerStoreThermalReceiptTypes';
import { useManagerStoreUiStore } from '@/app/manager/store/store_store/ManagerUseManagerStoreUiStore';

/** Owns one Store POS draft from confirmation through authoritative mutation completion. */
export function useManagerStoreOrder(
  loadAll: () => Promise<void>,
  setTab: (tab: string) => void,
  showToast: (msg: string, type: ManagerToastType) => void,
  setPrintData: (data: ManagerStoreReceiptData) => void,
  setSaving: (saving: boolean) => void,
  confirm: (args: { title: string; message: string; confirmText: string; cancelText: string; type: ManagerConfirmType }) => Promise<boolean>,
) {
  const ui = useManagerStoreUiStore();
  const idempotencyKeyRef = useRef<string | null>(null);
  const hasDraftChanges = ui.orderItems.length > 0 || ui.customerPhone.length > 0 || ui.sendViaWhatsapp;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(hasDraftChanges);

  const addToOrder = (product: Product) => ui.setOrderItems((prev) => prev.some((item) => item.productId === product.id) ? prev : [...prev, { productId: product.id, qty: 1, name: product.name, price: product.price, unit: product.unit }]);
  const removeFromOrder = (productId: string) => ui.setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
  const updateOrderQty = (productId: string, qty: number) => qty <= 0 ? removeFromOrder(productId) : ui.setOrderItems((prev) => prev.map((item) => item.productId === productId ? { ...item, qty } : item));
  const orderTotal = ui.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeMutation = useMutation({
    mutationFn: async (idempotencyKey: string) => storeApi.createOrder({
      items: ui.orderItems.map((item) => ({ productId: item.productId, qty: item.qty, price: item.price, product: { name: item.name, unit: item.unit } })),
      method: ui.orderMethod,
      notes: ui.sendViaWhatsapp && ui.customerPhone ? `WhatsApp: ${ui.customerPhone}` : undefined,
      customerName: ui.customerPhone || 'Walk-in',
      total: orderTotal,
      status: 'Completed',
    }, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: async (res) => {
      await loadAll();
      setTab('Orders');
      showToast(res.message, 'success');
      if (ui.sendViaWhatsapp && ui.customerPhone) {
        const itemsRecord = ui.orderItems.reduce<Record<string, string>>((acc, item) => {
          acc[`${item.qty}x ${item.name}`] = formatCurrencyFromMinorUnits(item.price * item.qty, ManagerEnvConfig.currencyCode);
          return acc;
        }, {});
        const waText = WhatsAppFormatter.formatReceipt({
          title: GYM_DETAILS.name,
          subtitle: 'Retail Invoice',
          date: formatDate(new Date().toISOString()),
          customerInfo: { Phone: ui.customerPhone, 'Order ID': res.data?.id || 'PENDING' },
          sections: [{ title: 'Items', items: itemsRecord }, { items: { Total: formatCurrencyFromMinorUnits(orderTotal, ManagerEnvConfig.currencyCode), Payment: ui.orderMethod } }],
          footer: 'Thank You! Visit Again',
        });
        window.open(`${ManagerStoreUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${ui.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
      } else {
        setPrintData({
          gymName: GYM_DETAILS.name,
          gymPhone: GYM_DETAILS.phone,
          receiptNo: res.data?.id || 'PENDING',
          date: formatDate(new Date().toISOString()),
          customerName: ui.customerPhone || 'Walk-in',
          items: ui.orderItems.map((item: OrderItem) => ({ name: item.unit ? `${item.name} (${item.unit})` : item.name, price: item.price, amount: item.price * item.qty })),
          total: orderTotal,
          paymentMethod: ui.orderMethod,
        });
        window.setTimeout(() => window.print(), 100);
      }
      idempotencyKeyRef.current = null;
      ui.resetOrder();
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-order-error'),
    onSettled: () => setSaving(false),
  });

  const placeOrder = async () => {
    if (!ui.orderItems.length) return;
    const confirmed = await confirm({
      title: 'Confirm Sale',
      message: 'Record this sale and reduce inventory for the selected products?',
      confirmText: 'Confirm Sale',
      cancelText: 'Keep Editing',
      type: 'warning',
    });
    if (!confirmed) return;
    const idempotencyKey = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    idempotencyKeyRef.current = idempotencyKey;
    await placeMutation.mutateAsync(idempotencyKey);
  };

  const closeOrderModal = async () => {
    await confirmAndClose(() => {
      idempotencyKeyRef.current = null;
      ui.resetOrder();
    });
  };

  return {
    showOrderModal: ui.showOrderModal,
    setShowOrderModal: ui.setShowOrderModal,
    closeOrderModal,
    orderItems: ui.orderItems,
    setOrderItems: ui.setOrderItems,
    orderMethod: ui.orderMethod,
    setOrderMethod: ui.setOrderMethod,
    customerPhone: ui.customerPhone,
    setCustomerPhone: ui.setCustomerPhone,
    sendViaWhatsapp: ui.sendViaWhatsapp,
    setSendViaWhatsapp: ui.setSendViaWhatsapp,
    addToOrder,
    removeFromOrder,
    updateOrderQty,
    orderTotal,
    placeOrder,
  };
}
