// RESPONSIBILITY: Renders the ManagerFinanceKpiCard sub-view extracted from ManagerFinanceKpiCards; owns only this presentation responsibility.
'use client';
import type { ReactNode } from 'react';

export function ManagerFinanceKpiCard({ label, value, icon, color }: { label: string; value: string; icon: ReactNode; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:shadow-card">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary mt-0.5">{value}</p>
      </div>
    </div>
  );
}
