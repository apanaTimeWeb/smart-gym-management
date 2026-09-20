"use client";
// RESPONSIBILITY: Payment method management — list, set default, remove.

import { CreditCard, Star, Trash2, CheckCircle } from 'lucide-react';
import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import AdminSubscriptionsPaymentMethodIcon from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsPaymentMethod/AdminSubscriptionsPaymentMethodIcon';
import AdminSubscriptionsPaymentMethodLabel from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsPaymentMethod/AdminSubscriptionsPaymentMethodLabel';

export default function AdminSubscriptionsPaymentMethod() {
  const { paymentMethods, setDefaultPaymentMethod, handleRemovePaymentMethod } = useAdminSubscriptionsLogic();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-primary" />
          <h3 className="font-semibold text-primary text-sm">Payment Methods</h3>
        </div>

      </div>
      <div className="divide-y divide-border">
        {paymentMethods.length === 0 ? (
          <div className="p-8 text-center text-sm text-secondary">No payment methods added</div>
        ) : paymentMethods.map(pm => (
          <div key={pm.id} className="flex items-center justify-between p-4 hover:bg-input motion-safe:transition-colors motion-safe:duration-base">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center">
                <AdminSubscriptionsPaymentMethodIcon type={pm.type} />
              </div>
              <div>
                <AdminSubscriptionsPaymentMethodLabel paymentMethod={pm} />
                {pm.isDefault && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle size={11} className="text-success" />
                    <span className="text-xs text-success font-medium">Default</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!pm.isDefault && (
                <button
                  onClick={() => setDefaultPaymentMethod(pm.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-secondary border border-border rounded-lg hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base"
                >
                  <Star size={11} /> Set Default
                </button>
              )}
              <button
                onClick={() => handleRemovePaymentMethod(pm.id)}
                className="p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors motion-safe:duration-base"
                aria-label="Remove payment method"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}