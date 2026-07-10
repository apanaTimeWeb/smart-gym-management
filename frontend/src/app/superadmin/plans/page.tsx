'use client';

import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { CreditCard, Edit, Check } from 'lucide-react';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';

export default function PlansPage() {
  const { data: DUMMY_SUBSCRIPTION_PLANS, loading, error } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error || !DUMMY_SUBSCRIPTION_PLANS) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Subscription Plans</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage pricing tiers and limits for SaaS tenants.</p>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors">
          Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_SUBSCRIPTION_PLANS.map((plan) => (
          <div key={plan.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-[var(--primary)] transition-colors">
            
            <div className="absolute top-0 right-0 bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 text-xs font-bold rounded-bl-lg">
              {plan.activeTenants} Gyms Active
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h2>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-extrabold text-[var(--text-primary)]">${plan.priceMonthly}</span>
                <span className="text-[var(--text-secondary)] font-medium mb-1">/ mo</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 mb-6">
              <p className="text-sm text-[var(--text-secondary)] font-medium pb-2 border-b border-[var(--border)]">
                Max Members: <span className="text-[var(--text-primary)]">{plan.maxMembers}</span>
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-medium pb-2 border-b border-[var(--border)]">
                Max Staff: <span className="text-[var(--text-primary)]">{plan.maxStaff}</span>
              </p>
              <div className="pt-2">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-2.5 flex items-center justify-center gap-2 bg-[var(--bg-input)] hover:bg-[var(--primary)] hover:text-white text-[var(--text-primary)] rounded-xl font-medium transition-colors border border-[var(--border)]">
              <Edit size={16} /> Edit Limits & Pricing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
