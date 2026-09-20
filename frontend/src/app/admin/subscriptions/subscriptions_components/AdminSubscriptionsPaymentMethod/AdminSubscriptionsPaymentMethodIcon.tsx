"use client";
// RESPONSIBILITY: Renders the semantic icon for one supported subscription payment method type.
import { Building2, CreditCard, Smartphone } from 'lucide-react';
import type { PaymentMethod } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

import type { AdminSubscriptionsPaymentMethodIconProps } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsPaymentMethodIconPropsTypes';


export default function AdminSubscriptionsPaymentMethodIcon({ type }: AdminSubscriptionsPaymentMethodIconProps) {
  if (type === 'upi') return <Smartphone size={18} className="text-success" />;
  if (type === 'netbanking') return <Building2 size={18} className="text-info" />;
  return <CreditCard size={18} className="text-primary" />;
}
