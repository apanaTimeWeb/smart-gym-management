"use client";
// RESPONSIBILITY: Payment method management — list, set default, remove.
import { useTranslations } from 'next-intl';

import { CreditCard, Star, Trash2, CheckCircle } from 'lucide-react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';
import AdminSubscriptionsPaymentMethodIcon from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethodIcon';
import AdminSubscriptionsPaymentMethodLabel from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethodLabel';

/**
 * AdminSubscriptionsPaymentMethod renders the admin subscriptions payment method UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsPaymentMethod: Payment method management — list, set default, remove.
 * @dependencies Consumes useAdminSubscriptionsLogic, AdminSubscriptionsPaymentMethodIcon, AdminSubscriptionsPaymentMethodLabel.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsPaymentMethod() {
  const t = useTranslations();

  const { paymentMethods, setDefaultPaymentMethod, handleRemovePaymentMethod } = useAdminSubscriptionsLogic();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-primary"  strokeWidth={2}/>
          <h3 className="font-semibold text-primary text-sm">{t('subscriptions.admin_subscriptions_payment_method.text_ad68e79c90')}</h3>
        </div>

      </div>
      <div className="divide-y divide-border">
        {paymentMethods.length === 0 ? (
          <div className="p-8 text-center text-sm text-secondary">{t('subscriptions.admin_subscriptions_payment_method.text_95331a092c')}</div>
        ) : paymentMethods.map((pm, __testIdIndex34) => (
          <div key={pm.id} className="flex items-center justify-between p-4 hover:bg-input motion-safe:transition-colors motion-safe:duration-base">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center">
                <AdminSubscriptionsPaymentMethodIcon type={pm.type} />
              </div>
              <div>
                <AdminSubscriptionsPaymentMethodLabel paymentMethod={pm} />
                {pm.isDefault && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle size={18} className="text-success"  strokeWidth={2}/>
                    <span className="text-xs text-success font-medium">{t('subscriptions.admin_subscriptions_payment_method.text_808d7dca8a')}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!pm.isDefault && (
                <button type="button"
                  onClick={() => setDefaultPaymentMethod(pm.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-secondary border border-border rounded-lg hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
                 data-testid={`admin_subscriptions-admin_subscriptions-payment-method-click-map34-${__testIdIndex34}-1`}>
                  <Star size={18}  strokeWidth={2}/> {t('subscriptions.admin_subscriptions_payment_method.text_6eaa24bb52')}</button>
              )}
              <button type="button"
                onClick={() => handleRemovePaymentMethod(pm.id)}
                className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                aria-label={t('subscriptions.admin_subscriptions_payment_method.text_02c31ab7b6')}
               data-testid={`admin_subscriptions-admin_subscriptions-payment-method-click-2-map34-${__testIdIndex34}-2`}>
                <Trash2 size={18}  strokeWidth={2}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}