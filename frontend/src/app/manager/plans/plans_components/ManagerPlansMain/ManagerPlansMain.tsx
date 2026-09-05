// RESPONSIBILITY: Main entry point for the Plans module. Displays available membership plans as cards with pricing tiers.
// DATA FLOW: page.tsx (SSR) → ManagerPlansMain (client) → plansApi → plan cards
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, CheckCircle, XCircle, IndianRupee } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { formatCurrency } from '@/app/manager/plans/plans_utils/ManagerPlansSharedConstants';

// ── Tier badge styling ─────────────────────────────────────────────────────────

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  BASIC:   { bg: 'bg-info-bg',    text: 'text-info',    label: 'Basic'   },
  GOLD:    { bg: 'bg-warning-bg', text: 'text-warning', label: 'Gold'    },
  PREMIUM: { bg: 'bg-primary/10', text: 'text-primary', label: 'Premium' },
};

// ── Plan Card Component ────────────────────────────────────────────────────────

interface ManagerPlanCardProps {
  plan: Plan;
}

function ManagerPlanCard({ plan }: ManagerPlanCardProps) {
  const tier = TIER_STYLES[plan.tier] ?? TIER_STYLES['BASIC'];
  const features = Array.isArray(plan.features) ? plan.features : (plan.features as string ?? '').split(',').map(f => f.trim()).filter(Boolean);

  const pricingRows = [
    { label: '1 Month',  price: plan.price1Month  },
    { label: '3 Months', price: plan.price3Month  },
    { label: '6 Months', price: plan.price6Month  },
    { label: '12 Months', price: plan.price12Month },
  ];

  return (
    <div className={`bg-card border rounded-xl p-5 flex flex-col gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg ${
      plan.isActive ? 'border-border' : 'border-border opacity-60'
    }`}
      style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.05), rgba(0,0,0,0.01))' }}>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tier.bg} ${tier.text}`}>
              {tier.label}
            </span>
            {plan.isActive
              ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success flex items-center gap-1"><CheckCircle size={11} />Active</span>
              : <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger-bg text-danger flex items-center gap-1"><XCircle size={11} />Inactive</span>
            }
          </div>
          <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <IndianRupee size={18} className="text-primary" />
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-2 gap-2">
        {pricingRows.map(row => (
          <div key={row.label} className="bg-input rounded-lg px-3 py-2">
            <p className="text-xs text-secondary">{row.label}</p>
            <p className="text-sm font-bold text-foreground">{formatCurrency(row.price)}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-border">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-secondary">
              <CheckCircle size={13} className="text-success shrink-0" />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ManagerPlansMain() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetchState, setFetchState] = useState<'loading' | 'success' | 'error'>('loading');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const loadPlans = useCallback(async () => {
    setFetchState('loading');
    try {
      const res = await plansApi.getAll();
      setPlans(res.data ?? []);
      setFetchState('success');
    } catch {
      setFetchState('error');
      setToast({ message: 'Failed to load plans. Please retry.', type: 'error' });
    }
  }, []);

  // Load plans on mount
  // Dependency: loadPlans is stable (useCallback with no deps)
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const filteredPlans = plans.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Membership Plans" subtitle="View and manage available gym membership plans" />

      <div className="p-6 space-y-6">

        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Plans',    value: plans.length,                          colorClass: 'text-primary' },
            { label: 'Active Plans',   value: plans.filter(p => p.isActive).length,  colorClass: 'text-success' },
            { label: 'Inactive Plans', value: plans.filter(p => !p.isActive).length, colorClass: 'text-danger'  },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
              style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.06), rgba(255,255,255,0.01))' }}>
              <p className="text-sm text-secondary">{stat.label}</p>
              <p className={`text-2xl font-bold ml-auto ${stat.colorClass}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search plans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Plans Grid */}
        {fetchState === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border" />
            ))}
          </div>
        ) : fetchState === 'error' ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-danger font-medium">Failed to load plans</p>
            <button onClick={loadPlans} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white motion-safe:transition-opacity hover:opacity-90">
              Try Again
            </button>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <IndianRupee size={36} className="mx-auto text-secondary opacity-40" />
            <p className="text-sm text-secondary font-medium">
              {search ? `No plans found for "${search}"` : 'No plans created yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPlans.map(plan => (
              <ManagerPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>

      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
