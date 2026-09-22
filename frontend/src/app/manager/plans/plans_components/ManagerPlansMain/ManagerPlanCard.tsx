// RESPONSIBILITY: Renders one membership-plan card and exposes the plan actions supplied by the feature state layer.
'use client';
import { CheckCircle, XCircle, IndianRupee, Send } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useManagerPlansLogic } from '@/app/manager/plans/plans_hooks/ManagerUseManagerPlansLogic';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { useLocale } from "next-intl";

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  BASIC:   { bg: "bg-info-bg",    text: 'text-info',    label: 'Basic'   },
  GOLD:    { bg: "bg-warning-bg", text: 'text-warning', label: 'Gold'    },
  PREMIUM: { bg: "bg-primary-subtle", text: 'text-primary', label: 'Premium' } };

export default function ManagerPlanCard({ plan }: { plan: Plan }) {
    const locale = useLocale();
  const { openRequestModal } = useManagerPlansLogic();
  const tier = TIER_STYLES[plan.tier] ?? TIER_STYLES['BASIC'] ?? { bg: 'bg-input', text: 'text-secondary', label: plan.tier ?? 'BASIC' };
  const features = Array.isArray(plan.features)
    ? plan.features
    : (plan.features as string ?? '').split(',').map((f: string) => f.trim()).filter(Boolean);

  return (
    <div className={`bg-card border rounded-xl p-5 flex flex-col gap-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:shadow-card ${plan.isActive ? 'border-border' : 'border-border opacity-60'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tier.bg} ${tier.text}`}>{tier.label}</span>
            {plan.isActive
              ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success flex items-center gap-1"><CheckCircle size={18} />Active</span>
              : <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger-bg text-danger flex items-center gap-1"><XCircle size={18} />Inactive</span>
            }
          </div>
          <h3 className="text-base font-bold text-primary">{plan.name}</h3>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
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
          <div key={`plan-${plan.id}-price-${row.label}`} className="bg-input rounded-lg px-3 py-2">
            <p className="text-xs text-secondary">{row.label}</p>
            <p className="text-sm font-bold text-primary">{formatCurrency(row.price, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-border">
          {features.map((f: string, i: number) => (
            <div key={`plan-${plan.id}-feature-${i}`} className="flex items-center gap-2 text-sm text-secondary">
              <CheckCircle size={18} className="text-success shrink-0" />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      )}

      {/* Request change CTA */}
      <button
        onClick={() => openRequestModal(plan)}
        className="mt-auto flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-focus text-primary hover:bg-primary-subtle motion-safe:transition-colors"
      >
        <Send size={18} /> Request Change
      </button>
    </div>
  );
}
