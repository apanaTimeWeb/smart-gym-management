'use client';
// RESPONSIBILITY: Renders the four KPI stat cards (Total, New, Follow Up, Converted) for the Inquiries module.
import { MANAGER_INQUIRIES_KPI_CONFIG } from '@/app/manager/inquiries/inquiries_constants/ManagerInquiriesKpiConstants';
import { useManagerInquiriesLogic } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import { formatNumber } from '@/lib/formatters';

export default function ManagerInquiriesKPIs() {
  const { stats, isLoading } = useManagerInquiriesLogic();

  if (isLoading && !stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={`skeleton-${index}`} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-input" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-input rounded" />
              <div className="h-5 w-10 bg-input rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {MANAGER_INQUIRIES_KPI_CONFIG.map((item) => (
        <div key={item.key} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
            <item.icon size={18} className={item.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{item.label}</p>
            <p className="text-kpi font-bold text-primary">{formatNumber(stats[item.key])}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
