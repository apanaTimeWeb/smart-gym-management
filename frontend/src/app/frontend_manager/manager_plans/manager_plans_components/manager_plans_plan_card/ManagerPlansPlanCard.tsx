// RESPONSIBILITY: Renders ManagerPlansPlanCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { CheckCircle, XCircle, IndianRupee, Send } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_PLANS_TIER_STYLES } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansConstants';
import { useManagerPlansLogic } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansLogic';
import { ManagerPlansFormatCurrency } from '@/app/frontend_manager/manager_plans/manager_plans_utils/ManagerPlansFormatters';
import type { Plan } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes';


/**
 * @description Renders/orchestrates the ManagerPlansPlanCard user interface for the plans module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_plans/manager_plans_utils/ManagerPlansFormatters; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansLogic; @/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerPlansPlanCard component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerPlansPlanCard({ plan }: { plan: Plan }) {
  const t = useTranslations('MANAGER_PLANS');
  const locale = useLocale();

  const { openRequestModal } = useManagerPlansLogic();
  const tier = MANAGER_PLANS_TIER_STYLES[plan.tier] ?? MANAGER_PLANS_TIER_STYLES['BASIC'] ?? { bg: 'bg-input', text: 'text-secondary', labelKey: 'COPY_BASIC_2' };
  const features = Array.isArray(plan.features)
    ? plan.features
    : (plan.features as string ?? '').split(',').map((f: string) => f.trim()).filter(Boolean);

  return (
    <div className={`bg-card border rounded-xl p-5 flex flex-col gap-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:shadow-card ${plan.isActive ? 'border-border' : 'border-border opacity-60'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tier.bg} ${tier.text}`}>{t(tier.labelKey)}</span>
            {plan.isActive
              ? <span data-testid="manager_plans-manager-plans-main-status-1" className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success flex items-center gap-1"><CheckCircle size={18} strokeWidth={2}/>{t("COPY_ACTIVE_1")}</span>
              : <span data-testid="manager_plans-manager-plans-main-status-2" className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger-bg text-danger flex items-center gap-1"><XCircle size={18} strokeWidth={2}/>{t("COPY_INACTIVE_1")}</span>
            }
          </div>
          <h3 className="text-base font-bold text-primary">{plan.name}</h3>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
          <IndianRupee size={18} strokeWidth={2} className="text-primary"/>
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: t("COPY_1_MONTH"),   price: plan.price1Month  },
          { label: t("COPY_3_MONTHS"),  price: plan.price3Month  },
          { label: t("COPY_6_MONTHS"),  price: plan.price6Month  },
          { label: t("COPY_12_MONTHS"), price: plan.price12Month },
        ].map(row => (
          <div key={`plan-${plan.id}-price-${row.label}`} className="bg-input rounded-lg px-3 py-2">
            <p className="text-xs text-secondary">{row.label}</p>
            <p className="text-sm font-bold text-primary">{ManagerPlansFormatCurrency(row.price, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-border">
          {features.map((f: string, i: number) => (
            <div key={`plan-${plan.id}-feature-${i}`} className="flex items-center gap-2 text-sm text-secondary">
              <CheckCircle size={18} strokeWidth={2} className="text-success shrink-0"/>
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      )}

      {/* Request change CTA */}
      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "mt-auto flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-focus text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-button-action"
        onClick={() => openRequestModal(plan)}
        
      >
        <Send size={18} strokeWidth={2}/>{t("COPY_REQUEST_CHANGE")}</button>
    </div>
  );
}
