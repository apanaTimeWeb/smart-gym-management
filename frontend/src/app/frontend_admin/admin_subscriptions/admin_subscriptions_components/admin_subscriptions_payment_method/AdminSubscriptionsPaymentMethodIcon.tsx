// RESPONSIBILITY: Renders the semantic icon for one supported subscription payment method type.
"use client";
import { Building2, CreditCard, Smartphone } from 'lucide-react';
import type { PaymentMethod } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';

import type { AdminSubscriptionsPaymentMethodIconProps } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsPaymentMethodIconPropsTypes';


/**
 * AdminSubscriptionsPaymentMethodIcon renders the admin subscriptions payment method icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsPaymentMethodIcon: Renders the semantic icon for one supported subscription payment method type.
 * @dependencies Consumes AdminSubscriptionsTypes, AdminSubscriptionsPaymentMethodIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsPaymentMethodIcon({ type }: AdminSubscriptionsPaymentMethodIconProps) {
  if (type === 'upi') return <Smartphone size={18} className="text-success"  strokeWidth={2}/>;
  if (type === 'netbanking') return <Building2 size={18} className="text-info"  strokeWidth={2}/>;
  return <CreditCard size={18} className="text-primary"  strokeWidth={2}/>;
}
