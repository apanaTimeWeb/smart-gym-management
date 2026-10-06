"use client";
// RESPONSIBILITY: Renders the human-readable masked label for one subscription payment method.
import { useTranslations } from 'next-intl';
import type { PaymentMethod } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';

import type { AdminSubscriptionsPaymentMethodLabelProps } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsPaymentMethodLabelPropsTypes';


/**
 * AdminSubscriptionsPaymentMethodLabel renders the admin subscriptions payment method label UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsPaymentMethodLabel: Renders the human-readable masked label for one subscription payment method.
 * @dependencies Consumes AdminSubscriptionsTypes, AdminSubscriptionsPaymentMethodLabelPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsPaymentMethodLabel({ paymentMethod }: AdminSubscriptionsPaymentMethodLabelProps) {
  const t = useTranslations();

  if (paymentMethod.type === 'upi') return <span className="text-sm font-semibold text-primary">{paymentMethod.upiId}</span>;
  if (paymentMethod.type === 'netbanking') return <span className="text-sm font-semibold text-primary">{paymentMethod.bankName} {t('subscriptions.AdminSubscriptionsPaymentMethodLabel.text_3f2b426323')}</span>;
  return (
    <span className="text-sm font-semibold text-primary">
      {paymentMethod.brand} •••• {paymentMethod.last4}
      <span className="text-xs text-secondary ml-2">{t('subscriptions.AdminSubscriptionsPaymentMethodLabel.text_5871b8d86f')}{paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</span>
    </span>
  );
}
