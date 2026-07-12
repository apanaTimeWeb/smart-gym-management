'use client';

import { Check, Edit } from 'lucide-react';
import { usePlansContext } from '../plans_context/PlansContext';

export default function PlansList() {
  const { plans, loading, error } = usePlansContext();

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error || !plans) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-[var(--primary)] transition-colors">
          
          <div className="absolute top-0 right-0 bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 text-xs font-bold rounded-bl-lg">
            {plan.activeTenants || 0} Gyms Active
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h2>
            <div className="flex items-end gap-1 mt-2">
              <span className="text-3xl font-extrabold text-[var(--text-primary)]">${Number(plan.priceMonthly).toFixed(2)}</span>
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
              {plan.features?.map((feat, idx) => (
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
  );
}
