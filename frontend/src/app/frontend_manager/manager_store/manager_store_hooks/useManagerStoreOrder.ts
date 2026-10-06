'use client';
// DATA FLOW: POS UI → confirmed order mutation → authoritative Store API response → print/WhatsApp/reset UI.
import { useLocale, useTranslations } from 'next-intl';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { useManagerStoreOrderMutations } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreOrderMutations';
import { useManagerStoreUiStore } from '@/app/frontend_manager/manager_store/manager_store_store/useManagerStoreUiStore';
import { ManagerStoreUrlConfig } from '@/app/frontend_manager/manager_store/manager_store_url_config';
import { ManagerStoreFormatCurrency, ManagerStoreFormatDate } from '@/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters';
import type { ManagerConfirmType } from '@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ManagerStoreReceiptData } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreThermalReceiptTypes';
import type { OrderItem } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';

/**
 * @description Owns the Store POS draft and delegates order server mutation behavior to a dedicated mutation hook.
 * @dependencies Uses Store UI state, confirmation guard, locale-aware formatters, and useManagerStoreOrderMutations.
 * @edge-case Reuses the same idempotency key across a retry of one confirmed order intent and clears it only after authoritative success or abandonment.
 */
export function useManagerStoreOrder(
  setTab: (tab: string) => void,
  showToast: (message: string, type: ManagerToastType) => void,
  setPrintData: (data: ManagerStoreReceiptData) => void,
  confirm: (args: { title: string; message: string; confirmText: string; cancelText: string; type: ManagerConfirmType }) => Promise<boolean>,
) {
  const ui = useManagerStoreUiStore();
  const t = useTranslations('MANAGER_STORE');
  const locale = useLocale();
  const hasDraftChanges = ui.orderItems.length > 0 || ui.customerPhone.length > 0 || ui.sendViaWhatsapp;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(hasDraftChanges);
  const orderTotal = ui.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const mutations = useManagerStoreOrderMutations(
    ui.orderItems,
    ui.orderMethod,
    ui.customerPhone,
    ui.sendViaWhatsapp,
    orderTotal,
    async (response) => {
      setTab('Orders');
      showToast(response.message, 'success');
      if (ui.sendViaWhatsapp && ui.customerPhone) {
        const itemsRecord = ui.orderItems.reduce<Record<string, string>>((acc, item) => {
          acc[`${item.qty}x ${item.name}`] = ManagerStoreFormatCurrency(item.price * item.qty, ManagerEnvConfig.currencyCode, locale);
          return acc;
        }, {});
        const waText = WhatsAppFormatter.formatReceipt({
          title: GYM_DETAILS.name,
          subtitle: t('TEXT_RETAIL_INVOICE'),
          date: ManagerStoreFormatDate(new Date().toISOString()),
          customerInfo: { Phone: ui.customerPhone, 'Order ID': response.data?.id || t('TEXT_PENDING') },
          sections: [{ title: 'Items', items: itemsRecord }, { items: { Total: ManagerStoreFormatCurrency(orderTotal, ManagerEnvConfig.currencyCode, locale), Payment: ui.orderMethod } }],
          footer: t('TEXT_THANK_YOU_VISIT_AGAIN'),
        });
        window.open(`${ManagerStoreUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${ui.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
      } else {
        setPrintData({
          gymName: GYM_DETAILS.name,
          gymPhone: GYM_DETAILS.phone,
          receiptNo: response.data?.id || t('TEXT_PENDING'),
          date: ManagerStoreFormatDate(new Date().toISOString()),
          customerName: ui.customerPhone || t('TEXT_WALK_IN'),
          items: ui.orderItems.map((item: OrderItem) => ({ name: item.unit ? `${item.name} (${item.unit})` : item.name, price: item.price, amount: item.price * item.qty })),
          total: orderTotal,
          paymentMethod: ui.orderMethod,
        });
        window.setTimeout(() => window.print(), 100);
      }
      ui.resetOrder();
    },
  );

  const addToOrder = (product: { id: string; name: string; price: number; unit?: string | null }) => ui.setOrderItems((prev) => prev.some((item) => item.productId === product.id) ? prev : [...prev, { productId: product.id, qty: 1, name: product.name, price: product.price, unit: product.unit }]);
  const removeFromOrder = (productId: string) => ui.setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
  const updateOrderQty = (productId: string, qty: number) => { if (qty <= 0) return removeFromOrder(productId); ui.setOrderItems((prev) => prev.map((item) => item.productId === productId ? { ...item, qty } : item)); };
  const placeOrder = async () => {
    if (!ui.orderItems.length) return;
    const confirmed = await confirm({
      title: t('CONFIRM_SALE_TITLE'),
      message: t('CONFIRM_SALE_MESSAGE'),
      confirmText: t('CONFIRM_SALE'),
      cancelText: t('KEEP_EDITING'),
      type: 'warning',
    });
    if (confirmed) await mutations.placeOrder();
  };
  const closeOrderModal = () => { void confirmAndClose(() => { mutations.resetIdempotency(); ui.resetOrder(); }); };
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
    isPlacingOrder: mutations.isPlacingOrder,
  };
}
