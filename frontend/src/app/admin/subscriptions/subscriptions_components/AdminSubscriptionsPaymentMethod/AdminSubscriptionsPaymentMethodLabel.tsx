"use client";
// RESPONSIBILITY: Renders the human-readable masked label for one subscription payment method.
import type { PaymentMethod } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

import type { AdminSubscriptionsPaymentMethodLabelProps } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsPaymentMethodLabelPropsTypes';


export default function AdminSubscriptionsPaymentMethodLabel({ paymentMethod }: AdminSubscriptionsPaymentMethodLabelProps) {
  if (paymentMethod.type === 'upi') return <span className="text-sm font-semibold text-primary">{paymentMethod.upiId}</span>;
  if (paymentMethod.type === 'netbanking') return <span className="text-sm font-semibold text-primary">{paymentMethod.bankName} Net Banking</span>;
  return (
    <span className="text-sm font-semibold text-primary">
      {paymentMethod.brand} •••• {paymentMethod.last4}
      <span className="text-xs text-secondary ml-2">Exp {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</span>
    </span>
  );
}
