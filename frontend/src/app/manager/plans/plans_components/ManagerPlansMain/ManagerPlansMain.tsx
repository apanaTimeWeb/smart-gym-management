// RESPONSIBILITY: Orchestrator for the Plans module — plan cards with change-request modal.
// DATA FLOW: PlansProvider → usePlansContext → plan cards + modal
'use client';

import { useState } from 'react';
import { PlansProvider, usePlansContext } from '@/app/manager/plans/plans_context/ManagerPlansContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { Search, CheckCircle, XCircle, IndianRupee, Send, X, Loader2, Users } from 'lucide-react';
import { formatCurrency } from '@/app/manager/plans/plans_utils/ManagerPlansSharedConstants';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  BASIC:   { bg: 'bg-info/10',    text: 'text-info',    label: 'Basic'   },
  GOLD:    { bg: 'bg-warning/10', text: 'text-warning', label: 'Gold'    },
  PREMIUM: { bg: 'bg-primary/10', text: 'text-primary', label: 'Premium' },
};

// ── Change Request Modal ──────────────────────────────────────────────────────
function ChangeRequestModal() {
  const { requestModalPlan, closeRequestModal, submitChangeRequest, saving } = usePlansContext();
  const [note, setNote] = useState('');

  if (!requestModalPlan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    await submitChangeRequest(note);
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Request Plan Change</h3>
            <p className="text-xs text-secondary mt-0.5">{requestModalPlan.name} — {requestModalPlan.tier}</p>
          </div>
          <button onClick={closeRequestModal} className="p-2 rounded-lg hover:bg-input text-secondary motion-safe:transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Describe the change needed
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder="e.g. Increase 1-month price to ₹1500, add sauna access feature..."
              className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={closeRequestModal}
              className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-border text-secondary hover:text-foreground motion-safe:transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || !note.trim()}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:opacity-90 motion-safe:transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <Loader2 size={15} className="motion-safe:animate-spin" /> : <Send size={15} />}
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
function PlanCard({ plan }: { plan: Plan }) {
  const { openRequestModal } = usePlansContext();
  const tier = TIER_STYLES[plan.tier] ?? TIER_STYLES['BASIC'];
  const features = Array.isArray(plan.features)
    ? plan.features
    : (plan.features as string ?? '').split(',').map(f => f.trim()).filter(Boolean);

  return (
    <div className={`bg-card border rounded-xl p-5 flex flex-col gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg ${plan.isActive ? 'border-border' : 'border-border opacity-60'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tier.bg} ${tier.text}`}>{tier.label}</span>
            {plan.isActive
              ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1"><CheckCircle size={11} />Active</span>
              : <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger/10 text-danger flex items-center gap-1"><XCircle size={11} />Inactive</span>
            }
          </div>
          <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <IndianRupee size={18} className="text-primary" />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: '1 Month',   price: plan.price1Month  },
          { label: '3 Months',  price: plan.price3Month  },
          { label: '6 Months',  price: plan.price6Month  },
          { label: '12 Months', price: plan.price12Month },
        ].map(row => (
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

      {/* Request change CTA */}
      <button
        onClick={() => openRequestModal(plan)}
        className="mt-auto flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-primary/40 text-primary hover:bg-primary/10 motion-safe:transition-colors"
      >
        <Send size={12} /> Request Change
      </button>
    </div>
  );
}

// ── Inner ─────────────────────────────────────────────────────────────────────
function PlansInner() {
  const { plans, filteredPlans, fetchState, search, setSearch, tierFilter, setTierFilter, statusFilter, setStatusFilter } = usePlansContext();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Membership Plans" subtitle="View plans and request changes to admin" />

      <div className="p-6 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Plans',    value: plans.length,                         color: 'text-primary', icon: <IndianRupee size={18} className="text-primary" />, bg: 'bg-primary/10' },
            { label: 'Active Plans',   value: plans.filter(p => p.isActive).length, color: 'text-success', icon: <CheckCircle  size={18} className="text-success" />, bg: 'bg-success/10' },
            { label: 'Members on Plans', value: '—',                                color: 'text-info',    icon: <Users        size={18} className="text-info"    />, bg: 'bg-info/10'    },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>{s.icon}</div>
              <div>
                <p className="text-xs text-secondary">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input type="text" placeholder="Search plans..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary" />
          </div>
          <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary">
            <option value="ALL">All Tiers</option>
            <option value="BASIC">Basic</option>
            <option value="GOLD">Gold</option>
            <option value="PREMIUM">Premium</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary">
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Grid */}
        {fetchState === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
          </div>
        ) : fetchState === 'error' ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-danger font-medium">Failed to load plans</p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <IndianRupee size={36} className="mx-auto text-secondary opacity-40" />
            <p className="text-sm text-secondary font-medium">{search ? `No plans found for "${search}"` : 'No plans available'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        )}
      </div>

      <ChangeRequestModal />
    </div>
  );
}

export default function ManagerPlansMain() {
  return (
    <PlansProvider>
      <PlansInner />
    </PlansProvider>
  );
}
