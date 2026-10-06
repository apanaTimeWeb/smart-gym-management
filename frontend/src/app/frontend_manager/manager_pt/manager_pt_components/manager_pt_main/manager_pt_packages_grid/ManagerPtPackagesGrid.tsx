// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Dumbbell } from 'lucide-react';
import { ManagerPtFormatCurrency } from '@/app/frontend_manager/manager_pt/manager_pt_utils/ManagerPtFormatters';
import type { ManagerPtPackagesGridProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtPackagesGridTypes';

/**
 * @description Renders the PT package catalog and its module-owned empty state.
 * @dependencies Uses the feature-local currency formatter and package data passed by ManagerPtMain.
 * @edge-case Displays an explicit empty state when the package list has no records.
 */
export default function ManagerPtPackagesGrid({ packages, translate, locale, currencyCode }: ManagerPtPackagesGridProps) {
  if (packages.length === 0) {
    return (
      <div className="col-span-full rounded-xl border border-border bg-card p-12 text-center motion-safe:transition-all motion-safe:duration-base">
        <Dumbbell size={18} strokeWidth={2} className="mx-auto mb-3 text-secondary" aria-hidden="true" />
        <p className="text-sm text-secondary">{translate('COPY_NO_PT_PACKAGES_CONFIGURED_YET')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <article key={pkg.id} className="rounded-xl border border-border bg-card p-6 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-border bg-primary-subtle px-3 py-1 text-xs font-bold text-primary">
              {pkg.sessionCount}{translate('COPY_SESSIONS')}
            </span>
            <span className="text-xl font-bold text-primary">
              {ManagerPtFormatCurrency(pkg.price, currencyCode, locale)}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-bold text-primary">{pkg.name}</h3>
          <p className="mb-6 min-h-10 text-sm text-secondary">{pkg.description}</p>
          <div className="flex items-center justify-between border-t border-border pt-4 text-xs font-medium text-secondary">
            <span>{translate('COPY_DURATION')}{pkg.durationDays}{translate('COPY_DAYS')}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
